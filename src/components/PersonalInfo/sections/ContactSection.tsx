// ContactSection.tsx
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PersonalInfoFormData } from "../PersonalInfoForm";
import { Input } from "../../ui";

interface Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const ContactSection: React.FC<Props> = ({ register, errors }) => (
  <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">اطلاعات تماس</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="تلفن" {...register("phone")} error={errors.phone} />
      <Input
        label="ایمیل"
        type="email"
        {...register("email")}
        error={errors.email}
      />
    </div>
  </section>
);

export default ContactSection;
