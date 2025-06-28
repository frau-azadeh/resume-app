import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

import SkillForm from "../components/skill/SkillForm";
import LanguageSkillForm from "../components/skill/LanguageSkillForm";
import ManagementSkillForm from "../components/skill/ManagementSkillForm";
import ResumeUpload from "../components/skill/ResumeUpload";

import {
  addSkill,
  addLanguageSkill,
  addManagementSkill,
  deleteSkill,
  deleteLanguageSkill,
  deleteManagementSkill,
} from "../store/slices/skillSlice";

import type { ManagementSkillData } from "../validation/skillSchema";
import { Button } from "../components/ui";

const SkillInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { skillList, languageSkills, managementSkills } = useSelector(
    (state: RootState) => state.skill,
  );

  const handleManagementSkillChange = (
    data: ManagementSkillData | null,
    index?: number,
  ) => {
    if (index !== undefined) {
      if (data === null) {
        dispatch(deleteManagementSkill(index));
      } else {
        dispatch(deleteManagementSkill(index));
        dispatch(addManagementSkill(data));
      }
    } else if (data !== null) {
      dispatch(addManagementSkill(data));
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "next") navigate("/form/summary");
    else navigate("/form/work");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      {/* فرم مهارت‌های فنی */}
      <SkillForm
        onAdd={(data) => dispatch(addSkill(data))}
        skills={skillList}
        onDelete={(index) => dispatch(deleteSkill(index))}
      />

      {/* فرم مهارت‌های مدیریتی */}
      <ManagementSkillForm
        managementSkills={managementSkills}
        onAdd={handleManagementSkillChange}
      />

      {/* فرم مهارت‌های زبانی */}
      <LanguageSkillForm
        onAdd={(data) => dispatch(addLanguageSkill(data))}
        languageSkills={languageSkills}
        onDelete={(index) => dispatch(deleteLanguageSkill(index))}
      />

      <ResumeUpload />

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => handleNavigation("prev")}
          className="btn btn-outline"
        >
          قبلی
        </Button>
        <Button
          onClick={() => handleNavigation("next")}
          className="btn btn-primary"
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default SkillInfo;
