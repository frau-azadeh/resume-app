import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import {
  setSkillList,
  setSkillForm,
  setLanguageSkills,
  setManagementSkills,
} from "../store/slices/skillSlice";
import type {
  Proficiency,
  LanguageSkill,
  ManagementSkill,
} from "../store/slices/skillSlice";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toast } from "react-toastify";

interface SkillFormData {
  name: string;
  level: number;
}

const defaultSkillValues: SkillFormData = { name: "", level: 0 };
const defaultLanguageValues: LanguageSkill = {
  language: "",
  reading: "متوسط",
  writing: "متوسط",
  speaking: "متوسط",
  comprehension: "متوسط",
};

const allManagerialSkills = [
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

const SkillForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const skillListInStore = useSelector((state: RootState) => state.skill.skillList);
  const languageSkillsInStore = useSelector((state: RootState) => state.skill.languageSkills);
  const managementSkillsInStore = useSelector((state: RootState) => state.skill.managementSkills);
  const skillFormInStore = useSelector((state: RootState) => state.skill.skillForm);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<SkillFormData>({ defaultValues: defaultSkillValues });

  const [skillList, setSkillListLocal] = useState<SkillFormData[]>([]);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);

  const [languageForm, setLanguageForm] = useState<LanguageSkill>(defaultLanguageValues);
  const [languageSkills, setLanguageSkillsLocal] = useState<LanguageSkill[]>([]);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null);

  const [managementForm, setManagementForm] = useState<ManagementSkill>({ name: "", level: 0 });
  const [managementSkills, setManagementSkillsLocal] = useState<ManagementSkill[]>([]);
  const [editingManagementIndex, setEditingManagementIndex] = useState<number | null>(null);

  useEffect(() => {
    setSkillListLocal(skillListInStore || []);
    setLanguageSkillsLocal(languageSkillsInStore || []);
    setManagementSkillsLocal(managementSkillsInStore || []);
    reset({ ...defaultSkillValues, ...skillFormInStore });
  }, [skillListInStore, languageSkillsInStore, managementSkillsInStore, skillFormInStore, reset]);

  const renderStars = (currentValue: number, onChange: (level: number) => void) => (
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
      toast.success("مهارت شما ثبت شد");
    }
    setSkillListLocal(updated);
    dispatch(setSkillList(updated));
    reset(defaultSkillValues);
    setEditingSkillIndex(null);
  };

  const addOrUpdateLanguage = () => {
    const updated = [...languageSkills];
    if (!languageForm.language) {
      toast.error("نام زبان را وارد کنید");
      return;
    }
    if (editingLanguageIndex !== null) {
      updated[editingLanguageIndex] = languageForm;
      toast.success("زبان ویرایش شد");
    } else {
      updated.push(languageForm);
      toast.success("مهارت شما ثبت شد");
    }
    setLanguageSkillsLocal(updated);
    dispatch(setLanguageSkills(updated));
    setLanguageForm(defaultLanguageValues);
    setEditingLanguageIndex(null);
  };

  const addOrUpdateManagementSkill = () => {
    if (!managementForm.name) {
      toast.error("نام مهارت را وارد کنید");
      return;
    }
    const updated = [...managementSkills];
    if (editingManagementIndex !== null) {
      updated[editingManagementIndex] = managementForm;
      toast.success("مهارت مدیریتی ویرایش شد");
    } else {
      updated.push(managementForm);
      toast.success("مهارت شما ثبت شد");
    }
    setManagementSkillsLocal(updated);
    dispatch(setManagementSkills(updated));
    setManagementForm({ name: "", level: 0 });
    setEditingManagementIndex(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow" dir="rtl">
      <h2 className="text-xl font-bold text-center mb-4">مهارت‌ها</h2>

      {/* مهارت تخصصی */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <Input label="نام مهارت" {...register("name", { required: "نام مهارت الزامی است" })} />
        <div>
          <label className="text-sm font-medium mb-1 block">میزان تسلط</label>
          {renderStars(watch("level"), (lvl) => setValue("level", lvl))}
        </div>
        <div className="text-center">
          <Button type="submit">{editingSkillIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}</Button>
        </div>
      </form>

      {/* نمایش مهارت‌ها */}
      <div className="mt-6 space-y-4">
        {skillList.map((skill, index) => (
          <div key={index} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-yellow-500">{"★".repeat(skill.level)}{"☆".repeat(5 - skill.level)}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                setEditingSkillIndex(index);
                setValue("name", skill.name);
                setValue("level", skill.level);
              }}>ویرایش</Button>
              <Button onClick={() => {
                const updated = skillList.filter((_, i) => i !== index);
                setSkillListLocal(updated);
                dispatch(setSkillList(updated));
              }} variant="destructive">حذف</Button>
            </div>
          </div>
        ))}
      </div>

      {/* زبان خارجی */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">زبان خارجی</h3>
        <Input label="نام زبان" value={languageForm.language} onChange={(e) => setLanguageForm({ ...languageForm, language: e.target.value })} />
        {["reading", "writing", "speaking", "comprehension"].map((field) => (
          <div key={field} className="mt-2">
            <label className="block font-medium">{field}</label>
            <select
              className="border rounded p-1 w-full"
              value={(languageForm as any)[field]}
              onChange={(e) => setLanguageForm({ ...languageForm, [field]: e.target.value as Proficiency })}
            >
              <option value="ضعیف">ضعیف</option>
              <option value="متوسط">متوسط</option>
              <option value="عالی">عالی</option>
            </select>
          </div>
        ))}
        <div className="text-center mt-2">
          <Button onClick={addOrUpdateLanguage}>
            {editingLanguageIndex !== null ? "ویرایش زبان" : "افزودن زبان"}
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {languageSkills.map((lang, index) => (
            <div key={index} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{lang.language}</p>
                <p>درک: {lang.comprehension} | گفتار: {lang.speaking} | نوشتار: {lang.writing} | خواندن: {lang.reading}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => {
                  setLanguageForm(lang);
                  setEditingLanguageIndex(index);
                }}>ویرایش</Button>
                <Button onClick={() => {
                  const updated = languageSkills.filter((_, i) => i !== index);
                  setLanguageSkillsLocal(updated);
                  dispatch(setLanguageSkills(updated));
                }} variant="destructive">حذف</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* مهارت‌های مدیریتی */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">مهارت‌های مدیریتی</h3>
        <select
          className="border p-2 rounded w-full"
          value={managementForm.name}
          onChange={(e) => setManagementForm({ ...managementForm, name: e.target.value })}
        >
          <option value="">انتخاب مهارت</option>
          {allManagerialSkills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="mt-2">{renderStars(managementForm.level, (lvl) => setManagementForm({ ...managementForm, level: lvl }))}</div>
        <div className="text-center mt-2">
          <Button onClick={addOrUpdateManagementSkill}>
            {editingManagementIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {managementSkills.map((skill, index) => (
            <div key={index} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{skill.name}</p>
                <p className="text-yellow-500">{"★".repeat(skill.level)}{"☆".repeat(5 - skill.level)}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => {
                  setManagementForm(skill);
                  setEditingManagementIndex(index);
                }}>ویرایش</Button>
                <Button onClick={() => {
                  const updated = managementSkills.filter((_, i) => i !== index);
                  setManagementSkillsLocal(updated);
                  dispatch(setManagementSkills(updated));
                }} variant="destructive">حذف</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* دکمه مرحله قبل */}
      <div className="mt-8 flex justify-between">
        <Button onClick={() => {
          dispatch(setSkillForm(getValues()));
          dispatch(setSkillList(skillList));
          dispatch(setLanguageSkills(languageSkills));
          dispatch(setManagementSkills(managementSkills));
          navigate("/form/work-experience");
        }} type="button">مرحله قبل</Button>
      </div>
    </div>
  );
};

export default SkillForm;
