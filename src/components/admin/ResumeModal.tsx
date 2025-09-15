// src/components/admin/ResumeModal.tsx
import { useEffect, useRef, useState } from "react";

import type DateObject from "react-date-object";

import { supabase } from "../../lib/supabase";
import { printNode } from "../../utils/printNode";
import SimpleModal from "../ui/SimpleModal";

interface ResumeModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

/** تاریخ‌هایی که ممکن است از DB برگردند */
type DbDate =
  | string
  | { year: number; month: number; day: number }
  | DateObject
  | null
  | undefined;

/** انواع ردیف‌های DB (بدون any) */
type PersonalRow = {
  user_id: string;
  first_name: string;
  last_name: string;
  national_code: string;
  birth_date?: DbDate;
  residence_province: string;
  residence_city: string;
  address: string | null;
  phone: string;
  email: string;
};

type EducationRow = {
  user_id: string;
  degree: string;
  field: string;
  start_date: DbDate;
  end_date: DbDate;
  is_studying: boolean;
};

type WorkRow = {
  user_id: string;
  company_name: string;
  position: string;
  start_date: DbDate;
  end_date: DbDate;
  is_working: boolean;
};

type SkillRow = {
  user_id: string;
  skill_name: string;
  skill_level: "beginner" | "intermediate" | "advanced";
};

type ResumeData = {
  personal: PersonalRow | null;
  education: EducationRow[];
  experience: WorkRow[];
  skill: SkillRow[];
};

/** به Date امن تبدیل کن */
const toJsDate = (val: DbDate): Date | null => {
  if (!val) return null;

  // react-date-object
  if (typeof (val as DateObject).toDate === "function") {
    try {
      return (val as DateObject).toDate();
    } catch {
      /* ignore */
    }
  }

  // شیء {year,month,day}
  const o = val as { year?: number; month?: number; day?: number };
  if (
    typeof o?.year === "number" &&
    typeof o?.month === "number" &&
    typeof o?.day === "number"
  ) {
    return new Date(o.year, o.month - 1, o.day);
  }

  // رشته
  if (typeof val === "string") {
    const d = new Date(val);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  return null;
};

const toFaDate = (val: DbDate): string => {
  const d = toJsDate(val);
  return d ? new Intl.DateTimeFormat("fa-IR").format(d) : "-";
};

export default function ResumeModal({
  userId,
  isOpen,
  onClose,
}: ResumeModalProps): JSX.Element {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ناحیه‌ای که چاپ/دانلود PDF می‌شود
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchData = async (): Promise<void> => {
    setLoading(true);

    const { data: personal } = await supabase
      .from("personal_infos")
      .select(
        "user_id, first_name, last_name, national_code, birth_date, residence_province, residence_city, address, phone, email",
      )
      .eq("user_id", userId)
      .maybeSingle()
      .returns<PersonalRow>();

    const { data: education } = await supabase
      .from("educations")
      .select("user_id, degree, field, start_date, end_date, is_studying")
      .eq("user_id", userId)
      .returns<EducationRow[]>();

    const { data: experience } = await supabase
      .from("work_infos")
      .select(
        "user_id, company_name, position, start_date, end_date, is_working",
      )
      .eq("user_id", userId)
      .returns<WorkRow[]>();

    const { data: skill } = await supabase
      .from("skill")
      .select("user_id, skill_name, skill_level")
      .eq("user_id", userId)
      .returns<SkillRow[]>();

    setData({
      personal: personal ?? null,
      education: education ?? [],
      experience: experience ?? [],
      skill: skill ?? [],
    });

    setLoading(false);
  };

  const handleDownloadPdf = (): void => {
    if (!printRef.current) return;
    // چاپ/دانلود با iframe (بدون وابستگی، سریع و پایدار)
    printNode(printRef.current, `resume-${userId}`);
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose}>
      {loading || !data ? (
        <p className="text-center text-gray-500">در حال بارگذاری…</p>
      ) : (
        // ظرف کلی مودال با حداکثر ارتفاع، بدنهٔ اسکرولی، فوتر ثابت
        <div className="flex max-h-[85vh] flex-col">
          <h2 className="text-lg font-bold mb-2">جزئیات رزومه</h2>

          {/* بدنه اسکرولی */}
          <div className="flex-1 overflow-y-auto pr-2">
            {/* فقط محتوای قابل پرینت داخل این div بماند */}
            <div
              ref={printRef}
              className="bg-white text-black p-8 space-y-6 pb-10"
              dir="rtl"
              style={{ width: 794, maxWidth: "100%", margin: "0 auto" }}
            >
              {data.personal && (
                <section>
                  <h3 className="font-bold mb-2">اطلاعات فردی</h3>
                  <ul className="list-disc list-inside text-gray-700 leading-7">
                    <li>
                      نام: {data.personal.first_name} {data.personal.last_name}
                    </li>
                    <li>کد ملی: {data.personal.national_code}</li>
                    <li>تاریخ تولد: {toFaDate(data.personal.birth_date)}</li>
                    <li>تلفن: {data.personal.phone}</li>
                    <li>ایمیل: {data.personal.email}</li>
                    <li>
                      آدرس: {data.personal.residence_province}،{" "}
                      {data.personal.residence_city}
                      {data.personal.address
                        ? ` - ${data.personal.address}`
                        : ""}
                    </li>
                  </ul>
                </section>
              )}

              {data.education.length > 0 && (
                <section className="break-inside-avoid">
                  <h3 className="font-bold mb-2">سوابق تحصیلی</h3>
                  <ul className="list-disc list-inside text-gray-700 leading-7">
                    {data.education.map((edu, idx) => (
                      <li key={idx}>
                        {edu.degree} در {edu.field} ({toFaDate(edu.start_date)}{" "}
                        تا{" "}
                        {edu.is_studying
                          ? "در حال تحصیل"
                          : toFaDate(edu.end_date)}
                        )
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.experience.length > 0 && (
                <section className="break-inside-avoid">
                  <h3 className="font-bold mb-2">سوابق کاری</h3>
                  <ul className="list-disc list-inside text-gray-700 leading-7">
                    {data.experience.map((exp, idx) => (
                      <li key={idx}>
                        {exp.position} در {exp.company_name} (
                        {toFaDate(exp.start_date)} تا{" "}
                        {exp.is_working
                          ? "مشغول به کار"
                          : toFaDate(exp.end_date)}
                        )
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.skill.length > 0 && (
                <section className="break-inside-avoid">
                  <h3 className="font-bold mb-2">مهارت‌ها</h3>
                  <ul className="list-disc list-inside text-gray-700 leading-7">
                    {data.skill.map((s, idx) => (
                      <li key={idx}>
                        {s.skill_name} — سطح {s.skill_level}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* فوتر ثابت؛ خارج از بخش اسکرولی */}
          <div className="mt-4 flex justify-between gap-2 bg-white pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              بستن
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              دانلود PDF
            </button>
          </div>
        </div>
      )}
    </SimpleModal>
  );
}
