"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Lock, Mail, Phone, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { supabase } from "../lib/supabase";
import { showError, showSuccess } from "../lib/toast";
import { type SignupSchema, signupSchema } from "../validation/authSchema";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data: SignupSchema) => {
    const { email, password } = data;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      showSuccess("ثبت‌نام موفقیت‌آمیز بود! لطفاً ایمیل خود را تأیید کنید.");
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("only request this after")) {
          showError("لطفاً چند ثانیه صبر کنید و دوباره تلاش کنید.");
        } else {
          showError(err.message);
        }
      } else {
        showError("خطای ناشناخته‌ای رخ داد.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ثبت‌نام</h2>

        <Input
          label="نام و نام خانوادگی"
          icon={<UserRound size={18} />}
          {...register("full_name")}
          error={errors.full_name?.message}
        />

        <Input
          label="شماره موبایل"
          type="tel"
          icon={<Phone size={18} />}
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="ایمیل"
          type="email"
          icon={<Mail size={18} />}
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="رمز عبور"
          type="password"
          icon={<Lock size={18} />}
          togglePassword
          {...register("password")}
          error={errors.password?.message}
        />

        <PasswordStrengthMeter password={passwordValue} />

        <Input
          label="تکرار رمز عبور"
          type="password"
          togglePassword
          icon={<Lock size={18} />}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" loading={isSubmitting}>
          ثبت‌نام
        </Button>

        <p className="text-sm text-center text-gray-600">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            وارد شوید
          </Link>
        </p>
      </form>
    </div>
  );
}
