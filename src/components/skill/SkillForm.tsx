import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema } from "../../validation/skillSchema";
import type { SkillFormData } from "../../validation/skillSchema";

interface Props {
  onAdd: (data: SkillFormData) => void;
}

const SkillForm: React.FC<Props> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", level: 1 },
  });

  const onSubmit = (data: SkillFormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
    >
      <input
        {...register("name")}
        placeholder="نام مهارت فنی"
        className="input"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        type="number"
        {...register("level")}
        min={1}
        max={5}
        placeholder="میزان تسلط (۱ تا ۵)"
        className="input"
      />
      {errors.level && (
        <p className="text-red-500 text-sm">{errors.level.message}</p>
      )}

      <button type="submit" className="btn btn-primary col-span-2">
        افزودن مهارت فنی
      </button>
    </form>
  );
};

export default SkillForm;
