import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z
    .number()
    .min(1, "حداقل یک ستاره لازم است")
    .max(5, "حداکثر ۵ ستاره مجاز است"),
});

export const languageSkillSchema = z.object({
  language: z.string().min(1, "نام زبان الزامی است"),
  reading: z.enum(["ضعیف", "متوسط", "عالی"]),
  writing: z.enum(["ضعیف", "متوسط", "عالی"]),
  speaking: z.enum(["ضعیف", "متوسط", "عالی"]),
  comprehension: z.enum(["ضعیف", "متوسط", "عالی"]),
});

export const managementSkillSchema = z.object({
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z
    .number()
    .min(1, "حداقل یک ستاره لازم است")
    .max(5, "حداکثر ۵ ستاره مجاز است"),
});

// استخراج تایپ‌ها از اسکیمای zod
export type SkillFormData = z.infer<typeof skillSchema>;
export type LanguageSkillData = z.infer<typeof languageSkillSchema>;
export type ManagementSkillData = z.infer<typeof managementSkillSchema>;
