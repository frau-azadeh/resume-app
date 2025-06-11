import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setActiveTab } from "../store/slices/tabSlice";
import { setSkillList, setSkillForm } from "../store/slices/skillSlice";
import type { Proficiency } from "../store/slices/skillSlice";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toast } from "react-toastify";

interface SkillFormData {
  name: string;
  level: number;
}

interface LanguageSkill {
  language: string;
  reading: Proficiency;
  writing: Proficiency;
  speaking: Proficiency;
  comprehension: Proficiency;
}

interface ManagerialSkill {
  name: string;
  level: number;
}

const defaultFormValues: SkillFormData = {
  name: "",
  level: 0,
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

const tabsOrder = ["personal-info", "education", "work-experience", "skill"];

const SkillForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const skillListInStore = useSelector(
    (state: RootState) => state.skill.skillList,
  );
  const skillFormInStore = useSelector(
    (state: RootState) => state.skill.skillForm,
  );
  const activeTab = useSelector((state: RootState) => state.tab.activeTab);

  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<SkillFormData>({
      defaultValues: defaultFormValues,
    });

  const [skillList, setSkillListLocal] = useState<SkillFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [languageSkill, setLanguageSkill] = useState<LanguageSkill | null>(
    null,
  );
  const [managerialSkills, setManagerialSkills] = useState<ManagerialSkill[]>(
    [],
  );

  useEffect(() => {
    setSkillListLocal(skillListInStore || []);
    reset({ ...defaultFormValues, ...skillFormInStore });
  }, [skillListInStore, skillFormInStore, reset]);

  const onSubmit = (data: SkillFormData) => {
    const updated = [...skillList];
    if (editingIndex !== null) {
      updated[editingIndex] = data;
      toast.success("مهارت ویرایش شد");
    } else {
      updated.push(data);
      toast.success("مهارت اضافه شد");
    }
    setSkillListLocal(updated);
    dispatch(setSkillList(updated));
    dispatch(setSkillForm({}));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    const item = skillList[index];
    Object.entries(item).forEach(([key, value]) => {
      setValue(key as keyof SkillFormData, value);
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = skillList.filter((_, i) => i !== index);
    setSkillListLocal(updated);
    dispatch(setSkillList(updated));
    toast.info("مهارت حذف شد");
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultFormValues);
    }
  };

  const handleNavigation = (dir: "next" | "prev") => {
    const currentForm = getValues();
    dispatch(setSkillForm(currentForm));
    dispatch(setSkillList(skillList));

    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex === -1) return;

    const nextIndex =
      dir === "next"
        ? Math.min(currentIndex + 1, tabsOrder.length - 1)
        : Math.max(currentIndex - 1, 0);

    dispatch(setActiveTab(tabsOrder[nextIndex]));
  };

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

  const toggleManagerialSkill = (skill: string) => {
    const exists = managerialSkills.find((s) => s.name === skill);
    if (exists) {
      setManagerialSkills(managerialSkills.filter((s) => s.name !== skill));
    } else {
      if (managerialSkills.length >= 3) {
        toast.warn("حداکثر ۳ مهارت مدیریتی را می‌توانید انتخاب کنید.");
        return;
      }
      setManagerialSkills([...managerialSkills, { name: skill, level: 0 }]);
    }
  };

  const setManagerialLevel = (skill: string, level: number) => {
    setManagerialSkills((prev) =>
      prev.map((s) => (s.name === skill ? { ...s, level } : s)),
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow" dir="rtl">
      <h2 className="text-xl font-bold text-center mb-4">مهارت‌ها</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <Input
          label="نام مهارت"
          {...register("name", { required: "نام مهارت الزامی است" })}
        />

        <div>
          <label className="text-sm font-medium mb-1 block">میزان تسلط</label>
          {renderStars(watch("level"), (lvl) => setValue("level", lvl))}
        </div>

        <div className="text-center">
          <Button type="submit">
            {editingIndex !== null ? "ویرایش مهارت" : "افزودن مهارت"}
          </Button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">زبان خارجی</h3>
        <Input
          label="نام زبان"
          onChange={(e) =>
            setLanguageSkill({
              ...languageSkill,
              language: e.target.value,
            } as LanguageSkill)
          }
        />
        {["reading", "writing", "speaking", "comprehension"].map((skill) => (
          <div key={skill} className="mt-2">
            <label className="block font-medium">{skill}</label>
            <select
              onChange={(e) =>
                setLanguageSkill({
                  ...languageSkill,
                  [skill]: e.target.value as Proficiency,
                } as LanguageSkill)
              }
            >
              <option value="ضعیف">ضعیف</option>
              <option value="متوسط">متوسط</option>
              <option value="عالی">عالی</option>
            </select>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">
          مهارت‌های مدیریتی (حداکثر ۳ مورد)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {allManagerialSkills.map((skill) => (
            <div key={skill} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={managerialSkills.some((s) => s.name === skill)}
                onChange={() => toggleManagerialSkill(skill)}
              />
              <label>{skill}</label>
              {managerialSkills.some((s) => s.name === skill) &&
                renderStars(
                  managerialSkills.find((s) => s.name === skill)?.level || 0,
                  (lvl) => setManagerialLevel(skill, lvl),
                )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {skillList.map((skill, index) => (
          <div
            key={index}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-yellow-500">
                {"★".repeat(skill.level)}
                {"☆".repeat(5 - skill.level)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={() => handleEdit(index)}>
                ویرایش
              </Button>
              <Button
                type="button"
                onClick={() => handleDelete(index)}
                variant="destructive"
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={() => handleNavigation("prev")} type="button">
          مرحله قبل
        </Button>
        <Button onClick={() => handleNavigation("next")} type="button">
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default SkillForm;
