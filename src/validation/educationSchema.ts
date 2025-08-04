import { z } from "zod";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export const educationSchema = z.object({
  degree: z.string().min(1, "وارد کردن مقطع الزامی است"),
  field: z.string().min(1, "وارد کردن رشته الزامی است"),
  specialization: z.string().min(1, "وارد کردن گرایش الزامی است"),
  institution_type: z.string().min(1, "وارد کردن نوع موسسه الزامی است"),
  institution_name: z.string().min(1, "وارد کردن نام موسسه الزامی است"),
  grade: z.string().min(1, "وارد کردن معدل الزامی است"),
  start_date: z.custom<Dayjs>((val) => dayjs.isDayjs(val), {
    message: "تاریخ شروع معتبر نیست",
  }),
  end_date: z
    .custom<Dayjs | null>((val) => val === null || dayjs.isDayjs(val), {
      message: "تاریخ پایان معتبر نیست",
    })
    .nullable(),
  is_studying: z.boolean(),
  description: z.string().min(1, "وارد کردن توضیحات الزامی است"),
});

export type EducationFormDataLocal = z.infer<typeof educationSchema>;
