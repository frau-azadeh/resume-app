// src/pages/admin/ApplicationsPage.tsx
import { useEffect, useState } from "react";

import AdminDecisionModal from "../../components/admin/AdminDecisionModal";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import FilterStatus from "../../components/admin/FilterStatus";
import ResumeModal from "../../components/admin/ResumeModal";
import SearchBox from "../../components/admin/SearchBox";
import { supabase } from "../../lib/supabase";
import type { DecisionStatus } from "../../types/admin";
import type {
  AppStatus,
  ApplicationRow,
  ApplicationWithName,
  PersonalNameRow,
} from "../../types/admin";

const defaultMsg = (st: DecisionStatus): string =>
  st === "approved"
    ? "درخواست شما پذیرفته شد. به‌زودی با شما تماس می‌گیریم."
    : "متأسفانه در این مرحله پذیرفته نشدید.";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<ApplicationWithName[]>([]);
  const [statusFilter, setStatusFilter] = useState<AppStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // رزومه
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // مودال تصمیم
  const [decisionOpen, setDecisionOpen] = useState<boolean>(false);
  const [decisionTarget, setDecisionTarget] =
    useState<ApplicationWithName | null>(null);
  const [decisionInitialStatus, setDecisionInitialStatus] =
    useState<DecisionStatus>("approved");

  useEffect(() => {
    void fetchList();
  }, []);

  const fetchList = async (): Promise<void> => {
    const { data: appRows, error: appErr } = await supabase
      .from("applications")
      .select(
        "id, user_id, status, created_at, decision_message, decided_at, decided_by",
      )
      .order("created_at", { ascending: false })
      .returns<ApplicationRow[]>();

    if (appErr || !appRows) {
      if (appErr) console.error("apps fetch error:", appErr.message);
      setApps([]);
      return;
    }

    const userIds = Array.from(new Set(appRows.map((a) => a.user_id)));
    let nameRows: PersonalNameRow[] = [];

    if (userIds.length > 0) {
      const { data: nameData, error: nameErr } = await supabase
        .from("personal_infos")
        .select("user_id, last_name")
        .in("user_id", userIds)
        .returns<PersonalNameRow[]>();
      if (nameErr) console.error("names fetch error:", nameErr.message);
      nameRows = nameData ?? [];
    }

    const nameMap = new Map<string, string | null>();
    nameRows.forEach((r) => nameMap.set(r.user_id, r.last_name));

    const withNames: ApplicationWithName[] = appRows.map((a) => ({
      ...a,
      last_name: nameMap.get(a.user_id) ?? null,
    }));

    setApps(withNames);
  };

  // باز کردن مودال تصمیم
  const openDecision = (
    app: ApplicationWithName,
    desired: DecisionStatus,
  ): void => {
    // اگر قبلاً تصمیم‌گیری شده بود، همان را پیش‌فرض بگذار؛ وگرنه چیزی که روی دکمه کلیک شده
    const initStatus: DecisionStatus = (
      app.status === "approved" || app.status === "rejected"
        ? app.status
        : desired
    ) as DecisionStatus;

    setDecisionTarget(app);
    setDecisionInitialStatus(initStatus);
    setDecisionOpen(true);
  };

  // ذخیره‌ی تصمیم
  const saveDecision = async (
    target: ApplicationWithName,
    status: DecisionStatus,
    message: string,
  ): Promise<void> => {
    const { data: auth } = await supabase.auth.getUser();
    const decided_by = auth?.user?.id ?? null;

    const patch = {
      status,
      decision_message: message,
      decided_at: new Date().toISOString(),
      decided_by,
    };

    const { data, error } = await supabase
      .from("applications")
      .update(patch)
      .eq("id", target.id)
      .select("id, status, decision_message, decided_at, decided_by")
      .single();

    if (error) {
      alert(`خطا در ذخیره نتیجه: ${error.message}`);
      return;
    }

    // آپدیت خوش‌بینانه UI
    setApps((prev) =>
      prev.map((a) => (a.id === target.id ? { ...a, ...data } : a)),
    );

    // بستن مودال
    setDecisionOpen(false);
    setDecisionTarget(null);
  };

  const filtered = apps
    .filter((a) => (statusFilter === "all" ? true : a.status === statusFilter))
    .filter((a) =>
      searchQuery.trim() === ""
        ? true
        : (a.last_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">لیست درخواست‌ها</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        <FilterStatus value={statusFilter} onChange={setStatusFilter} />
      </div>

      <ApplicationsTable
        applications={filtered}
        onApprove={(app) => openDecision(app, "approved")}
        onReject={(app) => openDecision(app, "rejected")}
        onView={(uid: string) => setSelectedUserId(uid)}
      />

      {/* مودال رزومه */}
      {selectedUserId && (
        <ResumeModal
          userId={selectedUserId}
          isOpen={true}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {/* مودال تصمیم ادمین */}
      {decisionTarget && (
        <AdminDecisionModal
          open={decisionOpen}
          onClose={() => {
            setDecisionOpen(false);
            setDecisionTarget(null);
          }}
          initialStatus={decisionInitialStatus}
          initialMessage={
            decisionTarget.decision_message ?? defaultMsg(decisionInitialStatus)
          }
          candidateName={decisionTarget.last_name ?? "کارجو"}
          onSubmit={async (st, msg) => {
            await saveDecision(decisionTarget, st, msg);
          }}
        />
      )}
    </div>
  );
}
