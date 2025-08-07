
// ✅ فایل: src/pages/summary.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import { useAppSelector } from "../store/hooks";
import { submitApplication } from "../lib/submitApplication";
import type { PersonalInfoForm } from "../types/types";

export default function Summary() {
  const [userId, setUserId] = useState<string | null>(null);
  const personalInfo = useAppSelector((state) => state.personalInfo.personalInfo);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user?.id) {
        toast.error("کاربر یافت نشد");
        return;
      }
      setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const saveApplication = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        toast.error("خطا در بررسی رزومه");
        return;
      }

      if (!data) {
        try {
          await submitApplication(userId, personalInfo as PersonalInfoForm);
          toast.success("رزومه با موفقیت ذخیره شد");
        } catch (err: unknown) {
          if (err instanceof Error) toast.error(err.message);
        }
      }
    };
    saveApplication();
  }, [userId, personalInfo]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <div className="flex flex-col min-h-screen">
        <h1>اطلاعات شما با موفقیت در بانک استخدامی ما ثبت گردید.</h1>
      </div>
    </div>
  );
}
