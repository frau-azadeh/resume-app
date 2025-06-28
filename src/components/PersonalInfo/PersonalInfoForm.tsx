import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalInfoSchema } from "../../validation/personalInfoSchema";
import type { z } from "zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import PersonalSection from "../PersonalInfo/sections/PersonalSection";
import FamilySection from "../PersonalInfo/sections/FamilySection";
import ResidenceSection from "../PersonalInfo/sections/ResidenceSection";
import ContactSection from "../PersonalInfo/sections/ContactSection";
import EmergencyContactSection from "../PersonalInfo/sections/EmergencyContactSection";

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface Props {
  defaultValues: Partial<PersonalInfoFormData>;
  onSubmit: (data: PersonalInfoFormData) => void;
}

const PersonalInfoForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
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
      birthDate: defaultValues.birthDate || "",
      siblingsCount: defaultValues.siblingsCount ?? 0,
      childrenCount: defaultValues.childrenCount ?? 0,
    },
  });

  React.useEffect(() => {
    reset({
      ...defaultValues,
      birthDate: defaultValues.birthDate || "",
      siblingsCount: defaultValues.siblingsCount ?? 0,
      childrenCount: defaultValues.childrenCount ?? 0,
    });
  }, [defaultValues, reset]);

  const [avatarPreview, setAvatarPreview] = React.useState<string>(
    defaultValues.avatar || "",
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

  const internalSubmit = (data: PersonalInfoFormData) => {
    onSubmit({ ...data, avatar: avatarPreview });
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
          <Button type="submit">ذخیره و ادامه</Button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfoForm;
