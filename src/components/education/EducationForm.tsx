import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JalaliDateInput from "../ui/JalaliDatePicker";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  educationSchema,
  type EducationFormDataLocal,
} from "../../validation/educationSchema";

interface Props {
  initialData: EducationFormDataLocal;
  onSubmit: (data: EducationFormDataLocal) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const EducationForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormDataLocal>({
    defaultValues: initialData,
    resolver: zodResolver(educationSchema),
  });

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const isStudying = watch("isStudying");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input label="مقطع" {...register("degree")} />
      {errors.degree && (
        <p className="text-red-600 text-sm">{errors.degree.message}</p>
      )}

      <Input label="رشته" {...register("field")} />
      <Input label="گرایش" {...register("specialization")} />
      <Input label="نوع موسسه" {...register("institutionType")} />
      <Input label="نام موسسه" {...register("institutionName")} />
      <Input label="معدل" {...register("grade")} />

      <JalaliDateInput
        label="تاریخ شروع"
        value={startDate}
        onChange={(v) => setValue("startDate", v!)}
      />
      {errors.startDate && (
        <p className="text-red-600 text-sm">{errors.startDate.message}</p>
      )}

      <JalaliDateInput
        label="تاریخ پایان"
        value={endDate}
        onChange={(v) => setValue("endDate", v)}
        disabled={isStudying}
      />
      {errors.endDate && (
        <p className="text-red-600 text-sm">{errors.endDate.message}</p>
      )}

      <div className="col-span-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isStudying")} />
          در حال تحصیل هستم
        </label>
      </div>

      <div className="col-span-2">
        <Input label="توضیحات" {...register("description")} />
      </div>

      <div className="col-span-2 text-center flex gap-4 justify-center">
        <Button type="submit">
          {isEditing ? "ویرایش سابقه" : "ثبت سابقه"}
        </Button>
        {isEditing && (
          <Button type="button" onClick={onCancel} variant="secondary">
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
};

export default EducationForm;
