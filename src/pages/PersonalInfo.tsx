import React, { useEffect } from "react";

import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

import PersonalInfoForm from "../components/PersonalInfo/PersonalInfoForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPersonalInfo } from "../store/slices/personalInfoSlice";

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
                calendar: gregorian,
              })
                .convert(persian)
                .format("YYYY-MM-DD")
            : "",
        }}
      />
    </div>
  );
};

export default PersonalInfoPage;
