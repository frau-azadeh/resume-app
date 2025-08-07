import { supabase } from "./supabase";
import type { PersonalInfoForm } from "../types/types";

export const submitApplication = async (
  userId: string,
  personalInfo: PersonalInfoForm,
): Promise<{ success: boolean; message: string }> => {
  const { data: existing, error: fetchError } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId);

  if (fetchError) {
    return { success: false, message: "خطا در بررسی اطلاعات قبلی" };
  }

  if (existing && existing.length > 0) {
    return { success: false, message: "شما قبلاً ثبت‌نام کرده‌اید" };
  }

  const { error: insertError } = await supabase.from("applications").insert({
    user_id: userId,
    personal_info: personalInfo,
    status: "pending",
  });

  if (insertError) {
    return { success: false, message: "خطا در ثبت درخواست" };
  }

  return { success: true, message: "اطلاعات با موفقیت ثبت شد" };
};
