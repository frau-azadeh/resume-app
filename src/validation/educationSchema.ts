import { z } from "zod";
import DateObject from "react-date-object";

// Custom Zod schema برای DateObject
const dateObjectSchema = z.instanceof(DateObject).refine((d) => d.isValid, {
  message: "تاریخ نامعتبر است",
});

export const educationSchema = z.object({
  degree: z.string().min(1, "وارد کردن مقطع الزامی است"),
  field: z.string().min(1, "وارد کردن رشته الزامی است"),
  specialization: z.string().min(1, "وارد کردن گرایش الزامی است"),
  institution_type: z.string().min(1, "وارد کردن نوع موسسه الزامی است"),
  institution_name: z.string().min(1, "وارد کردن نام موسسه الزامی است"),
  grade: z.string().min(1, "وارد کردن معدل الزامی است"),

  // ✅ تغییر این دو:
  start_date: dateObjectSchema,
  end_date: dateObjectSchema.nullable(),

  is_studying: z.boolean(),
  description: z.string().min(1, "وارد کردن توضیحات الزامی است"),
});

export type EducationFormDataLocal = z.infer<typeof educationSchema>;
