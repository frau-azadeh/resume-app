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
      });
    }
  }, [workListInStore, workFormInStore, reset]);

  const formatForStore = (item: WorkFormData) => ({
    ...item,
    startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
    endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
    field: item.field ?? "",
    level: item.level ?? "",
    cooperationType: item.cooperationType ?? "",
    insuranceMonths: item.insuranceMonths ?? "",
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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق کاری</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <Input label="نام شرکت" {...register("companyName")} />
          <p className="text-red-600 text-xs mt-1 min-h-[1.25rem]">
            {errors.companyName?.message}
          </p>
        </div>

        <div>
          <Input label="عنوان شغلی" {...register("position")} />
          <p className="text-red-600 text-xs mt-1 min-h-[1.25rem]">
            {errors.position?.message}
          </p>
        </div>

        <div>
          <Input label="زمینه فعالیت شرکت" {...register("field")} />
          <p className="min-h-[1.25rem]"></p>
        </div>

        <div>
          <Input label="رده سازمانی" {...register("level")} />
          <p className="min-h-[1.25rem]"></p>
        </div>

        <div>
          <Input label="نوع همکاری" {...register("cooperationType")} />
          <p className="min-h-[1.25rem]"></p>
        </div>

        <div>
          <Input
            label="سابقه بیمه (ماه)"
            type="number"
            {...register("insuranceMonths")}
          />
          <p className="text-red-600 text-xs mt-1 min-h-[1.25rem]">
            {errors.insuranceMonths?.message}
          </p>
        </div>

        <div>
          <JalaliDateInput
            label="تاریخ شروع"
            value={startDate}
            onChange={(v) => setValue("startDate", v)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <p className="text-red-600 text-xs mt-1 min-h-[1.25rem]">
            {errors.startDate?.message}
          </p>
        </div>

        <div>
          <JalaliDateInput
            label="تاریخ پایان"
            value={endDate}
            onChange={(v) => setValue("endDate", v)}
            disabled={isWorking}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <p className="text-red-600 text-xs mt-1 min-h-[1.25rem]">
            {errors.endDate?.message}
          </p>
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" {...register("isWorking")} id="isWorking" />
          <label
            htmlFor="isWorking"
            className="text-sm font-medium text-gray-700"
          >
            شاغل هستم
          </label>
        </div>

        <div>
          <Input label="تلفن محل کار" {...register("workPhone")} />
          <p className="min-h-[1.25rem]"></p>
        </div>

        <div>
          <Input
            label="آخرین حقوق دریافتی (تومان)"
            {...register("lastSalary")}
          />
          <p className="min-h-[1.25rem]"></p>
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            توضیحات
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-right text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[6rem]"
            placeholder="توضیحات درباره شرح وظایف در محل کار قبلی"
          />
          <p className="text-red-600 text-sm mt-1 min-h-[1.25rem]">
            {errors.description?.message}
          </p>
        </div>

        <div className="md:col-span-2 text-center">
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
