import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { workSchema, type WorkFormDataType } from "../../validation/workSchema";

interface Props {
  initialData: WorkFormDataType;
  onSubmit: (data: WorkFormDataType) => void;
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
  } = useForm<WorkFormDataType>({
    defaultValues: initialData,
    resolver: zodResolver(workSchema),
  });

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const is_working = watch("is_working");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input label="نام شرکت" {...register("company_name")} />
      <Input label="عنوان شغلی" {...register("position")} />
      <Input label="زمینه فعالیت شرکت" {...register("field")} />
      <Input label="رده سازمانی" {...register("level")} />
      <Input label="نوع همکاری" {...register("cooperation_type")} />
      <Input
        label="سابقه بیمه (ماه)"
        type="number"
        {...register("insurance_months")}
      />
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
        <label className="text-sm font-medium text-gray-700 block mb-1">
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
              disabled={is_working}
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

      <div className="md:col-span-2 flex items-center gap-2">
        <input type="checkbox" {...register("is_working")} id="is_working" />
        <label htmlFor="is_working">شاغل هستم</label>
      </div>

      <Input label="تلفن محل کار" {...register("work_phone")} />
      <Input label="آخرین حقوق دریافتی (تومان)" {...register("last_salary")} />
      <Input label="علت ترک کار" {...register("termination_reason")} />

      <div className="md:col-span-2">
        <label htmlFor="description">توضیحات</label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-right text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[6rem]"
          placeholder="توضیحاتی درباره سوابق کاری ..."
        />
      </div>
      <div className="md:col-span-2 flex gap-4 justify-center">
        <Button type="submit" variant="success" size="md">
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
