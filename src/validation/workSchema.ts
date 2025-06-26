// validation/workSchema.ts
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const workSchema = z.object({
  companyName: z.string().min(1, "نام شرکت الزامی است"),
  position: z.string().min(1, "عنوان شغلی الزامی است"),
  field: z.string().optional().or(z.literal("")),
  level: z.string().optional().or(z.literal("")),
  cooperationType: z.string().optional().or(z.literal("")),
  insuranceMonths: z
    .string()
    .regex(/^\d*$/, "باید فقط عدد وارد کنید")
    .optional()
    .or(z.literal("")),
  startDate: z
    .custom<Dayjs>((val) => dayjs.isDayjs(val) && val.isValid(), {
      message: "تاریخ شروع معتبر نیست",
    })
    .nullable(),
  endDate: z
    .custom<Dayjs>((val) => val === null || (dayjs.isDayjs(val) && val.isValid()), {
      message: "تاریخ پایان معتبر نیست",
    })
    .nullable(),
  isWorking: z.boolean(),
  workPhone: z.string().optional().or(z.literal("")),
  lastSalary: z.string().optional().or(z.literal("")),
  terminationReason: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});
