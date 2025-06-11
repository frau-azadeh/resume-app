// components/EducationHistory.tsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setActiveTab } from "../store/slices/tabSlice";
import {
  setEducationList as saveEducationList,
  setEducationForm as saveEducationForm,
} from "../store/slices/educationSlice";

interface EducationFormData {
  degree: string;
  field: string;
  specialization: string;
  institutionType: string;
  institutionName: string;
  grade: string;
  startDate: string;
  endDate: string;
  isStudying: boolean;
  description: string;
}

const defaultFormValues: EducationFormData = {
  degree: "",
  field: "",
  specialization: "",
  institutionType: "",
  institutionName: "",
  grade: "",
  startDate: "",
  endDate: "",
  isStudying: false,
  description: "",
};

const EducationHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const educationListInStore = useSelector((state: RootState) => state.education.educationList);
  const educationFormInStore = useSelector((state: RootState) => state.education.educationForm);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<EducationFormData>({
    defaultValues: defaultFormValues,
  });

  const [educationList, setEducationList] = useState<EducationFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isStudying = watch("isStudying");

  useEffect(() => {
    setEducationList(educationListInStore || []);
    reset({ ...defaultFormValues, ...educationFormInStore });
  }, [educationListInStore, educationFormInStore, reset]);

  const onSubmit = (data: EducationFormData) => {
    let updatedList = [...educationList];

    if (editingIndex !== null) {
      updatedList[editingIndex] = data;
      toast.success("سابقه تحصیلی ویرایش شد");
    } else {
      updatedList.push(data);
      toast.success("سابقه تحصیلی ثبت شد");
    }

    setEducationList(updatedList);
    dispatch(saveEducationList(updatedList));
    dispatch(saveEducationForm({}));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    const item = educationList[index];
    Object.entries(item).forEach(([key, value]) => {
      setValue(key as keyof EducationFormData, value);
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    dispatch(saveEducationList(updated));
    toast.info("سابقه تحصیلی حذف شد");
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultFormValues);
    }
  };

  const handleNavigation = (tab: string) => {
    const currentFormData = getValues();
    dispatch(saveEducationList(educationList));
    dispatch(saveEducationForm(currentFormData));
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق تحصیلی</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="مقطع" {...register("degree", { required: "مقطع الزامی است" })} />
        <Input label="رشته" {...register("field")} />
        <Input label="گرایش" {...register("specialization")} />
        <Input label="نوع موسسه" {...register("institutionType")} />
        <Input label="نام موسسه" {...register("institutionName")} />
        <Input label="معدل" {...register("grade")} />
        <Input label="تاریخ شروع" type="date" {...register("startDate")} />
        <Input label="تاریخ پایان" type="date" {...register("endDate")} disabled={isStudying} />

        <div className="col-span-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isStudying")} />
            در حال تحصیل هستم
          </label>
        </div>

        <div className="col-span-2">
          <Input label="توضیحات" {...register("description")} />
        </div>

        <div className="col-span-2 text-center">
          <Button type="submit">
            {editingIndex !== null ? "ویرایش سابقه" : "ثبت سابقه"}
          </Button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {educationList.map((edu, index) => (
          <div key={index} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{edu.degree} - {edu.field}</p>
              <p className="text-sm text-gray-500">{edu.institutionName}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(index)} type="button">ویرایش</Button>
              <Button onClick={() => handleDelete(index)} type="button" variant="destructive">حذف</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={() => handleNavigation("prevTab")} type="button">مرحله قبل</Button>
        <Button onClick={() => handleNavigation("nextTab")} type="button">مرحله بعد</Button>
      </div>
    </div>
  );
};

export default EducationHistory;
