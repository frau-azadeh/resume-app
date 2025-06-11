import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setActiveTab } from "../store/slices/tabSlice";
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
  startDate: string;
  endDate: string;
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
  startDate: "",
  endDate: "",
  isWorking: false,
  workPhone: "",
  lastSalary: "",
  terminationReason: "",
  description: "",
};

const tabsOrder = ["personal-info", "education", "work-experience", "skills"];

const WorkInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const workListInStore = useSelector(
    (state: RootState) => state.work.workList,
  );
  const workFormInStore = useSelector(
    (state: RootState) => state.work.workForm,
  );
  const activeTab = useSelector((state: RootState) => state.tab.activeTab);

  const { register, handleSubmit, reset, setValue, watch, getValues } =
    useForm<WorkFormData>({
      defaultValues: defaultFormValues,
    });

  const [workList, setWorkList] = useState<WorkFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isWorking = watch("isWorking");

  useEffect(() => {
    setWorkList(workListInStore || []);
    reset({ ...defaultFormValues, ...workFormInStore });
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
    dispatch(saveWorkList(updatedList));
    dispatch(saveWorkForm({}));
    setEditingIndex(null);
    reset(defaultFormValues);
  };

  const handleEdit = (index: number) => {
    const item = workList[index];
    Object.entries(item).forEach(([key, value]) => {
      setValue(key as keyof WorkFormData, value);
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = workList.filter((_, i) => i !== index);
    setWorkList(updated);
    dispatch(saveWorkList(updated));
    toast.info("سابقه کاری حذف شد");
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultFormValues);
    }
  };

  const handleNavigation = (direction: "next" | "prev") => {
    const currentFormData = getValues();
    dispatch(saveWorkList(workList));
    dispatch(saveWorkForm(currentFormData));

    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    if (direction === "next" && currentIndex < tabsOrder.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    dispatch(setActiveTab(tabsOrder[newIndex]));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-center">سوابق کاری</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input label="نام شرکت" {...register("companyName")} />
        <Input label="عنوان شغلی" {...register("position")} />
        <Input label="زمینه فعالیت شرکت" {...register("field")} />
        <Input label="رده سازمانی" {...register("level")} />
        <Input label="نوع همکاری" {...register("cooperationType")} />
        <Input
          label="سابقه بیمه (ماه)"
          type="number"
          {...register("insuranceMonths")}
        />
        <Input label="تاریخ شروع" type="date" {...register("startDate")} />
        <Input
          label="تاریخ پایان"
          type="date"
          {...register("endDate")}
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
          <div
            key={index}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {item.companyName} - {item.position}
              </p>
              <p className="text-sm text-gray-500">{item.cooperationType}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(index)} type="button">
                ویرایش
              </Button>
              <Button
                onClick={() => handleDelete(index)}
                type="button"
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

export default WorkInfo;
