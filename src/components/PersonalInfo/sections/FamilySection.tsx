// FamilySection.tsx
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import { Input } from "../../ui";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const FamilySection: React.FC<Props> = ({ register, errors }) => (
  <section className=" rounded-lg p-4 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">اطلاعات خانوادگی</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        label="نام پدر"
        {...register("father_name")}
        error={errors.father_name}
      />
      <Input
        label="شغل پدر"
        {...register("father_job")}
        error={errors.father_job}
      />
      <Input
        label="تحصیلات پدر"
        {...register("father_education")}
        error={errors.father_education}
      />
      <Input
        label="نام مادر"
        {...register("mother_name")}
        error={errors.mother_name}
      />
      <Input
        label="شغل مادر"
        {...register("mother_job")}
        error={errors.mother_job}
      />
      <Input
        label="تحصیلات مادر"
        {...register("mother_education")}
        error={errors.mother_education}
      />
      <Input
        label="تعداد خواهر و برادر"
        type="number"
        {...register("siblings_count", { valueAsNumber: true })}
        error={errors.siblings_count}
      />
      <Input
        label="تعداد فرزند"
        type="number"
        {...register("children_count", { valueAsNumber: true })}
        error={errors.children_count}
      />
    </div>
  </section>
);

export default FamilySection;
