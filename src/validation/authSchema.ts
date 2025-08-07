import { z } from "zod";

const persianRegex = /^[\u0600-\u06FF\s]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

export const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" })
    .regex(passwordRegex, {
      message: "رمز باید شامل حروف بزرگ و کوچک، عدد و کاراکتر خاص باشد",
    }),
});

export const signupSchema = z
  .object({
    full_name: z
      .string()
      .min(3, { message: "نام و نام خانوادگی حداقل ۳ حرف باشد" })
      .regex(persianRegex, { message: "فقط از حروف فارسی استفاده کنید" }),

    phone: z
      .string()
      .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),

    email: z.string().email({ message: "ایمیل معتبر نیست" }),

    password: z
      .string()
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" })
      .regex(passwordRegex, {
        message: "رمز باید شامل حروف بزرگ و کوچک، عدد و کاراکتر خاص باشد",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "رمز عبور و تکرار آن یکسان نیست",
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
