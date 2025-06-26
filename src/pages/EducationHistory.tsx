import React, { useEffect, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import JalaliDateInput from "../components/ui/JalaliDatePicker";
import {
  educationSchema,
  type EducationFormDataLocal,
} from "../validation/educationSchema";

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
  const educationListInStore = useSelector(
    (state: RootState) => state.education.educationList,
  );
  const educationFormInStore = useSelector(
    (state: RootState) => state.education.educationForm,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormDataLocal>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(educationSchema),
  });

  const [educationList, setEducationList] = useState<EducationFormDataLocal[]>(
    [],
  );

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isStudying = watch("isStudying");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    setEducationList(
      educationListInStore.map((edu) => ({
        degree: edu.degree,
        field: edu.field ?? "",
        specialization: edu.specialization ?? "",
        institutionType: edu.institutionType ?? "",
        institutionName: edu.institutionName ?? "",
        grade: edu.grade ?? "",
        startDate: edu.startDate
          ? dayjs(edu.startDate, "YYYY-MM-DD")
          : todayJalali(),
        endDate: edu.endDate ? dayjs(edu.endDate, "YYYY-MM-DD") : null,
        isStudying: edu.isStudying,
        description: edu.description ?? "",
      })),
    );

    if (educationFormInStore) {
      reset({
        degree: educationFormInStore.degree,
        field: educationFormInStore.field ?? "",
        specialization: educationFormInStore.specialization ?? "",
        institutionType: educationFormInStore.institutionType ?? "",
        institutionName: educationFormInStore.institutionName ?? "",
        grade: educationFormInStore.grade ?? "",
        startDate: educationFormInStore.startDate
          ? dayjs(educationFormInStore.startDate, "YYYY-MM-DD")
          : todayJalali(),
        endDate: educationFormInStore.endDate
          ? dayjs(educationFormInStore.endDate, "YYYY-MM-DD")
          : null,
        isStudying: educationFormInStore.isStudying,
        description: educationFormInStore.description ?? "",
      });
    }
  }, [educationListInStore, educationFormInStore, reset]);

  const onValid = (data: EducationFormDataLocal): void => {
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
          degree: item.degree,
          field: item.field || "",
          specialization: item.specialization || "",
          institutionType: item.institutionType || "",
          institutionName: item.institutionName || "",
          grade: item.grade || "",
          startDate: item.startDate
            ? item.startDate.format("YYYY-MM-DD")
            : todayJalali().format("YYYY-MM-DD"),
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
          isStudying: item.isStudying,
          description: item.description || "",
        })),
      ),
    );

    dispatch(saveEducationForm(null));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const onInvalid = (errors: FieldErrors<EducationFormDataLocal>) => {
    // گرفتن پیام اولین خطا
    const firstError = Object.values(errors)[0];
    if (firstError && "message" in firstError) {
      toast.error(firstError.message as string);
    } else {
      toast.error("اطلاعات نامعتبر است");
    }
  };

  const handleDelete = (index: number) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    dispatch(
      saveEducationList(
        updatedList.map((item) => ({
          degree: item.degree,
          field: item.field || "",
          specialization: item.specialization || "",
          institutionType: item.institutionType || "",
          institutionName: item.institutionName || "",
          grade: item.grade || "",
          startDate: item.startDate
            ? item.startDate.format("YYYY-MM-DD")
            : todayJalali().format("YYYY-MM-DD"),
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
          isStudying: item.isStudying,
          description: item.description || "",
        })),
      ),
    );
    toast.success("سابقه تحصیلی حذف شد");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق تحصیلی</h1>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          label="مقطع"
          {...register("degree", { required: "مقطع الزامی است" })}
        />

        <Input label="رشته" {...register("field")} />
        <Input label="گرایش" {...register("specialization")} />
        <Input label="نوع موسسه" {...register("institutionType")} />
        <Input label="نام موسسه" {...register("institutionName")} />
        <Input label="معدل" {...register("grade")} />
        <JalaliDateInput
          label="تاریخ شروع"
          value={startDate}
          onChange={(v) => setValue("startDate", v!)}
        />
        {errors.startDate && (
          <p className="text-red-600 text-sm">{errors.startDate.message}</p>
        )}
        <JalaliDateInput
          label="تاریخ پایان"
          value={endDate}
          onChange={(v) => setValue("endDate", v)}
          disabled={isStudying}
        />
        {errors.endDate && (
          <p className="text-red-600 text-sm">{errors.endDate.message}</p>
        )}
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

      {/* لیست سوابق */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">لیست سوابق</h2>
        {educationList.map((item, index) => (
          <div
            key={index}
            className="border rounded p-2 mb-2 flex justify-between items-center"
          >
            <div>
              <div>
                {item.degree} - {item.field}
              </div>
              <div>
                {item.startDate?.format("YYYY-MM-DD")} تا{" "}
                {item.isStudying
                  ? "در حال تحصیل"
                  : item.endDate?.format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingIndex(index);
                  reset(item);
                  dispatch(
                    saveEducationForm({
                      ...item,
                      startDate: item.startDate
                        ? item.startDate.format("YYYY-MM-DD")
                        : "",
                      endDate: item.endDate
                        ? item.endDate.format("YYYY-MM-DD")
                        : "",
                    }),
                  );
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
