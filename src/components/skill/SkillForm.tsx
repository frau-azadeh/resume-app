import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type SkillFormData } from "../../validation/skillSchema";
import Button from "../ui/Button";
import { Input } from "../ui";
import SkillList from "./SkillList";

interface Props {
  onAdd: (data: SkillFormData) => void;
  skills: SkillFormData[];
  onDelete: (index: number) => void;
}

const SkillForm: React.FC<Props> = ({ onAdd, skills, onDelete }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { skill_name: "", skill_level: 1 },
  });

  const onSubmit = (data: SkillFormData) => {
    onAdd(data);
    reset();
  };

  const selectedLevel = Number(watch("skill_level")) || 1;

  const renderStars = (level: number): JSX.Element => (
    <span className="text-yellow-500">
      {"★".repeat(level)}
      {"☆".repeat(5 - level)}
    </span>
  );

  return (
    <div
      dir="rtl"
      className="mx-auto bg-white p-6 rounded-lg shadow-md border-t border-gray-200 pt-6 mb-10 space-y-8"
    >
      {" "}
      <h3 className="font-semibold mb-4 text-gray-800 text-right">
        مهارت‌های تخصصی
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <div className="md:col-span-2">
          <Input
            {...register("skill_name")}
            placeholder="نام مهارت فنی"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />
          {errors.skill_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.skill_name.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            سطح مهارت:
          </label>
          <div className="flex items-center gap-4 justify-end">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer select-none text-3xl">
                <input
                  type="radio"
                  value={star}
                  {...register("skill_level")}
                  className="hidden"
                />
                <span
                  className={
                    selectedLevel >= star ? "text-yellow-400" : "text-gray-300"
                  }
                  aria-label={`${star} ستاره`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
          {errors.skill_level && (
            <p className="text-red-500 text-sm mt-1">
              {errors.skill_level.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Button type="submit" variant="success" size="md">
            افزودن مهارت فنی
          </Button>
        </div>
      </form>
      <SkillList
        title="مهارت‌های فنی"
        items={skills.map((skill) => ({
          label: skill.skill_name,
          description: renderStars(skill.skill_level),
        }))}
        onDelete={onDelete}
      />
    </div>
  );
};

export default SkillForm;
