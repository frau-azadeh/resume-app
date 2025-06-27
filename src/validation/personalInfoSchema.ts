// validation.ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "نام ضروری است"),
  lastName: z.string().min(1, "نام خانوادگی ضروری است"),
  nationalCode: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد ملی باید فقط عدد باشد"),
  birthDate: z
    .string()
    .min(1, "تاریخ تولد ضروری است")
    .refine(val => !isNaN(Date.parse(val)), "تاریخ تولد معتبر نیست"),
  birthProvince: z.string().min(1, "استان محل تولد ضروری است"),
  birthCity: z.string().min(1, "شهر محل تولد ضروری است"),
  idNumber: z.string().min(1, "شماره شناسنامه ضروری است"),
  issueProvince: z.string().min(1, "استان محل صدور ضروری است"),
  issueCity: z.string().min(1, "شهر محل صدور ضروری است"),
  religion: z.string().min(1, "دین ضروری است"),
  maritalStatus: z.string().min(1, "وضعیت تاهل ضروری است"),
  gender: z.string().min(1, "جنسیت ضروری است"),
  fatherName: z.string().min(1, "نام پدر ضروری است"),
  fatherJob: z.string().min(1, "شغل پدر ضروری است"),
  fatherEducation: z.string().min(1, "تحصیلات پدر ضروری است"),
  motherName: z.string().min(1, "نام مادر ضروری است"),
  motherJob: z.string().min(1, "شغل مادر ضروری است"),
  motherEducation: z.string().min(1, "تحصیلات مادر ضروری است"),
  siblingsCount: z
    .number({ invalid_type_error: "تعداد خواهر و برادر باید عدد باشد" })
    .min(0, "تعداد خواهر و برادر نمی‌تواند منفی باشد"),
  childrenCount: z
    .number({ invalid_type_error: "تعداد فرزند باید عدد باشد" })
    .min(0, "تعداد فرزند نمی‌تواند منفی باشد"),
  residenceProvince: z.string().min(1, "استان محل سکونت ضروری است"),
  residenceCity: z.string().min(1, "شهر محل سکونت ضروری است"),
  address: z.string().min(1, "آدرس ضروری است"),
  postalCode: z
    .string()
    .length(10, "کد پستی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد پستی باید فقط عدد باشد"),
  phone: z
    .string()
    .min(1, "شماره تلفن ضروری است")
    .regex(/^\d+$/, "شماره تلفن باید فقط عدد باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  emergencyContactName: z.string().min(1, "نام تماس اضطراری ضروری است"),
  emergencyContactRelation: z.string().min(1, "نسبت تماس اضطراری ضروری است"),
  emergencyContactPhone: z
    .string()
    .min(1, "شماره تماس اضطراری ضروری است")
    .regex(/^\d+$/, "شماره تماس اضطراری باید فقط عدد باشد"),
  avatar: z.string().optional(),
});
