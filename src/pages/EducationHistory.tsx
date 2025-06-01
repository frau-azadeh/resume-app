// src/pages/EducationHistory.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

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

const EducationHistory: React.FC = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<EducationFormData>({
    defaultValues: {
      isStudying: false,
    },
  });
  const [educationList, setEducationList] = useState<EducationFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isStudying = watch("isStudying");

  const onSubmit = (data: EducationFormData) => {
    if (editingIndex !== null) {
      const updatedList = [...educationList];
      updatedList[editingIndex] = data;
      setEducationList(updatedList);
      toast.success("سابقه تحصیلی ویرایش شد");
    } else {
      setEducationList((prev) => [...prev, data]);
      toast.success("سابقه تحصیلی ثبت شد");
    }
    reset();
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    const item = educationList[index];
    Object.keys(item).forEach((key) => {
      setValue(key as keyof EducationFormData, item[key as keyof EducationFormData]);
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
    toast.info("سابقه تحصیلی حذف شد");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">سوابق تحصیلی</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="مقطع" {...register("degree", { required: "مقطع الزامی است" })} />
        <Input label="رشته" {...register("field", { required: "رشته الزامی است" })} />
        <Input label="گرایش" {...register("specialization", { required: "گرایش الزامی است" })} />
        <Input label="نوع آموزشگاه/دانشگاه" {...register("institutionType", { required: true })} />
        <Input label="نام آموزشگاه/دانشگاه" {...register("institutionName", { required: true })} />
        <Input label="معدل" {...register("grade", { required: true })} />
        
        <div>
          <label className="block text-sm font-medium mb-1">تاریخ شروع</label>
          <input type="month" {...register("startDate")} className="w-full border p-2 rounded" />
        </div>

        {!isStudying && (
          <div>
            <label className="block text-sm font-medium mb-1">تاریخ پایان</label>
            <input type="month" {...register("endDate")} className="w-full border p-2 rounded" />
          </div>
        )}

        <div className="flex items-center space-x-2 col-span-2">
          <input type="checkbox" {...register("isStudying")} id="isStudying" />
          <label htmlFor="isStudying">در حال تحصیل هستم</label>
        </div>

        <div className="col-span-2">
          <Input label="توضیحات" {...register("description")} />
        </div>

        <div className="col-span-2 flex gap-2 justify-end">
          <Button type="submit">{editingIndex !== null ? "ویرایش" : "ثبت"}</Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>
            انصراف
          </Button>
        </div>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-bold mb-4">لیست سوابق تحصیلی</h2>
      {educationList.length === 0 && <p className="text-gray-500">هنوز سابقه‌ای ثبت نشده است.</p>}
      <ul className="space-y-4">
        {educationList.map((edu, index) => (
          <li key={index} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{edu.degree} - {edu.field} ({edu.institutionName})</p>
              <p className="text-sm text-gray-600">
                {edu.startDate} تا {edu.isStudying ? "در حال تحصیل" : edu.endDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => handleEdit(index)}>
                ویرایش
              </Button>
              <Button type="button" variant="destructive" onClick={() => handleDelete(index)}>
                حذف
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <Button type="button" variant="secondary">مرحله قبل</Button>
        <Button type="button">مرحله بعد</Button>
      </div>
    </div>
  );
};

export default EducationHistory;
