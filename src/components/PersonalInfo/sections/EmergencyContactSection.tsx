// EmergencyContactSection.tsx
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import { Input } from "../../ui";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const EmergencyContactSection: React.FC<Props> = ({ register, errors }) => (
  <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">تماس اضطراری</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        label="نام تماس اضطراری"
        {...register("emergencyContactName")}
        error={errors.emergencyContactName}
      />
      <Input
        label="نسبت تماس اضطراری"
        {...register("emergencyContactRelation")}
        error={errors.emergencyContactRelation}
      />
      <Input
        label="شماره تماس اضطراری"
        {...register("emergencyContactPhone")}
        error={errors.emergencyContactPhone}
      />
    </div>
  </section>
);

export default EmergencyContactSection;
