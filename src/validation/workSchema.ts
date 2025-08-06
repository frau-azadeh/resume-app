// validation/workSchema.ts
import { z } from "zod";
import DateObject from "react-date-object";

const dateObjectSchema = z.instanceof(DateObject).refine((d) => d.isValid, {
  message: "تاریخ نامعتبر است",
});

export const workSchema = z.object({
  company_name: z.string().min(1, "نام شرکت الزامی است"),
  position: z.string().min(1, "عنوان شغلی الزامی است"),
  field: z.string().optional().or(z.literal("")),
  level: z.string().optional().or(z.literal("")),
  cooperation_type: z.string().optional().or(z.literal("")),
  insurance_months: z
    .string()
    .regex(/^\d*$/, "باید فقط عدد وارد کنید")
    .optional()
    .or(z.literal("")),
  start_date: dateObjectSchema,
  end_date: dateObjectSchema.nullable(),
  is_working: z.boolean(),
  work_phone: z.string().optional().or(z.literal("")),
  last_salary: z.string().optional().or(z.literal("")),
  termination_reason: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});
