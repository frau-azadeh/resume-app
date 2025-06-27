import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import JalaliDateInput from "../components/ui/JalaliDatePicker";
import WorkList from "../components/work/WorkList";
import { todayJalali } from "../utils/date";
import type { RootState, AppDispatch } from "../store/store";
import {
  setworkList as saveWorkList,
  setworkForm as saveWorkForm,
} from "../store/slices/workSlice";
import { workSchema } from "../validation/workSchema";

export interface WorkFormData {
  companyName: string;
  position: string;
  field?: string;
  level?: string;
  cooperationType?: string;
  insuranceMonths?: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isWorking: boolean;
  workPhone?: string;
  lastSalary?: string;
  terminationReason?: string;
  description?: string;
}

const defaultFormValues: WorkFormData = {
  companyName: "",
  position: "",
  field: "",
  level: "",
  cooperationType: "",
  insuranceMonths: "",
  startDate: todayJalali(),
  endDate: todayJalali(),
  isWorking: false,
  workPhone: "",
  lastSalary: "",
  terminationReason: "",
  description: "",
};

const WorkInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const workListInStore = useSelector(
    (state: RootState) => state.work.workList,
  );
  const workFormInStore = useSelector(
    (state: RootState) => state.work.workForm,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    defaultValues: defaultFormValues,
  });

  const [workList, setWorkList] = useState<WorkFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isWorking = watch("isWorking");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // تبدیل داده‌های ذخیره شده به فرمت درست با dayjs
  useEffect(() => {
    setWorkList(
      (workListInStore || []).map((item) => ({
        ...item,
        startDate: item.startDate ? dayjs(item.startDate, "YYYY-MM-DD") : null,
        endDate: item.endDate ? dayjs(item.endDate, "YYYY-MM-DD") : null,
        field: item.field ?? "",
        level: item.level ?? "",
        cooperationType: item.cooperationType ?? "",
        insuranceMonths: item.insuranceMonths ?? "",
        workPhone: item.workPhone ?? "",
        lastSalary: item.lastSalary ?? "",
        terminationReason: item.terminationReason ?? "",
        description: item.description ?? "",
      })),
    );

    if (workFormInStore) {
      reset({
        ...defaultFormValues,
        ...workFormInStore,
        startDate: workFormInStore.startDate
          ? dayjs(workFormInStore.startDate, "YYYY-MM-DD")
          : todayJalali(),
        endDate: workFormInStore.endDate
          ? dayjs(workFormInStore.endDate, "YYYY-MM-DD")
          : todayJalali(),
        field: workFormInStore.field ?? "",
        level: workFormInStore.level ?? "",
        cooperationType: workFormInStore.cooperationType ?? "",
        insuranceMonths: workFormInStore.insuranceMonths ?? "",
        workPhone: workFormInStore.workPhone ?? "",
        lastSalary: workFormInStore.lastSalary ?? "",
        terminationReason: workFormInStore.terminationReason ?? "",
        description: workFormInStore.description ?? "",
      });
    }
  }, [workListInStore, workFormInStore, reset]);

  const formatForStore = (item: WorkFormData) => ({
    ...item,
    field: item.field ?? "",
    level: item.level ?? "",
    cooperationType: item.cooperationType ?? "",
    insuranceMonths: item.insuranceMonths ?? "",
    startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
    endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
    workPhone: item.workPhone ?? "",
    lastSalary: item.lastSalary ?? "",
    terminationReason: item.terminationReason ?? "",
    description: item.description ?? "",
  });

  const onSubmit: SubmitHandler<WorkFormData> = (data) => {
    const updatedList = [...workList];
    if (editingIndex !== null) {
      updatedList[editingIndex] = data;
      toast.success("سابقه کاری ویرایش شد");
    } else {
      updatedList.push(data);
      toast.success("سابقه کاری ثبت شد");
    }
    setWorkList(updatedList);
    dispatch(saveWorkList(updatedList.map(formatForStore)));
    dispatch(saveWorkForm({}));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    const item = workList[index];
    setEditingIndex(index);
    reset(item);
    dispatch(saveWorkForm(formatForStore(item)));
  };

  const handleDelete = (index: number) => {
    const updated = workList.filter((_, i) => i !== index);
    setWorkList(updated);
    dispatch(saveWorkList(updated.map(formatForStore)));
    toast.info("سابقه کاری حذف شد");
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultFormValues);
    }
  };

  const handleNavigation = (direction: "next" | "prev") => {
    const currentFormData = getValues();
    dispatch(saveWorkList(workList.map(formatForStore)));
    dispatch(saveWorkForm(formatForStore(currentFormData)));

    if (direction === "next") navigate("/form/skill");
    else navigate("/form/education");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق کاری</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input label="نام شرکت" {...register("companyName")} />
        {errors.companyName && (
          <p className="text-red-600 text-sm">{errors.companyName.message}</p>
        )}

        <Input label="عنوان شغلی" {...register("position")} />
        {errors.position && (
          <p className="text-red-600 text-sm">{errors.position.message}</p>
        )}

        <Input label="زمینه فعالیت شرکت" {...register("field")} />
        <Input label="رده سازمانی" {...register("level")} />
        <Input label="نوع همکاری" {...register("cooperationType")} />
        <Input
          label="سابقه بیمه (ماه)"
          type="number"
          {...register("insuranceMonths")}
        />
        {errors.insuranceMonths && (
          <p className="text-red-600 text-sm">
            {errors.insuranceMonths.message}
          </p>
        )}

        <JalaliDateInput
          label="تاریخ شروع"
          value={startDate}
          onChange={(v) => setValue("startDate", v)}
        />
        {errors.startDate && (
          <p className="text-red-600 text-sm">{errors.startDate.message}</p>
        )}

        <JalaliDateInput
          label="تاریخ پایان"
          value={endDate}
          onChange={(v) => setValue("endDate", v)}
          disabled={isWorking}
        />
        {errors.endDate && (
          <p className="text-red-600 text-sm">{errors.endDate.message}</p>
        )}

        <div className="col-span-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isWorking")} />
            شاغل هستم
          </label>
        </div>

        <Input label="تلفن محل کار" {...register("workPhone")} />
        <Input label="آخرین حقوق دریافتی (تومان)" {...register("lastSalary")} />
        <Input label="علت خاتمه کار" {...register("terminationReason")} />
        <div className="col-span-2">
          <Input label="توضیحات" {...register("description")} />
        </div>

        <div className="col-span-2 text-center">
          <Button type="submit">
            {editingIndex !== null ? "ویرایش سابقه" : "ثبت سابقه"}
          </Button>
        </div>
      </form>

      <WorkList
        workList={workList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex justify-between mt-8">
        <Button onClick={() => handleNavigation("prev")} variant="outline">
          قبلی
        </Button>
        <Button onClick={() => handleNavigation("next")}>بعدی</Button>
      </div>
    </div>
  );
};

export default WorkInfo;
