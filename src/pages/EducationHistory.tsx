import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { AppDispatch } from "../store/store";
import { setEducationList } from "../store/slices/educationSlice";
import type { EducationFormData } from "../store/slices/educationSlice";
import type { EducationFormDataLocal } from "../validation/educationSchema";
import EducationForm from "../components/education/EducationForm";
import { Button } from "../components/ui";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

const defaultFormValues: EducationFormDataLocal = {
  degree: "",
  field: "",
  specialization: "",
  institution_type: "",
  institution_name: "",
  grade: "",
  start_date: new DateObject({ calendar: persian }),
  end_date: null,
  is_studying: false,
  description: "",
};

const toGregorianDateString = (date: DateObject): string => {
  const g = date.convert(gregorian);
  return `${g.year}-${String(g.month).padStart(2, "0")}-${String(g.day).padStart(2, "0")}`;
};

const EducationHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [formInitialData, setFormInitialData] =
    useState<EducationFormDataLocal>(defaultFormValues);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [educationListState, setEducationListState] = useState<
    (EducationFormData & { id: number })[]
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
        .from("educations")
        .select("*")
        .eq("user_id", user.id)
        .order("start_date", { ascending: false });

      if (error) {
        toast.error("خطا در دریافت اطلاعات تحصیلی");
      } else {
        setEducationListState(data);
        dispatch(setEducationList(data));
      }
      setLoading(false);
    };

    fetchData();
  }, [user, dispatch]);

  const handleSubmit = async (data: EducationFormDataLocal) => {
    if (!user?.id) return toast.error("کاربر یافت نشد");

    const record: EducationFormData = {
      ...data,
      user_id: user.id,
      start_date: toGregorianDateString(data.start_date),
      end_date: data.end_date
        ? toGregorianDateString(data.end_date)
        : undefined,
    };

    if (editingId) {
      const { error } = await supabase
        .from("educations")
        .update(record)
        .eq("id", editingId);
      if (error) return toast.error("خطا در ویرایش");

      const updatedList = educationListState.map((item) =>
        item.id === editingId ? { ...record, id: editingId } : item,
      );
      setEducationListState(updatedList);
      dispatch(setEducationList(updatedList));
      toast.success("ویرایش انجام شد");
    } else {
      const { data: newRecord, error } = await supabase
        .from("educations")
        .insert(record)
        .select()
        .single();

      if (error || !newRecord) return toast.error("خطا در ثبت");

      const updatedList = [...educationListState, newRecord];
      setEducationListState(updatedList);
      dispatch(setEducationList(updatedList));
      toast.success("ثبت انجام شد");
    }

    setEditingId(null);
    setFormInitialData(defaultFormValues);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("educations").delete().eq("id", id);
    if (error) {
      toast.error("خطا در حذف");
      return;
    }
    const updatedList = educationListState.filter((item) => item.id !== id);
    setEducationListState(updatedList);
    dispatch(setEducationList(updatedList));
    toast.success("حذف شد");
  };

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow" dir="rtl">
      <h1 className="text-xl font-bold mb-4 text-center">سوابق تحصیلی</h1>

      <EducationForm
        initialData={formInitialData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormInitialData(defaultFormValues);
          setEditingId(null);
        }}
        isEditing={!!editingId}
      />

      <h2 className="text-lg font-semibold mt-6 mb-2">لیست سوابق</h2>
      {educationListState.map((edu) => {
        const start = new DateObject({
          date: edu.start_date,
          calendar: gregorian,
        })
          .convert(persian)
          .format("YYYY/MM/DD");
        const end = edu.end_date
          ? new DateObject({ date: edu.end_date, calendar: gregorian })
              .convert(persian)
              .format("YYYY/MM/DD")
          : "ادامه دارد";

        return (
          <div
            key={edu.id}
            className="border p-4 rounded mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {edu.degree} - {edu.field || ""}
              </p>
              <p className="text-sm text-gray-600">
                {start} تا {end}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setFormInitialData({
                    degree: edu.degree || "",
                    field: edu.field || "",
                    specialization: edu.specialization || "",
                    institution_type: edu.institution_type || "",
                    institution_name: edu.institution_name || "",
                    grade: edu.grade || "",
                    description: edu.description || "",
                    is_studying: edu.is_studying,
                    start_date: new DateObject({
                      date: edu.start_date,
                      calendar: gregorian,
                    }).convert(persian),
                    end_date: edu.end_date
                      ? new DateObject({
                          date: edu.end_date,
                          calendar: gregorian,
                        }).convert(persian)
                      : null,
                  });
                  setEditingId(edu.id);
                }}
              >
                ویرایش
              </Button>
              <Button
                onClick={() => handleDelete(edu.id)}
                variant="destructive"
              >
                حذف
              </Button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mt-6">
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
