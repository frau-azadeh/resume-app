
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { showError, showSuccess } from "../../lib/toast";

// اسکیما با Zod برای اعتبارسنجی فرم لاگین
const adminLoginSchema = z.object({
  username: z.string().min(1, "نام کاربری الزامی است"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

type AdminLoginSchema = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AdminLoginSchema) => {
    const isCorrect =
      data.username === "admin" && data.password === "Vania93989@";

    if (!isCorrect) {
      showError("نام کاربری یا رمز عبور اشتباه است.");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    showSuccess("ورود مدیر با موفقیت انجام شد!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ورود مدیر</h2>

        <Input
          label="نام کاربری"
          type="text"
          icon={<User size={18} />}
          {...register("username")}
          error={errors.username?.message}
        />

        <Input
          label="رمز عبور"
          type="password"
          togglePassword
          icon={<Lock size={18} />}
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          ورود
        </Button>
      </form>
    </div>
  );
}
