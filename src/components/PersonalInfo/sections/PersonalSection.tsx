// PersonalSection.tsx
import React from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import  { Controller } from "react-hook-form";

import dayjs from "dayjs";

import { Input } from "../../ui";
import JalaliDateInput from "../../ui/JalaliDatePicker";
import type { PersonalInfoFormData } from "../PersonalInfoForm";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
  control: Control<PersonalInfoFormData>;
}

const PersonalSection: React.FC<Props> = ({ register, errors, control }) => {
  return (
    <section className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">اطلاعات فردی</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="نام" {...register("firstName")} error={errors.firstName} />
        <Input
          label="نام خانوادگی"
          {...register("lastName")}
          error={errors.lastName}
        />
        <Input
          label="کد ملی"
          {...register("nationalCode")}
          error={errors.nationalCode}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => {
            const dayjsValue = field.value ? dayjs(field.value) : null;
            return (
              <JalaliDateInput
                label="تاریخ تولد"
                value={dayjsValue}
                onChange={(date) =>
                  field.onChange(date ? date.toISOString() : null)
                }
                error={errors.birthDate?.message}
                disabled={false}
              />
            );
          }}
        />
        <Input
          label="استان محل تولد"
          {...register("birthProvince")}
          error={errors.birthProvince}
        />
        <Input label="شهر محل تولد" {...register("birthCity")} error={errors.birthCity} />
        <Input label="شماره شناسنامه" {...register("idNumber")} error={errors.idNumber} />
        <Input
          label="استان محل صدور"
          {...register("issueProvince")}
          error={errors.issueProvince}
        />
        <Input label="شهر محل صدور" {...register("issueCity")} error={errors.issueCity} />

        <div>
          <label className="font-medium mb-1 block">جنسیت</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="مرد" {...register("gender")} /> مرد
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="زن" {...register("gender")} /> زن
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium mb-1 block">دین</label>
          <div className="flex gap-4 flex-wrap">
            {["اسلام", "یهودی", "مسیحی", "سایر"].map((val) => (
              <label key={val} className="flex items-center gap-1">
                <input type="radio" value={val} {...register("religion")} /> {val}
              </label>
            ))}
          </div>
          {errors.religion && (
            <p className="text-red-500 text-sm mt-1">{errors.religion.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium mb-1 block">وضعیت تاهل</label>
          <select {...register("maritalStatus")} className="w-full border rounded p-2">
            <option value="">انتخاب کنید</option>
            <option value="مجرد">مجرد</option>
            <option value="متاهل">متاهل</option>
            <option value="طلاق گرفته">طلاق گرفته</option>
          </select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">{errors.maritalStatus.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;
