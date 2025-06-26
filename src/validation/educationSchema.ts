import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const educationSchema = z.object({
  degree: z.string().min(1, "مقطع الزامی است"),
  field: z.string().optional(),
  specialization: z.string().optional(),
  institutionType: z.string().optional(),
  institutionName: z.string().optional(),
  grade: z.string().optional(),
  startDate: z.custom<Dayjs>(
    (val) => dayjs.isDayjs(val),
    { message: "تاریخ شروع نامعتبر است" }
  ),
  endDate: z.union([
    z.custom<Dayjs>((val) => dayjs.isDayjs(val), {
      message: "تاریخ پایان نامعتبر است",
    }),
    z.null(),
  ]),
  isStudying: z.boolean(),
  description: z.string().optional(),
});

export type EducationFormDataLocal = z.infer<typeof educationSchema>;
