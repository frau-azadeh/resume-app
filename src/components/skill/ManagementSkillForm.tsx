import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  managementSkillSchema,
  type ManagementSkillData,
} from "../../validation/skillSchema";
import Button from "../ui/Button";

const allManagerialSkills: string[] = [
  "روابط عمومی",
  "انتقاد پذیری",
  "شنونده خوب",
  "اعتماد به نفس",
  "نوآوری",
  "مدیریت جلسات",
  "هوش هیجانی",
  "تیم سازی",
  "مهارت حل مسئله",
  "مدیریت زمان",
  "برنامه ریزی",
  "رهبری",
  "انعطاف پذیری",
  "کار تیمی",
  "مسئولیت پذیری",
];

interface Props {
  onAdd: (data: ManagementSkillData | null, index?: number) => void;
  managementSkills: ManagementSkillData[];
}

const MAX_SKILLS = 3;

const renderStars = (currentLevel: number, onChange: (lvl: number) => void) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => onChange(i)}
        style={{
          cursor: "pointer",
          color: i <= currentLevel ? "#FACC15" : "#DDD",
        }}
        aria-label={`${i} stars`}
      >
        ★
      </span>,
    );
  }
  return stars;
};

const ManagementSkillForm: React.FC<Props> = ({ onAdd, managementSkills }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ManagementSkillData>({
    resolver: zodResolver(managementSkillSchema),
    defaultValues: { name: "", level: 1 },
  });

  const nameValue = watch("name");

  // When editing a skill, fill the form
  useEffect(() => {
    if (editingIndex !== null) {
      const skill = managementSkills[editingIndex];
      setValue("name", skill.name);
      setValue("level", skill.level);
    }
  }, [editingIndex, managementSkills, setValue]);

  // Clear form on reset or after add
  const onSubmit = (data: ManagementSkillData) => {
    if (editingIndex === null && managementSkills.length >= MAX_SKILLS) {
      alert(`شما فقط می‌توانید تا ${MAX_SKILLS} مهارت مدیریتی اضافه کنید.`);
      return;
    }

    onAdd(data, editingIndex ?? undefined);
    reset();
    setEditingIndex(null);
  };

  // Handle cancel edit
  const onCancelEdit = () => {
    reset();
    setEditingIndex(null);
  };

  return (
    <div dir="rtl" className="mb-6">
      <h3 className="text-lg font-semibold mb-2">مهارت‌های مدیریتی</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <select
          {...register("name")}
          className="border p-2 rounded w-full"
          disabled={
            editingIndex === null && managementSkills.length >= MAX_SKILLS
          }
          defaultValue=""
        >
          <option value="">انتخاب مهارت</option>
          {allManagerialSkills.map((skill) => (
            <option
              key={skill}
              value={skill}
              disabled={managementSkills.some(
                (s) =>
                  s.name === skill &&
                  (editingIndex === null ||
                    managementSkills[editingIndex!].name !== skill),
              )}
            >
              {skill}
            </option>
          ))}
        </select>
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Controller
          control={control}
          name="level"
          render={({ field: { value, onChange } }) => (
            <div className="text-yellow-400 text-2xl select-none">
              {renderStars(value, onChange)}
            </div>
          )}
        />
        {errors.level && (
          <p className="text-red-500 text-sm">{errors.level.message}</p>
        )}

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={
              !nameValue ||
              (editingIndex === null && managementSkills.length >= MAX_SKILLS)
            }
          >
            {editingIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
          </Button>
          {editingIndex !== null && (
            <Button type="button" variant="outline" onClick={onCancelEdit}>
              انصراف
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4 space-y-3 max-w-md">
        {managementSkills.map((m, index) => (
          <div
            key={index}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{m.name}</p>
              <p className="text-yellow-500 text-xl">
                {"★".repeat(m.level)}
                {"☆".repeat(5 - m.level)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingIndex(index);
                }}
              >
                ویرایش
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onAdd(null, index); // we'll handle deletion on caller side by passing null + index
                  if (editingIndex === index) setEditingIndex(null);
                }}
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementSkillForm;
