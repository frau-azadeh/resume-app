// EmergencyContactSection.tsx
import React from "react";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "../../ui";
import type { PersonalInfoFormData } from "../PersonalInfoForm";

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
        {...register("emergency_contact_name")}
        error={errors.emergency_contact_name}
      />
      <Input
        label="نسبت تماس اضطراری"
        {...register("emergency_contact_relation")}
        error={errors.emergency_contact_relation}
      />
      <Input
        label="شماره تماس اضطراری"
        {...register("emergency_contact_phone")}
        error={errors.emergency_contact_phone}
      />
    </div>
  </section>
);

export default EmergencyContactSection;
