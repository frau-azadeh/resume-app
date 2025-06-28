import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { languageSkillSchema } from "../../validation/skillSchema";
import type { LanguageSkillData } from "../../validation/skillSchema";
import { Button, Input } from "../ui";
import SkillList from "./SkillList";

interface Props {
  onAdd: (data: LanguageSkillData) => void;
  languageSkills: LanguageSkillData[];
  onDelete: (index: number) => void;
}

const levels = ["ضعیف", "متوسط", "عالی"] as const;

const LanguageSkillForm: React.FC<Props> = ({
  onAdd,
  languageSkills,
  onDelete,
}) => {
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
    <div
      dir="rtl"
      className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-8 mb-10"
    >
      <h3 className=" font-semibold mb-4 text-gray-800 text-right">
        مهارت‌های زبان خارجی
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            {...register("language")}
            placeholder="نام زبان"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.language ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.language && (
            <p className="text-red-600 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        {["reading", "writing", "speaking", "comprehension"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block mb-1 font-semibold text-gray-700"
            >
              سطح {field}
            </label>
            <select
              id={field}
              {...register(field as keyof LanguageSkillData)}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors[field as keyof LanguageSkillData]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                انتخاب سطح {field}
              </option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors[field as keyof LanguageSkillData] && (
              <p className="text-red-600 text-sm mt-1">
                {errors[field as keyof LanguageSkillData]?.message}
              </p>
            )}
          </div>
        ))}

        <Button type="submit" variant="primary">
          افزودن مهارت زبانی
        </Button>
      </form>

      <SkillList
        title="مهارت‌های زبانی"
        items={languageSkills.map((lang) => ({
          label: lang.language,
          description: `درک: ${lang.comprehension}، صحبت: ${lang.speaking}، خواندن: ${lang.reading}، نوشتن: ${lang.writing}`,
        }))}
        onDelete={onDelete}
      />
    </div>
  );
};

export default LanguageSkillForm;
