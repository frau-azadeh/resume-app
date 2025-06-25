import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import JalaliDateInput from "../components/ui/JalaliDatePicker";
import { todayJalali } from "../utils/date";
import dayjs, { Dayjs } from "dayjs";
import type { RootState, AppDispatch } from "../store/store";
import {
  setworkList as saveWorkList,
  setworkForm as saveWorkForm,
} from "../store/slices/workSlice";

interface WorkFormData {
  companyName: string;
  position: string;
  field: string;
  level: string;
  cooperationType: string;
  insuranceMonths: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isWorking: boolean;
  workPhone: string;
  lastSalary: string;
  terminationReason: string;
  description: string;
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

  const workListInStore = useSelector((state: RootState) => state.work.workList);
  const workFormInStore = useSelector((state: RootState) => state.work.workForm);

  const { register, handleSubmit, reset, setValue, watch, getValues } = useForm<WorkFormData>({
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
      }))
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

  const onSubmit = (data: WorkFormData) => {
    const updatedList = [...workList];

    if (editingIndex !== null) {
      updatedList[editingIndex] = data;
      toast.success("سابقه کاری ویرایش شد");
    } else {
      updatedList.push(data);
      toast.success("سابقه کاری ثبت شد");
    }

    setWorkList(updatedList);
    dispatch(
      saveWorkList(
        updatedList.map((item) => ({
          ...item,
          startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
        }))
      )
    );
    dispatch(saveWorkForm({}));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    const item = workList[index];
    setEditingIndex(index);
    reset(item);
    dispatch(
      saveWorkForm({
        ...item,
        startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
        endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
      })
    );
  };

  const handleDelete = (index: number) => {
    const updated = workList.filter((_, i) => i !== index);
    setWorkList(updated);
    dispatch(
      saveWorkList(
        updated.map((item) => ({
          ...item,
          startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
        }))
      )
    );
    toast.info("سابقه کاری حذف شد");
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultFormValues);
    }
  };

  const handleNavigation = (direction: "next" | "prev") => {
    const currentFormData = getValues();
    dispatch(
      saveWorkList(
        workList.map((item) => ({
          ...item,
          startDate: item.startDate ? item.startDate.format("YYYY-MM-DD") : "",
          endDate: item.endDate ? item.endDate.format("YYYY-MM-DD") : "",
        }))
      )
    );
    dispatch(
      saveWorkForm({
        ...currentFormData,
        startDate: currentFormData.startDate
          ? currentFormData.startDate.format("YYYY-MM-DD")
          : "",
        endDate: currentFormData.endDate
          ? currentFormData.endDate.format("YYYY-MM-DD")
          : "",
      })
    );

    if (direction === "next") {
      navigate("/form/skill");
    } else {
      navigate("/form/education");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق کاری</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="نام شرکت" {...register("companyName")} />
        <Input label="عنوان شغلی" {...register("position")} />
        <Input label="زمینه فعالیت شرکت" {...register("field")} />
        <Input label="رده سازمانی" {...register("level")} />
        <Input label="نوع همکاری" {...register("cooperationType")} />
        <Input label="سابقه بیمه (ماه)" type="number" {...register("insuranceMonths")} />

        <JalaliDateInput
          label="تاریخ شروع"
          value={startDate}
          onChange={(v) => setValue("startDate", v)}
        />
        <JalaliDateInput
          label="تاریخ پایان"
          value={endDate}
          onChange={(v) => setValue("endDate", v)}
          disabled={isWorking}
        />

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

      <div className="mt-8 space-y-4">
        {workList.map((item, index) => (
          <div key={index} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {item.companyName} - {item.position}
              </p>
              <p className="text-sm text-gray-500">
                {item.startDate?.format("YYYY-MM-DD")} تا{" "}
                {item.isWorking ? "شاغل" : item.endDate?.format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(index)} type="button">
                ویرایش
              </Button>
              <Button onClick={() => handleDelete(index)} type="button" variant="destructive">
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

export default WorkInfo;
