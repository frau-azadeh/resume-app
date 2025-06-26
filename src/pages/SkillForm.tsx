import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import type { AnyAction } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "../store/store";
import {
  setSkillList,
  setLanguageSkills,
  setManagementSkills,
  setResumeFile,
  type Proficiency,
  type LanguageSkill,
  type ManagementSkill,
} from "../store/slices/skillSlice";

import {
  skillSchema,
  languageSkillSchema,
  managementSkillSchema,
} from "../validation/skillSchema";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import "../App.css";

type SkillFormData = z.infer<typeof skillSchema>;

const defaultSkillValues: SkillFormData = { name: "", level: 0 };
const defaultLanguageValues: LanguageSkill = {
  language: "",
  reading: "متوسط",
  writing: "متوسط",
  speaking: "متوسط",
  comprehension: "متوسط",
};
const defaultManagementValues: ManagementSkill = { name: "", level: 0 };

const allManagerialSkills: string[] = [
  "روابط عمومی",
  "انتقاد پذیری",
  "شنونده خوب",
  "اعتماد به نفس",
  "نوآوری",
  "مدیریت جلسات",
  "هوش هیجانی",
  "تیم سازی",
  "مهارت حل مسئله",
  "مدیریت زمان",
  "برنامه ریزی",
  "رهبری",
  "انعطاف پذیری",
  "کار تیمی",
  "مسئولیت پذیری",
];

const proficiencyLevels: Proficiency[] = ["ضعیف", "متوسط", "عالی"];
const languageFields: (keyof Omit<LanguageSkill, "language">)[] = [
  "reading",
  "writing",
  "speaking",
  "comprehension",
];

const SkillForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    skillList: skillListInStore,
    languageSkills: languageSkillsInStore,
    managementSkills: managementSkillsInStore,
    resumeFile,
  } = useSelector((state: RootState) => state.skill);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    defaultValues: defaultSkillValues,
    resolver: zodResolver(skillSchema),
  });

  const [skillList, setSkillListLocal] = useState<SkillFormData[]>([]);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null,
  );

  const [languageForm, setLanguageForm] = useState<LanguageSkill>(
    defaultLanguageValues,
  );
  const [languageSkills, setLanguageSkillsLocal] = useState<LanguageSkill[]>(
    [],
  );
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<
    number | null
  >(null);

  const [managementForm, setManagementForm] = useState<ManagementSkill>(
    defaultManagementValues,
  );
  const [managementSkills, setManagementSkillsLocal] = useState<
    ManagementSkill[]
  >([]);
  const [editingManagementIndex, setEditingManagementIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    setSkillListLocal(skillListInStore || []);
    setLanguageSkillsLocal(languageSkillsInStore || []);
    setManagementSkillsLocal(managementSkillsInStore || []);
    reset(defaultSkillValues);
  }, [skillListInStore, languageSkillsInStore, managementSkillsInStore, reset]);

  const renderStars = (
    currentValue: number,
    onChange: (level: number) => void,
  ) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${star <= currentValue ? "text-yellow-400" : "text-gray-400"}`}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );

  const onSubmit = (data: SkillFormData) => {
    const updated = [...skillList];
    if (editingSkillIndex !== null) {
      updated[editingSkillIndex] = data;
      toast.success("مهارت ویرایش شد");
    } else {
      updated.push(data);
      toast.success("مهارت ثبت شد");
    }
    setSkillListLocal(updated);
    dispatch(setSkillList(updated));
    reset(defaultSkillValues);
    setEditingSkillIndex(null);
  };

  const handleDelete = <T,>(
    list: T[],
    index: number,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    dispatcher: (payload: T[]) => AnyAction, // اکشن کریتور که اکشن برمی‌گرداند
    successMsg: string,
  ) => {
    const updated = list.filter((_, i) => i !== index);
    setter(updated);
    dispatch(dispatcher(updated));
    toast.info(successMsg);
  };

  const addOrUpdateLanguage = () => {
    const parsed = languageSkillSchema.safeParse(languageForm);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }
    const updated = [...languageSkills];
    if (editingLanguageIndex !== null) {
      updated[editingLanguageIndex] = languageForm;
      toast.success("زبان ویرایش شد");
    } else {
      updated.push(languageForm);
      toast.success("زبان ثبت شد");
    }
    setLanguageSkillsLocal(updated);
    dispatch(setLanguageSkills(updated));
    setLanguageForm(defaultLanguageValues);
    setEditingLanguageIndex(null);
  };

  const addOrUpdateManagementSkill = () => {
    const parsed = managementSkillSchema.safeParse(managementForm);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }
    if (editingManagementIndex === null && managementSkills.length >= 3) {
      toast.error("حداکثر ۳ مهارت مدیریتی مجاز است");
      return;
    }
    if (
      managementSkills.some(
        (s, i) =>
          s.name === managementForm.name && i !== editingManagementIndex,
      )
    ) {
      toast.error("این مهارت قبلاً انتخاب شده است");
      return;
    }
    const updated = [...managementSkills];
    if (editingManagementIndex !== null) {
      updated[editingManagementIndex] = managementForm;
      toast.success("مهارت مدیریتی ویرایش شد");
    } else {
      updated.push(managementForm);
      toast.success("مهارت مدیریتی ثبت شد");
    }
    setManagementSkillsLocal(updated);
    dispatch(setManagementSkills(updated));
    setManagementForm(defaultManagementValues);
    setEditingManagementIndex(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("فقط فایل PDF مجاز است");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      dispatch(setResumeFile({ name: file.name, base64 }));
      toast.success("فایل رزومه آپلود شد");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow" dir="rtl">
      <h2 className="text-xl font-bold text-center mb-4">مهارت‌ها</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Input
          label="نام مهارت"
          {...register("name")}
          error={errors.name?.message}
        />
        <div>
          <label className="text-sm font-medium mb-1 block">میزان تسلط</label>
          {renderStars(watch("level"), (lvl) => setValue("level", lvl))}
        </div>
        <Button type="submit">
          {editingSkillIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
        </Button>
      </form>

      <div className="mt-4 space-y-2">
        {skillList.map((skill, index) => (
          <div
            key={index}
            className="border p-2 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{skill.name}</p>
              <p className="text-yellow-500">
                {"★".repeat(skill.level)}
                {"☆".repeat(5 - skill.level)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setValue("name", skill.name);
                  setValue("level", skill.level);
                  setEditingSkillIndex(index);
                }}
              >
                ویرایش
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  handleDelete(
                    skillList,
                    index,
                    setSkillListLocal,
                    setSkillList,
                    "مهارت حذف شد",
                  )
                }
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Language Skills */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">زبان خارجی</h3>
        <Input
          label="نام زبان"
          value={languageForm.language}
          onChange={(e) =>
            setLanguageForm({ ...languageForm, language: e.target.value })
          }
        />
        {languageFields.map((field) => (
          <div key={field} className="mt-2">
            <label className="block font-medium">{field}</label>
            <select
              className="border rounded p-1 w-full"
              value={languageForm[field]}
              onChange={(e) =>
                setLanguageForm({
                  ...languageForm,
                  [field]: e.target.value as Proficiency,
                })
              }
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        ))}
        <Button className="mt-2" onClick={addOrUpdateLanguage}>
          {editingLanguageIndex !== null ? "ویرایش زبان" : "افزودن زبان"}
        </Button>

        <div className="mt-4 space-y-2">
          {languageSkills.map((lang, index) => (
            <div
              key={index}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{lang.language}</p>
                <p className="text-sm">
                  خواندن: {lang.reading}، نوشتن: {lang.writing}، صحبت:{" "}
                  {lang.speaking}، درک: {lang.comprehension}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setLanguageForm(lang);
                    setEditingLanguageIndex(index);
                  }}
                >
                  ویرایش
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDelete(
                      languageSkills,
                      index,
                      setLanguageSkillsLocal,
                      setLanguageSkills,
                      "زبان حذف شد",
                    )
                  }
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Management Skills */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">مهارت‌های مدیریتی</h3>
        <select
          className="border p-2 rounded w-full"
          value={managementForm.name}
          onChange={(e) =>
            setManagementForm({ ...managementForm, name: e.target.value })
          }
        >
          <option value="">انتخاب مهارت</option>
          {allManagerialSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <div className="mt-2">
          {renderStars(managementForm.level, (lvl) =>
            setManagementForm({ ...managementForm, level: lvl }),
          )}
        </div>
        <Button className="mt-2" onClick={addOrUpdateManagementSkill}>
          {editingManagementIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
        </Button>

        <div className="mt-4 space-y-2">
          {managementSkills.map((m, index) => (
            <div
              key={index}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{m.name}</p>
                <p className="text-yellow-500">
                  {"★".repeat(m.level)}
                  {"☆".repeat(5 - m.level)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setManagementForm(m);
                    setEditingManagementIndex(index);
                  }}
                >
                  ویرایش
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDelete(
                      managementSkills,
                      index,
                      setManagementSkillsLocal,
                      setManagementSkills,
                      "مهارت مدیریتی حذف شد",
                    )
                  }
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Upload */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">رزومه (فقط PDF)</h3>
        {resumeFile ? (
          <div className="border p-3 rounded flex justify-between items-center">
            <div className="text-sm">{resumeFile.name}</div>
            <div className="flex gap-3">
              <a
                href={resumeFile.base64}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                مشاهده
              </a>
              <Button
                variant="destructive"
                onClick={() => {
                  dispatch(setResumeFile(null));
                  toast.info("فایل رزومه حذف شد");
                }}
              >
                حذف
              </Button>
            </div>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="w-full border p-2 rounded"
          />
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={() => navigate("/form/work-experience")} type="button">
          مرحله قبل
        </Button>
      </div>
    </div>
  );
};

export default SkillForm;
