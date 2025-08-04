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
  company_name: string;
  position: string;
  field?: string;
  level?: string;
  cooperation_type?: string;
  insurance_months?: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  is_working: boolean;
  work_phone?: string;
  last_salary?: string;
  termination_reason?: string;
  description?: string;
}

const defaultFormValues: WorkFormData = {
  company_name: "",
  position: "",
  field: "",
  level: "",
  cooperation_type: "",
  insurance_months: "",
  start_date: todayJalali(),
  end_date: todayJalali(),
  is_working: false,
  work_phone: "",
  last_salary: "",
  termination_reason: "",
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

  const { register, handleSubmit, reset, setValue, watch, getValues } =
    useForm<WorkFormData>({
      resolver: zodResolver(workSchema),
      defaultValues: defaultFormValues,
    });

  const [workList, setWorkList] = useState<WorkFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const is_working = watch("is_working");
  const start_date = watch("start_date");
  const end_date = watch("end_date");

  useEffect(() => {
    setWorkList(
      (workListInStore || []).map((item) => ({
        ...item,
        start_date: item.start_date ? dayjs(item.start_date) : null,
        end_date: item.end_date ? dayjs(item.end_date) : null,
      })),
    );

    if (workFormInStore) {
      reset({
        ...defaultFormValues,
        ...workFormInStore,
        start_date: workFormInStore.start_date
          ? dayjs(workFormInStore.start_date)
          : todayJalali(),
        end_date: workFormInStore.end_date
          ? dayjs(workFormInStore.end_date)
          : todayJalali(),
      });
    }
  }, [workListInStore, workFormInStore, reset]);

  const formatForStore = (item: WorkFormData) => ({
    ...item,
    start_date: item.start_date ? item.start_date.format("YYYY-MM-DD") : "",
    end_date: item.end_date ? item.end_date.format("YYYY-MM-DD") : "",
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
        <Input label="نام شرکت" {...register("company_name")} />
        <Input label="عنوان شغلی" {...register("position")} />
        <Input label="زمینه فعالیت شرکت" {...register("field")} />
        <Input label="رده سازمانی" {...register("level")} />
        <Input label="نوع همکاری" {...register("cooperation_type")} />
        <Input
          label="سابقه بیمه (ماه)"
          type="number"
          {...register("insurance_months")}
        />

        <JalaliDateInput
          label="تاریخ شروع"
          value={start_date}
          onChange={(v) => setValue("start_date", v)}
        />

        <JalaliDateInput
          label="تاریخ پایان"
          value={end_date}
          onChange={(v) => setValue("end_date", v)}
          disabled={is_working}
        />

        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" {...register("is_working")} id="is_working" />
          <label htmlFor="is_working">شاغل هستم</label>
        </div>

        <Input label="تلفن محل کار" {...register("work_phone")} />
        <Input
          label="آخرین حقوق دریافتی (تومان)"
          {...register("last_salary")}
        />
        <Input label="علت ترک کار" {...register("termination_reason")} />

        <div className="md:col-span-2">
          <label htmlFor="description">توضیحات</label>
          <textarea
            {...register("description")}
            id="description"
            rows={4}
            className="w-full border p-2 rounded"
          />
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
