import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementSkillSchema, type ManagementSkillData } from "../../validation/skillSchema";
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

const renderStars = (
  currentLevel: number | unknown,
  onChange: (lvl: number) => void
) => {
  const level = typeof currentLevel === "number" && !isNaN(currentLevel) ? currentLevel : 1;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => onChange(i)}
        className={`cursor-pointer select-none text-3xl transition-colors duration-200 ${
          i <= level ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-label={`${i} stars`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onChange(i);
          }
        }}
      >
        ★
      </span>
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
  } = useForm({
    resolver: zodResolver(managementSkillSchema),
    defaultValues: { name: "", level: 1 },
  });

  const nameValue = watch("name") || "";

  useEffect(() => {
    if (editingIndex !== null) {
      const skill = managementSkills[editingIndex];
      setValue("name", skill.name);
      setValue("level", skill.level);
    }
  }, [editingIndex, managementSkills, setValue]);

  const onSubmit = (data: ManagementSkillData) => {
    if (editingIndex === null && managementSkills.length >= MAX_SKILLS) {
      alert(`شما فقط می‌توانید تا ${MAX_SKILLS} مهارت مدیریتی اضافه کنید.`);
      return;
    }

    onAdd(data, editingIndex ?? undefined);
    reset();
    setEditingIndex(null);
  };

  const onCancelEdit = () => {
    reset();
    setEditingIndex(null);
  };

  return (
    <div dir="rtl" className="mb-8 mx-auto bg-white p-6 rounded-lg shadow-md ">
      <h3 className=" font-semibold mb-4 text-gray-800 text-right">مهارت‌های مدیریتی</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <select
          {...register("name")}
          disabled={editingIndex === null && managementSkills.length >= MAX_SKILLS}
          defaultValue=""
          className={`md:col-span-2 w-full border rounded-md px-4 py-3 text-gray-700 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="" disabled>
            انتخاب مهارت
          </option>
          {allManagerialSkills.map((skill) => (
            <option
              key={skill}
              value={skill}
              disabled={managementSkills.some(
                (s, i) => s.name === skill && (editingIndex === null || editingIndex !== i)
              )}
            >
              {skill}
            </option>
          ))}
        </select>
        {errors.name && (
          <p className="md:col-span-2 text-red-600 text-sm mt-1 text-right">{errors.name.message}</p>
        )}

        <Controller
          control={control}
          name="level"
          render={({ field: { value, onChange } }) => (
            <div
              className="md:col-span-2 flex justify-center select-none"
              aria-label="سطح مهارت"
              role="radiogroup"
            >
              {renderStars(value, onChange)}
            </div>
          )}
        />
        {errors.level && (
          <p className="md:col-span-2 text-red-600 text-sm mt-1 text-right">{errors.level.message}</p>
        )}

        <div className="md:col-span-2 flex gap-3 justify-end">
          <Button
            type="submit"
            disabled={
              !nameValue || (editingIndex === null && managementSkills.length >= MAX_SKILLS)
            }
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2 rounded-md shadow"
          >
            {editingIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
          </Button>
          {editingIndex !== null && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancelEdit}
            >
              انصراف
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {managementSkills.map((m, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            dir="rtl"
          >
            <div className="text-right">
              <p className="font-bold text-gray-800">{m.name}</p>
              <p className="text-yellow-400 text-xl select-none">
                {"★".repeat(m.level)}
                {"☆".repeat(5 - m.level)}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setEditingIndex(index)}
variant="primary"
>
                ویرایش
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onAdd(null, index);
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
