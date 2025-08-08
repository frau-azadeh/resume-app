// src/pages/user/SummaryPage.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { AppStatus } from "../types/admin";

type SummaryRow = {
  status: AppStatus;
  decision_message: string | null;
  decided_at: string | null;
};

export default function SummaryPage(): JSX.Element {
  const [row, setRow] = useState<SummaryRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchSummary();
  }, []);

  const fetchSummary = async (): Promise<void> => {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth?.user?.id;
    if (!uid) { setLoading(false); return; }

    const { data } = await supabase
    .from("applications")
    .select("status, decision_message, decided_at")
    .eq("user_id", uid)
    .order("decided_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  

    setRow((data as SummaryRow) ?? null);
    setLoading(false);
  };

  if (loading) return <div className="p-6">در حال بارگذاری…</div>;
  if (!row)     return <div className="p-6">درخواستی پیدا نشد.</div>;

  const statusFa =
    row.status === "approved" ? "تأیید شده" :
    row.status === "rejected" ? "رد شده" :
    "در انتظار بررسی";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-3 h-screen" dir="rtl">
      <h2 className="text-lg font-bold">خلاصه وضعیت درخواست</h2>
      <div>
        وضعیت:{" "}
        <span className={
          row.status === "approved" ? "text-green-600 font-semibold" :
          row.status === "rejected" ? "text-red-600 font-semibold" :
          "text-gray-600 font-semibold"
        }>
          {statusFa}
        </span>
      </div>
      <div>پیام: {row.decision_message ?? "—"}</div>
      <div className="text-sm text-gray-500">
        تاریخ تصمیم: {row.decided_at
          ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(row.decided_at))
          : "—"}
      </div>
    </div>
  );
}
