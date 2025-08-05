import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import Input from "../../ui/Input";


interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
  control: Control<PersonalInfoFormData>;
}

const PersonalSection: React.FC<Props> = ({ register, errors, control }) => {
  return (
    <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">اطلاعات فردی</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="نام"
          {...register("first_name")}
          error={errors.first_name}
        />
        <Input
          label="نام خانوادگی"
          {...register("last_name")}
          error={errors.last_name}
        />
        <Input
          label="کد ملی"
          {...register("national_code")}
          error={errors.national_code}
        />

        {/* تاریخ تولد شمسی */}
        <div>
          <label
            htmlFor="birth_date"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            تاریخ تولد
          </label>
          <Controller
  name="birth_date"
  control={control}
  render={({ field }) => (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      format="YYYY-MM-DD"
      value={
        field.value
          ? new DateObject({
              date: field.value,
              format: "YYYY-MM-DD",
              calendar: persian,
              locale: persian_fa,
            })
          : ""
      }
      onChange={(date) =>
        field.onChange(date?.format?.("YYYY-MM-DD") || "")
      }
    />
  )}
/>
{errors?.birth_date && (
  <p className="text-red-600 text-sm mt-1">
    {errors.birth_date.message}
  </p>
)}

          {errors?.birth_date && (
            <p className="text-red-600 text-sm mt-1">
              {errors.birth_date.message}
            </p>
          )}
        </div>

        <Input
          label="استان محل تولد"
          {...register("birth_province")}
          error={errors.birth_province}
        />
        <Input
          label="شهر محل تولد"
          {...register("birth_city")}
          error={errors.birth_city}
        />
        <Input
          label="شماره شناسنامه"
          {...register("id_number")}
          error={errors.id_number}
        />
        <Input
          label="استان محل صدور"
          {...register("issue_province")}
          error={errors.issue_province}
        />
        <Input
          label="شهر محل صدور"
          {...register("issue_city")}
          error={errors.issue_city}
        />

        <div>
          <label className="font-medium mb-1 block text-gray-700">جنسیت</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="مرد" {...register("gender")} /> مرد
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="زن" {...register("gender")} /> زن
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium mb-1 block text-gray-700">دین</label>
          <div className="flex gap-4 flex-wrap">
            {["اسلام", "یهودی", "مسیحی", "سایر"].map((val) => (
              <label key={val} className="flex items-center gap-1">
                <input type="radio" value={val} {...register("religion")} />
                {val}
              </label>
            ))}
          </div>
          {errors.religion && (
            <p className="text-red-600 text-sm mt-1">
              {errors.religion.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-medium mb-1 block text-gray-700">
            وضعیت تاهل
          </label>
          <select
            {...register("marital_status")}
            className="w-full border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">انتخاب کنید</option>
            <option value="مجرد">مجرد</option>
            <option value="متاهل">متاهل</option>
            <option value="طلاق گرفته">طلاق گرفته</option>
          </select>
          {errors.marital_status && (
            <p className="text-red-600 text-sm mt-1">
              {errors.marital_status.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;
