import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { languageSkillSchema } from "../../validation/skillSchema";
import type{  LanguageSkillData } from "../../validation/skillSchema";


interface Props {
  onAdd: (data: LanguageSkillData) => void;
}

const levels = ["ضعیف", "متوسط", "عالی"] as const;

const LanguageSkillForm: React.FC<Props> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LanguageSkillData>({
    resolver: zodResolver(languageSkillSchema),
  });

  const onSubmit = (data: LanguageSkillData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mb-6">
      <input {...register("language")} placeholder="نام زبان" className="input" />
      {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}

      {["reading", "writing", "speaking", "comprehension"].map((field) => (
        <select key={field} {...register(field as keyof LanguageSkillData)} className="input">
          <option value="">انتخاب سطح {field}</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      ))}

      <button type="submit" className="btn btn-primary col-span-2">
        افزودن مهارت زبانی
      </button>
    </form>
  );
};

export default LanguageSkillForm;
