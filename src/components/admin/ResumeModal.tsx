// ResumeModal.tsx
import { Dialog } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { generatePDF } from "./PDFReact";
import type {
  PersonalInfoForm,
  EducationFormDataLocal,
  SkillFormData,
  WorkFormDataType,
} from "../../types/types";

interface ResumeModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ResumeData {
  personal: PersonalInfoForm | null;
  education: EducationFormDataLocal[];
  experience: WorkFormDataType[];
  skill: SkillFormData[];
}

const convertDateObjectToString = (date?: DateObject | null): string | null => {
  if (!date) return null;
  const { year, month, day } = date;
  const jsDate = new Date(year, month - 1, day);
  return jsDate.toISOString();
};

const formatDate = (inputDate: string | null | undefined): string => {
  if (!inputDate) return "-";
  const date = new Date(inputDate);
  return isNaN(date.getTime()) ? "-" : new Intl.DateTimeFormat("fa-IR").format(date);
};

const ResumeModal = ({ userId, isOpen, onClose }: ResumeModalProps) => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    const [personalRes, eduRes, expRes, skillRes] = await Promise.all([
      supabase.from("personal_infos").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("education").select("*").eq("user_id", userId),
      supabase.from("work_infos").select("*").eq("user_id", userId),
      supabase.from("skill").select("*").eq("user_id", userId),
    ]);

    setData({
      personal: personalRes.data ?? null,
      education: eduRes.data ?? [],
      experience: expRes.data ?? [],
      skill: skillRes.data ?? [],
    });

    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if (resumeRef.current) {
      generatePDF(resumeRef.current, `resume-${userId}.pdf`);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 px-4">
        <Dialog.Panel className="bg-white w-full max-w-4xl rounded-lg p-6 text-right">
          <Dialog.Title className="text-lg font-bold mb-4">جزئیات رزومه</Dialog.Title>
          {loading || !data ? (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          ) : (
            <>
              <div ref={resumeRef} className="space-y-6 text-sm" dir="rtl">
                {data.personal && (
                  <section>
                    <h3 className="font-bold mb-2">اطلاعات فردی</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>نام: {data.personal.first_name} {data.personal.last_name}</li>
                      <li>کد ملی: {data.personal.national_code}</li>
                      <li>تاریخ تولد: {formatDate(convertDateObjectToString(data.personal.birth_date))}</li>
                      <li>تلفن: {data.personal.phone}</li>
                      <li>ایمیل: {data.personal.email}</li>
                      <li>
                        آدرس: {data.personal.residence_province}، {data.personal.residence_city} - {data.personal.address ?? "-"}
                      </li>
                    </ul>
                  </section>
                )}

                {data.education.length > 0 && (
                  <section>
                    <h3 className="font-bold mb-2">سوابق تحصیلی</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {data.education.map((edu, idx) => (
                        <li key={idx}>
                          {edu.degree} در {edu.field} (
                          {formatDate(convertDateObjectToString(edu.start_date))} تا {edu.is_studying ? "در حال تحصیل" : formatDate(convertDateObjectToString(edu.end_date))})
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {data.experience.length > 0 && (
                  <section>
                    <h3 className="font-bold mb-2">سوابق کاری</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {data.experience.map((exp, idx) => (
                        <li key={idx}>
                          {exp.position} در {exp.company_name} (
                          {formatDate(convertDateObjectToString(exp.start_date))} تا {exp.is_working ? "مشغول به کار" : formatDate(convertDateObjectToString(exp.end_date))})
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {data.skill.length > 0 && (
                  <section>
                    <h3 className="font-bold mb-2">مهارت‌ها</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {data.skill.map((s, idx) => (
                        <li key={idx}>{s.skill_name} - سطح {s.skill_level}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="mt-6 flex justify-between gap-2 flex-col sm:flex-row">
                <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">بستن</button>
                <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">دانلود PDF</button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResumeModal;
