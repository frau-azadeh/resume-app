// validation/personalInfoSchema.ts
import { z } from "zod";
import dayjs from "dayjs";

const dayjsValidator = z
  .union([z.instanceof(dayjs.Dayjs), z.null()])
  .refine(
    (val) => val === null || val.isValid(),
    { message: "تاریخ تولد نامعتبر است" }
  );

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  nationalCode: z.string().regex(/^\d{10}$/, "کد ملی باید 10 رقم باشد"),
  birthDate: dayjsValidator,
  birthCity: z.string().optional(),
  birthProvince: z.string().optional(),
  idNumber: z.string().optional(),
  issueCity: z.string().optional(),
  issueProvince: z.string().optional(),
  religion: z.string().min(1, "انتخاب دین الزامی است"),
  maritalStatus: z.string().optional(),
  gender: z.string().min(1, "جنسیت الزامی است"),
  fatherName: z.string().optional(),
  fatherJob: z.string().optional(),
  fatherEducation: z.string().optional(),
  motherName: z.string().optional(),
  motherJob: z.string().optional(),
  motherEducation: z.string().optional(),
  siblingsCount: z.number().min(0, "تعداد نمی‌تواند منفی باشد").optional(),
  childrenCount: z.number().min(0, "تعداد نمی‌تواند منفی باشد").optional(),
  residenceProvince: z.string().optional(),
  residenceCity: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید 10 رقم باشد").optional(),
  phone: z.string().regex(/^\d{11}$/, "تلفن باید 11 رقم باشد").optional(),
  email: z.string().email("ایمیل معتبر نیست").optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  emergencyContactPhone: z.string().regex(/^\d{11}$/, "شماره موبایل باید 11 رقمی باشد").optional(),
  avatar: z.string().optional(),
});

export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;
