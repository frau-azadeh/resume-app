import { z } from "zod";

// مهارت زبان
export const languageSkillSchema = z.object({
  language: z.string().min(1, "نام زبان الزامی است"),
  reading: z.enum(["ضعیف", "متوسط", "عالی"]),
  writing: z.enum(["ضعیف", "متوسط", "عالی"]),
  speaking: z.enum(["ضعیف", "متوسط", "عالی"]),
  comprehension: z.enum(["ضعیف", "متوسط", "عالی"]),
});

// مهارت فنی

export const skillSchema = z.object({
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "حداقل امتیاز 1").max(5, "حداکثر امتیاز 5"),
  ),
});

// مهارت مدیریتی
export const managementSkillSchema = z.object({
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z.preprocess(
    (val) => {
      if (val === undefined || val === null) return NaN;
      if (typeof val === "string") {
        if (val.trim() === "") return NaN;
        const parsed = Number(val);
        return isNaN(parsed) ? NaN : parsed;
      }
      if (typeof val === "number") return val;
      return NaN;
    },
    z
      .number()
      .min(1, "حداقل یک ستاره لازم است")
      .max(5, "حداکثر ۵ ستاره مجاز است"),
  ),
});

export type SkillFormData = z.infer<typeof skillSchema>;
export type LanguageSkillData = z.infer<typeof languageSkillSchema>;
export type ManagementSkillData = z.infer<typeof managementSkillSchema>;
