// validation.ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "نام ضروری است"),
  last_name: z.string().min(1, "نام خانوادگی ضروری است"),
  national_code: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد ملی باید فقط عدد باشد"),
  birth_date: z
    .string()
    .min(1, "تاریخ تولد ضروری است")
    .refine((val) => !isNaN(Date.parse(val)), "تاریخ تولد معتبر نیست"),
  birth_province: z.string().min(1, "استان محل تولد ضروری است"),
  birth_city: z.string().min(1, "شهر محل تولد ضروری است"),
  id_number: z.string().min(1, "شماره شناسنامه ضروری است"),
  issue_province: z.string().min(1, "استان محل صدور ضروری است"),
  issue_city: z.string().min(1, "شهر محل صدور ضروری است"),
  religion: z.string().min(1, "دین ضروری است"),
  marital_status: z.string().min(1, "وضعیت تاهل ضروری است"),
  gender: z.string().min(1, "جنسیت ضروری است"),
  father_name: z.string().min(1, "نام پدر ضروری است"),
  father_job: z.string().min(1, "شغل پدر ضروری است"),
  father_education: z.string().min(1, "تحصیلات پدر ضروری است"),
  mother_name: z.string().min(1, "نام مادر ضروری است"),
  mother_job: z.string().min(1, "شغل مادر ضروری است"),
  mother_education: z.string().min(1, "تحصیلات مادر ضروری است"),
  siblings_count: z
    .number({ invalid_type_error: "تعداد خواهر و برادر باید عدد باشد" })
    .min(0, "تعداد خواهر و برادر نمی‌تواند منفی باشد"),
  children_count: z
    .number({ invalid_type_error: "تعداد فرزند باید عدد باشد" })
    .min(0, "تعداد فرزند نمی‌تواند منفی باشد"),
  residence_province: z.string().min(1, "استان محل سکونت ضروری است"),
  residence_city: z.string().min(1, "شهر محل سکونت ضروری است"),
  address: z.string().min(1, "آدرس ضروری است"),
  postal_code: z
    .string()
    .length(10, "کد پستی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد پستی باید فقط عدد باشد"),
  phone: z
    .string()
    .min(1, "شماره تلفن ضروری است")
    .regex(/^\d+$/, "شماره تلفن باید فقط عدد باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  emergency_contact_name: z.string().min(1, "نام تماس اضطراری ضروری است"),
  emergency_contact_relation: z.string().min(1, "نسبت تماس اضطراری ضروری است"),
  emergency_contact_phone: z
    .string()
    .min(1, "شماره تماس اضطراری ضروری است")
    .regex(/^\d+$/, "شماره تماس اضطراری باید فقط عدد باشد"),
  avatar_url: z.string().optional(),
});
