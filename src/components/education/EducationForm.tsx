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

  const is_studying = watch("is_studying");
  const start_date = watch("start_date");
  const end_date = watch("end_date");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <Input label="مقطع" {...register("degree")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.degree?.message}
        </p>
      </div>

      <div>
        <Input label="رشته" {...register("field")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.field?.message}
        </p>
      </div>

      <div>
        <Input label="گرایش" {...register("specialization")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.specialization?.message}
        </p>
      </div>

      <div>
        <Input label="نوع موسسه" {...register("institution_type")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.institution_type?.message}
        </p>
      </div>

      <div>
        <Input label="نام موسسه" {...register("institution_name")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.institution_name?.message}
        </p>
      </div>

      <div>
        <Input label="معدل" {...register("grade")} />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.grade?.message}
        </p>
      </div>

      <div>
        <JalaliDateInput
          label="تاریخ شروع"
          value={start_date}
          onChange={(v) => setValue("start_date", v!)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.start_date?.message}
        </p>
      </div>

      <div>
        <JalaliDateInput
          label="تاریخ پایان"
          value={end_date}
          onChange={(v) => setValue("end_date", v)}
          disabled={is_studying}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.end_date?.message}
        </p>
      </div>

      <div className="md:col-span-2">
        <label className="flex items-center gap-2">
          <Input type="checkbox" {...register("is_studying")} />
          در حال تحصیل هستم
        </label>
      </div>

      <div className="md:col-span-2 flex flex-col">
        <label
          htmlFor="description"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          توضیحات
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-right text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[6rem]"
          placeholder="توضیحاتی درباره مهارت یا تجربه شما..."
        />
        <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
          {errors.description?.message}
        </p>
      </div>

      <div className="md:col-span-2 flex gap-4 justify-center">
        <Button type="submit">
          {isEditing ? "ویرایش سابقه" : "ثبت سابقه"}
        </Button>
        {isEditing && (
          <Button type="button" onClick={onCancel} variant="primary">
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
};

export default EducationForm;
