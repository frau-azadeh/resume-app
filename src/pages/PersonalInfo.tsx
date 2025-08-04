// PersonalInfoPage.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPersonalInfo } from "../store/slices/personalInfoSlice";
import PersonalInfoForm from "../components/PersonalInfo/PersonalInfoForm";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PersonalInfoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { personalInfo } = useAppSelector((state) => state.personalInfo);

  useEffect(() => {
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">اطلاعات فردی</h1>
      <PersonalInfoForm
  defaultValues={{
    ...personalInfo,
    birth_date: personalInfo.birth_date
      ? new DateObject({
          date: personalInfo.birth_date,
          format: "YYYY-MM-DD",
          calendar: persian,
          locale: persian_fa,
        }).format("YYYY-MM-DD") // ✅ تبدیل به string
      : "",
  }}
/>



    </div>
  );
};

export default PersonalInfoPage;
