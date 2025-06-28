// ResidenceSection.tsx
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import { Input } from "../../ui";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const ResidenceSection: React.FC<Props> = ({ register, errors }) => (
<section className="border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">محل سکونت</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        label="استان محل سکونت"
        {...register("residenceProvince")}
        error={errors.residenceProvince}
      />
      <Input
        label="شهر محل سکونت"
        {...register("residenceCity")}
        error={errors.residenceCity}
      />
      <Input label="آدرس" {...register("address")} error={errors.address} />
      <Input
        label="کد پستی"
        {...register("postalCode")}
        error={errors.postalCode}
      />
    </div>
  </section>
);

export default ResidenceSection;
