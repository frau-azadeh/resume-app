import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { RootState, AppDispatch } from "../store/store";
import { setPersonalInfo } from "../store/slices/personalInfoSlice";
import PersonalInfoForm from "../components/PersonalInfo/PersonalInfoForm";
import type { PersonalInfoFormData } from "../components/PersonalInfo/PersonalInfoForm";

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const savedInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo,
  );

  const formDefaultValues: Partial<PersonalInfoFormData> = {
    ...savedInfo,
    avatar: savedInfo.avatar ?? "",
    birthDate: savedInfo.birthDate ?? "",
    siblingsCount: savedInfo.siblingsCount ?? 0,
    childrenCount: savedInfo.childrenCount ?? 0,
  };

  const handleSubmit = (data: PersonalInfoFormData) => {
    dispatch(setPersonalInfo({ ...data, avatar: data.avatar ?? "" }));
    toast.success("اطلاعات با موفقیت ثبت شد!");
    navigate("/form/education");
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-center mb-6">اطلاعات فردی</h1>
      <PersonalInfoForm
        defaultValues={formDefaultValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PersonalInfo;
