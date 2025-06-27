import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../store/store";
import { setEducationList as saveEducationList } from "../store/slices/educationSlice";
import dayjs, { todayJalali } from "../utils/date";
import EducationForm from "../components/education/EducationForm";
import EducationList from "../components/education/EducationList";
import type { EducationFormDataLocal } from "../validation/educationSchema";
import type { EducationFormData } from "../store/slices/educationSlice";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";

// تبدیل redux به local (string -> Dayjs)
const mapFromStoreToLocal = (
  item: EducationFormData,
): EducationFormDataLocal => ({
  ...item,
  startDate: dayjs(item.startDate),
  endDate: item.endDate ? dayjs(item.endDate) : null,
  field: item.field ?? "",
  specialization: item.specialization ?? "",
  institutionType: item.institutionType ?? "",
  institutionName: item.institutionName ?? "",
  grade: item.grade ?? "",
  description: item.description ?? "",
});

// تبدیل local به redux (Dayjs -> string)
const mapFromLocalToStore = (
  item: EducationFormDataLocal,
): EducationFormData => ({
  ...item,
  startDate: item.startDate.format("YYYY-MM-DD"),
  endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : undefined,
});

const defaultFormValues: EducationFormDataLocal = {
  degree: "",
  field: "",
  specialization: "",
  institutionType: "",
  institutionName: "",
  grade: "",
  startDate: todayJalali(),
  endDate: null,
  isStudying: false,
  description: "",
};

const EducationHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const educationListInStore = useSelector(
    (state: RootState) => state.education.educationList,
  );

  const [educationList, setEducationList] = useState<EducationFormDataLocal[]>(
    [],
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formInitialData, setFormInitialData] =
    useState<EducationFormDataLocal>(defaultFormValues);

  // مپ کردن داده redux به local هنگام بارگذاری
  useEffect(() => {
    const mapped = educationListInStore.map(mapFromStoreToLocal);
    setEducationList(mapped);
  }, [educationListInStore]);

  const handleSubmit = (data: EducationFormDataLocal) => {
    let updatedList = [...educationList];
    if (editingIndex !== null) {
      updatedList[editingIndex] = data;
      toast.success("سابقه تحصیلی ویرایش شد");
    } else {
      updatedList.push(data);
      toast.success("سابقه تحصیلی ثبت شد");
    }
    setEducationList(updatedList);

    // مپ کردن local به redux قبل از ذخیره در store
    dispatch(saveEducationList(updatedList.map(mapFromLocalToStore)));

    setEditingIndex(null);
    setFormInitialData(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormInitialData(educationList[index]);
  };

  const handleDelete = (index: number) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    dispatch(saveEducationList(updatedList.map(mapFromLocalToStore)));
    toast.success("سابقه تحصیلی حذف شد");

    if (editingIndex === index) {
      setEditingIndex(null);
      setFormInitialData(defaultFormValues);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormInitialData(defaultFormValues);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق تحصیلی</h1>
      <EducationForm
        initialData={formInitialData}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
        isEditing={editingIndex !== null}
      />
      <EducationList
        educationList={educationList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => navigate("/form/personal-info")}
          variant="outline"
        >
          قبلی
        </Button>
        <Button onClick={() => navigate("/form/work-experience")}>بعدی</Button>
      </div>
    </div>
  );
};

export default EducationHistory;
