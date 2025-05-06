// src/pages/PersonalInfo.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { setPersonalInfo } from "../store/personalInfoSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Layout from "../components/Layout";

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const PersonalInfo: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>();
  const dispatch = useDispatch<AppDispatch>();
  const savedInfo = useSelector((state: RootState) => state.personalInfo);

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(setPersonalInfo(data));
    console.log("Saved to Redux:", data);
  };

  return (
    <Layout>
      <div
        className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow"
        dir="rtl"
      >
        <h1 className="text-2xl font-bold text-center mb-4">اطلاعات شخصی</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="نام"
            {...register("firstName", { required: "نام الزامی است" })}
            error={errors.firstName}
          />

          <Input
            label="نام خانوادگی"
            {...register("lastName", { required: "نام خانوادگی الزامی است" })}
            error={errors.lastName}
          />

          <Input
            label="ایمیل"
            type="email"
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: { value: /^\S+@\S+$/, message: "فرمت ایمیل صحیح نیست" },
            })}
            error={errors.email}
          />

          <Input
            label="شماره تماس"
            type="tel"
            {...register("phone", { required: "شماره تماس الزامی است" })}
            error={errors.phone}
          />

          <Input
            label="آدرس"
            {...register("address", { required: "آدرس الزامی است" })}
            error={errors.address}
          />

          <Button type="submit" className="w-full">
            ثبت اطلاعات
          </Button>
        </form>

        {savedInfo.firstName && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">اطلاعات ذخیره شده:</h2>
            <p>
              <strong>نام:</strong> {savedInfo.firstName}
            </p>
            <p>
              <strong>نام خانوادگی:</strong> {savedInfo.lastName}
            </p>
            <p>
              <strong>ایمیل:</strong> {savedInfo.email}
            </p>
            <p>
              <strong>شماره تماس:</strong> {savedInfo.phone}
            </p>
            <p>
              <strong>آدرس:</strong> {savedInfo.address}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PersonalInfo;
