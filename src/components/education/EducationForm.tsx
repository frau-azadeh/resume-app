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
  <div className="flex flex-col">
    <Input label="مقطع" {...register("degree")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.degree?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <Input label="رشته" {...register("field")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.field?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <Input label="گرایش" {...register("specialization")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.specialization?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <Input label="نوع موسسه" {...register("institutionType")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.institutionType?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <Input label="نام موسسه" {...register("institutionName")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.institutionName?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <Input label="معدل" {...register("grade")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.grade?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <JalaliDateInput
      label="تاریخ شروع"
      value={startDate}
      onChange={(v) => setValue("startDate", v!)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

    />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.startDate?.message}
    </p>
  </div>

  <div className="flex flex-col">
    <JalaliDateInput
      label="تاریخ پایان"
      value={endDate}
      onChange={(v) => setValue("endDate", v)}
      disabled={isStudying}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

    />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.endDate?.message}
    </p>
  </div>

  <div className="col-span-2">
    <label className="flex items-center gap-2">
      <Input type="checkbox" {...register("isStudying")} />
      در حال تحصیل هستم
    </label>
  </div>

  <div className="col-span-2 flex flex-col">
    <Input label="توضیحات" {...register("description")} />
    <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
      {errors.description?.message}
    </p>
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
