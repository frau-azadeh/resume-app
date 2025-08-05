"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../validation/authSchema";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import { showSuccess, showError } from "../lib/toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      showError("ورود ناموفق بود. لطفاً ایمیل یا رمز عبور را بررسی کنید.");
    } else {
      showSuccess("ورود موفقیت‌آمیز بود!");
      navigate("/form/personal-info");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ورود به حساب</h2>

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
          togglePassword
          icon={<Lock size={18} />}
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" loading={isSubmitting}>
          ورود
        </Button>

        <p className="text-sm text-center text-gray-600">
          حساب ندارید؟{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </form>
    </div>
  );
}
