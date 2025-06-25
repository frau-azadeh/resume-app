import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  setEducationList as saveEducationList,
  setEducationForm as saveEducationForm,
} from "../store/slices/educationSlice";
import dayjs, { todayJalali } from "../utils/date";
import type { Dayjs } from "dayjs";
import JalaliDateInput from "../components/ui/JalaliDatePicker";

interface EducationFormDataLocal {
  degree: string;
  field: string;
  specialization: string;
  institutionType: string;
  institutionName: string;
  grade: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isStudying: boolean;
  description: string;
}

const defaultFormValues: EducationFormDataLocal = {
  degree: "",
  field: "",
  specialization: "",
  institutionType: "",
  institutionName: "",
  grade: "",
  startDate: todayJalali(),
  endDate: todayJalali(),
  isStudying: false,
  description: "",
};

const EducationHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const educationListInStore = useSelector((state: RootState) => state.education.educationList);
  const educationFormInStore = useSelector((state: RootState) => state.education.educationForm);

  const { register, handleSubmit, reset, setValue, watch } = useForm<EducationFormDataLocal>({
    defaultValues: defaultFormValues,
  });

  const [educationList, setEducationList] = useState<EducationFormDataLocal[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isStudying = watch("isStudying");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    setEducationList(
      educationListInStore.map((edu) => ({
        ...edu,
        startDate: edu.startDate ? dayjs(edu.startDate, "YYYY-MM-DD") : null,
        endDate: edu.endDate ? dayjs(edu.endDate, "YYYY-MM-DD") : null,
      }))
    );

    if (educationFormInStore) {
      reset({
        ...defaultFormValues,
        ...educationFormInStore,
        startDate: educationFormInStore.startDate
          ? dayjs(educationFormInStore.startDate, "YYYY-MM-DD")
          : todayJalali(),
        endDate: educationFormInStore.endDate
          ? dayjs(educationFormInStore.endDate, "YYYY-MM-DD")
          : todayJalali(),
      });
    }
  }, [educationListInStore, educationFormInStore, reset]);

  const onSubmit = (data: EducationFormDataLocal): void => {
    const updatedList = [...educationList];

    if (editingIndex !== null) {
      updatedList[editingIndex] = data;
      toast.success("سابقه تحصیلی ویرایش شد");
    } else {
      updatedList.push(data);
      toast.success("سابقه تحصیلی ثبت شد");
    }

    setEducationList(updatedList);
    dispatch(
      saveEducationList(
        updatedList.map((item) => ({
          ...item,
          startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
        }))
      )
    );

    dispatch(saveEducationForm(null));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleDelete = (index: number) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    dispatch(
      saveEducationList(
        updatedList.map((item) => ({
          ...item,
          startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
        }))
      )
    );
    toast.success("سابقه تحصیلی حذف شد");
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
        <JalaliDateInput label="تاریخ شروع" value={startDate} onChange={(v) => setValue("startDate", v)} />
        <JalaliDateInput label="تاریخ پایان" value={endDate} onChange={(v) => setValue("endDate", v)} disabled={isStudying} />
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
          <Button type="submit">{editingIndex !== null ? "ویرایش سابقه" : "ثبت سابقه"}</Button>
        </div>
      </form>

      {/* لیست سوابق */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">لیست سوابق</h2>
        {educationList.map((item, index) => (
          <div key={index} className="border rounded p-2 mb-2 flex justify-between items-center">
            <div>
              <div>{item.degree} - {item.field}</div>
              <div>
                {item.startDate?.format("YYYY-MM-DD")} تا{" "}
                {item.isStudying ? "در حال تحصیل" : item.endDate?.format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingIndex(index);
                  reset(item);
                  dispatch(saveEducationForm({
                    ...item,
                    startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
                    endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
                  }));
                }}
                className="text-blue-600"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationHistory;
