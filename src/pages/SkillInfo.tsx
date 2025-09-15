import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LanguageSkillForm from "../components/skill/LanguageSkillForm";
import ManagementSkillForm from "../components/skill/ManagementSkillForm";
import ResumeUpload from "../components/skill/ResumeUpload";
import SkillForm from "../components/skill/SkillForm";
import { Button } from "../components/ui";
import { supabase } from "../lib/supabase";
import {
  addLanguageSkill,
  addManagementSkill,
  addSkill,
  deleteLanguageSkill,
  deleteManagementSkill,
  deleteSkill,
} from "../store/slices/skillSlice";
import type { AppDispatch, RootState } from "../store/store";
import type {
  LanguageSkillData,
  ManagementSkillData,
  Proficiency,
} from "../validation/skillSchema";

// 🔧 نوع واحد برای ارسال داده‌ها به Supabase
type SkillRow = {
  user_id: string;
  skill_name?: string;
  skill_level?: string;
  manag_name?: string;
  manag_level?: string;
  language?: string;
  reading?: Proficiency | null;
  writing?: Proficiency | null;
  speaking?: Proficiency | null;
  comprehension?: Proficiency | null;
  resume_name?: string;
  resume_base64?: string;
};

const SkillInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const { skillList, languageSkills, managementSkills, resumeFile } =
    useSelector((state: RootState) => state.skill);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        toast.error("کاربر یافت نشد");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { error } = await supabase
        .from("skill")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        toast.error("خطا در دریافت مهارت‌ها");
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

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

  const handleSaveAllSkills = async () => {
    if (!user?.id) return toast.error("کاربر یافت نشد");

    // حذف رکوردهای قبلی کاربر
    const { error: deleteError } = await supabase
      .from("skill")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      toast.error("خطا در حذف مهارت‌های قبلی");
      return;
    }

    const insertPayload: SkillRow[] = [
      ...skillList.map((s) => ({
        user_id: user.id,
        skill_name: s.skill_name,
        skill_level: s.skill_level?.toString() ?? "1",
      })),
      ...languageSkills.map((l) => ({
        user_id: user.id,
        language: l.language,
        reading: l.reading,
        writing: l.writing,
        speaking: l.speaking,
        comprehension: l.comprehension,
      })),
      ...managementSkills.map((m) => ({
        user_id: user.id,
        manag_name: m.manage_name,
        manag_level: m.manage_level.toString(),
      })),
    ];

    // افزودن رزومه به‌عنوان یک رکورد مستقل
    if (resumeFile) {
      insertPayload.push({
        user_id: user.id,
        resume_name: resumeFile.resume_name ?? "",
        resume_base64: resumeFile.resume_base64 ?? "",
      });
    }

    const { error } = await supabase.from("skill").insert(insertPayload);

    if (error) {
      toast.error("خطا در ذخیره مهارت‌ها");
    } else {
      toast.success("همه مهارت‌ها با موفقیت ذخیره شدند");
      navigate("/form/summary");
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "next") {
      handleSaveAllSkills();
    } else {
      navigate("/form/work-experience");
    }
  };

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">مهارت‌ها</h1>

      <SkillForm
        onAdd={(data) => dispatch(addSkill(data))}
        skills={skillList}
        onDelete={(index) => dispatch(deleteSkill(index))}
      />

      <ManagementSkillForm
        managementSkills={managementSkills}
        onAdd={handleManagementSkillChange}
      />

      <LanguageSkillForm
        onAdd={(data: LanguageSkillData) => dispatch(addLanguageSkill(data))}
        languageSkills={languageSkills}
        onDelete={(index) => dispatch(deleteLanguageSkill(index))}
      />

      <ResumeUpload />

      <div className="flex justify-between mt-8">
        <Button onClick={() => handleNavigation("prev")} variant="outline">
          قبلی
        </Button>
        <Button onClick={() => handleNavigation("next")} variant="primary">
          ذخیره و ادامه
        </Button>
      </div>
    </div>
  );
};

export default SkillInfo;
