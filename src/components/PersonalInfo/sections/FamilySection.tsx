// FamilySection.tsx
import React from "react";
import type{ FieldErrors, UseFormRegister } from "react-hook-form";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import { Input } from "../../ui";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const FamilySection: React.FC<Props> = ({ register, errors }) => (
  <section className="border rounded-lg p-4 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">اطلاعات خانوادگی</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input label="نام پدر" {...register("fatherName")} error={errors.fatherName} />
      <Input label="شغل پدر" {...register("fatherJob")} error={errors.fatherJob} />
      <Input
        label="تحصیلات پدر"
        {...register("fatherEducation")}
        error={errors.fatherEducation}
      />
      <Input label="نام مادر" {...register("motherName")} error={errors.motherName} />
      <Input label="شغل مادر" {...register("motherJob")} error={errors.motherJob} />
      <Input
        label="تحصیلات مادر"
        {...register("motherEducation")}
        error={errors.motherEducation}
      />
      <Input
        label="تعداد خواهر و برادر"
        type="number"
        {...register("siblingsCount", { valueAsNumber: true })}
        error={errors.siblingsCount}
      />
      <Input
        label="تعداد فرزند"
        type="number"
        {...register("childrenCount", { valueAsNumber: true })}
        error={errors.childrenCount}
      />
    </div>
  </section>
);

export default FamilySection;
