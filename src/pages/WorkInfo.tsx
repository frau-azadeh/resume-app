import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui";
import WorkForm from "../components/work/WorkForm";
import { supabase } from "../lib/supabase";
import { setWorkList } from "../store/slices/workSlice";
import type { WorkFormData } from "../store/slices/workSlice";
import type { AppDispatch } from "../store/store";
import type { WorkFormDataType } from "../validation/workSchema";

const defaultFormValues: WorkFormDataType = {
  company_name: "",
  position: "",
  field: "",
  level: "",
  cooperation_type: "",
  insurance_months: "",
  start_date: new DateObject({ calendar: persian }),
  end_date: null,
  is_working: false,
  work_phone: "",
  last_salary: "",
  termination_reason: "",
  description: "",
};

const toGregorianDateString = (date: DateObject): string => {
  const g = date.convert(gregorian);
  return `${g.year}-${String(g.month).padStart(2, "0")}-${String(g.day).padStart(2, "0")}`;
};

const WorkInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [formInitialData, setFormInitialData] =
    useState<WorkFormDataType>(defaultFormValues);
  const [workId, setWorkId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [workListState, setWorkListState] = useState<
    (WorkFormData & { id: number })[]
  >([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        toast.error("کاربر یافت نشد");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("work_infos")
        .select("*")
        .eq("user_id", user.id)
        .order("start_date", { ascending: false });

      if (error) {
        toast.error("خطا در دریافت اطلاعات تحصیلی");
      } else {
        setWorkListState(data);
        dispatch(setWorkList(data));
      }
      setLoading(false);
    };

    fetchData();
  }, [user, dispatch]);

  const handleSubmit = async (data: WorkFormDataType) => {
    if (!user?.id) return toast.error("کاربر یافت نشد");

    const record: WorkFormData = {
      ...data,
      user_id: user.id,
      start_date: toGregorianDateString(data.start_date),
      end_date: data.is_working
        ? ""
        : data.end_date
          ? toGregorianDateString(data.end_date)
          : "",
    };

    if (workId) {
      const { error } = await supabase
        .from("work_infos")
        .update(record)
        .eq("id", workId);
      if (error) return toast.error("خطا در ویرایش");

      const workList = workListState.map((item) =>
        item.id === workId ? { ...record, id: workId } : item,
      );
      setWorkListState(workList);
      dispatch(setWorkList(workList));
      toast.success("ویرایش انجام شد");
    } else {
      const { data: newRecord, error } = await supabase
        .from("work_infos")
        .insert(record)
        .select()
        .single();

      if (error || !newRecord) return toast.error("خطا در ثبت");

      const updatedList = [...workListState, newRecord];
      setWorkListState(updatedList);
      dispatch(setWorkList(updatedList));
      toast.success("ثبت انجام شد");
    }

    setWorkId(null);
    setFormInitialData(defaultFormValues);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("work_infos").delete().eq("id", id);
    if (error) {
      toast.error("خطا در حذف");
      return;
    }
    const updatedList = workListState.filter((item) => item.id !== id);
    setWorkListState(updatedList);
    dispatch(setWorkList(updatedList));
    toast.success("حذف شد");
  };

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow" dir="rtl">
      <h1 className="text-xl font-bold mb-4 text-center">سوابق تحصیلی</h1>

      <WorkForm
        initialData={formInitialData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormInitialData(defaultFormValues);
          setWorkId(null);
        }}
        isEditing={!!workId}
      />

      <h2 className="text-lg font-semibold mt-6 mb-2">لیست سوابق</h2>
      {workListState.map((wo) => {
        const start = new DateObject({
          date: wo.start_date,
          calendar: gregorian,
        })
          .convert(persian)
          .format("YYYY/MM/DD");
        const end = wo.end_date
          ? new DateObject({ date: wo.end_date, calendar: gregorian })
              .convert(persian)
              .format("YYYY/MM/DD")
          : "ادامه دارد";

        return (
          <div
            key={wo.id}
            className="border p-4 rounded-md mb-3 flex justify-between items-center border-gray-200 shadow-md"
          >
            <div>
              <p className="font-medium">
                {wo.company_name} - {wo.position || ""}
              </p>
              <p className="text-sm text-gray-600">
                {start} تا {end}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setFormInitialData({
                    company_name: wo.company_name || "",
                    position: wo.position || "",
                    field: wo.field || "",
                    level: wo.level || "",
                    cooperation_type: wo.cooperation_type || "",
                    insurance_months: wo.insurance_months?.toString() || "",

                    description: wo.description || "",
                    work_phone: wo.work_phone || "",
                    last_salary: wo.last_salary || "",
                    termination_reason: wo.termination_reason || "",
                    is_working: wo.is_working,
                    start_date: new DateObject({
                      date: wo.start_date,
                      calendar: gregorian,
                    }).convert(persian),
                    end_date: wo.end_date
                      ? new DateObject({
                          date: wo.end_date,
                          calendar: gregorian,
                        }).convert(persian)
                      : null,
                  });
                  setWorkId(wo.id);
                }}
              >
                ویرایش
              </Button>
              <Button onClick={() => handleDelete(wo.id)} variant="destructive">
                حذف
              </Button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => navigate("/form/work-experience")}
          variant="outline"
        >
          قبلی
        </Button>
        <Button onClick={() => navigate("/form/skill")}>بعدی</Button>
      </div>
    </div>
  );
};

export default WorkInfo;
