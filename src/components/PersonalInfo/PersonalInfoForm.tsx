import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { personalInfoSchema } from "../../validation/personalInfoSchema";
import type { z } from "zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import PersonalSection from "../PersonalInfo/sections/PersonalSection";
import FamilySection from "../PersonalInfo/sections/FamilySection";
import ResidenceSection from "../PersonalInfo/sections/ResidenceSection";
import ContactSection from "../PersonalInfo/sections/ContactSection";
import EmergencyContactSection from "../PersonalInfo/sections/EmergencyContactSection";

import { supabase } from "../../lib/supabase";
import { showSuccess, showError } from "../../lib/toast";

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface Props {
  defaultValues: Partial<PersonalInfoFormData>;
}

const PersonalInfoForm: React.FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...defaultValues,
      birth_date: defaultValues.birth_date || "",
      siblings_count: defaultValues.siblings_count ?? 0,
      children_count: defaultValues.children_count ?? 0,
    },
  });

  React.useEffect(() => {
    reset({
      ...defaultValues,
      birth_date: defaultValues.birth_date || "",
      siblings_count: defaultValues.siblings_count ?? 0,
      children_count: defaultValues.children_count ?? 0,
    });
  }, [defaultValues, reset]);

  const [avatarPreview, setAvatarPreview] = React.useState<string>(
    defaultValues.avatar_url || "",
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("فقط فایل تصویر مجاز است.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const internalSubmit = async (data: PersonalInfoFormData) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        showError("کاربر یافت نشد.");
        return;
      }

      const { error } = await supabase.from("applications").insert([
        {
          user_id: user.id,
          personal_info: { ...data, avatar: avatarPreview },
          status: "pending",
        },
      ]);

      if (error) {
        showError("ذخیره‌سازی ناموفق بود.");
        console.error(error);
      } else {
        showSuccess("اطلاعات با موفقیت ذخیره شد.");
        navigate("/form/education");
      }
    } catch (err) {
      console.error(err);
      showError("خطای غیرمنتظره هنگام ذخیره‌سازی.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="آواتار"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            بدون عکس
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="mt-2"
          label="آپلود عکس"
          error={null}
        />
      </div>

      <form
        onSubmit={handleSubmit(internalSubmit)}
        className="space-y-8 mx-auto px-4 sm:px-6 lg:px-8"
        noValidate
      >
        <PersonalSection
          register={register}
          errors={errors}
          control={control}
        />
        <FamilySection register={register} errors={errors} />
        <ResidenceSection register={register} errors={errors} />
        <ContactSection register={register} errors={errors} />
        <EmergencyContactSection register={register} errors={errors} />

        <div className="flex justify-center mt-6">
          <Button type="submit" variant="primary">
            ذخیره و ادامه
          </Button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfoForm;
