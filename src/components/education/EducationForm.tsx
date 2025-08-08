import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
    control,
    handleSubmit,
    reset,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input label="مقطع" {...register("degree")} error={errors.degree} />
      <Input label="رشته" {...register("field")} error={errors.field} />
      <Input
        label="گرایش"
        {...register("specialization")}
        error={errors.specialization}
      />
      <Input
        label="نوع موسسه"
        {...register("institution_type")}
        error={errors.institution_type}
      />
      <Input
        label="نام موسسه"
        {...register("institution_name")}
        error={errors.institution_name}
      />
      <Input label="معدل" {...register("grade")} error={errors.grade} />

      {/* تاریخ شروع */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          تاریخ شروع
        </label>
        <Controller
          control={control}
          name="start_date"
          render={({ field }) => (
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY-MM-DD"
              value={
                field.value instanceof DateObject
                  ? field.value
                  : new DateObject({
                      date: field.value,
                      format: "YYYY-MM-DD",
                      calendar: persian,
                      locale: persian_fa,
                    })
              }
              onChange={(date) => field.onChange(date || null)}
              inputClass="custom-datepicker-input"
            />
          )}
        />
        {errors.start_date && (
          <p className="text-red-600 text-sm mt-1">
            {errors.start_date.message}
          </p>
        )}
      </div>

      {/* تاریخ پایان */}
      <div>
        <label className=" text-sm font-medium text-gray-700 block mb-1">
          تاریخ پایان
        </label>
        <Controller
          control={control}
          name="end_date"
          render={({ field }) => (
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY-MM-DD"
              disabled={is_studying}
              value={
                field.value instanceof DateObject
                  ? field.value
                  : field.value
                    ? new DateObject({
                        date: field.value,
                        format: "YYYY-MM-DD",
                        calendar: persian,
                        locale: persian_fa,
                      })
                    : null
              }
              onChange={(date) => field.onChange(date || null)}
              inputClass="custom-datepicker-input"
            />
          )}
        />
        {errors.end_date && (
          <p className="text-red-600 text-sm mt-1">{errors.end_date.message}</p>
        )}
      </div>

      {/* چک‌باکس */}
      <div className="md:col-span-2">
        <label className="flex items-center gap-2">
          <Input type="checkbox" {...register("is_studying")} />
          در حال تحصیل هستم
        </label>
      </div>

      {/* توضیحات */}
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
        <Button type="submit" variant="success" size="md">
          {isEditing ? "ویرایش سابقه" : "ثبت سابقه"}
        </Button>
        {isEditing && (
          <Button type="button" onClick={onCancel} variant="primary" size="md">
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
};

export default EducationForm;
