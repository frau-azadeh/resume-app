// src/pages/admin/ApplicationsPage.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import SearchBox from "../../components/admin/SearchBox";
import FilterStatus from "../../components/admin/FilterStatus";
import ResumeModal from "../../components/admin/ResumeModal";

interface ApplicationWithName {
  id: string;
  user_id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  last_name: string | null;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithName[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications_with_names")
      .select("*");

    if (error) {
      console.error("خطا در دریافت اطلاعات:", error.message);
      return;
    }

    setApplications(data || []);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id: string) => {
    await supabase.from("applications").update({ status: "approved" }).eq("id", id);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "approved" } : app))
    );
  };

  const handleReject = async (id: string) => {
    await supabase.from("applications").update({ status: "rejected" }).eq("id", id);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected" } : app))
    );
  };

  const handleView = (userId: string) => {
    setSelectedUserId(userId);
  };

  const filteredApps = applications
  .filter((app) =>
    statusFilter === "all" ? true : app.status === statusFilter
  )
  .filter((app) =>
    searchQuery.trim() === ""
      ? true
      : (app.last_name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
  );


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">لیست درخواست‌ها</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        <FilterStatus value={statusFilter} onChange={setStatusFilter} />
      </div>

      <ApplicationsTable
        applications={filteredApps}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />

      {selectedUserId && (
        <ResumeModal
          userId={selectedUserId}
          isOpen={true}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}
