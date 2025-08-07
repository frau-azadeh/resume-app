import { CheckCircle, Eye, XCircle } from "lucide-react";

interface ApplicationWithName {
  id: string;
  user_id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  last_name: string | null;
}

interface Props {
  applications: ApplicationWithName[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (userId: string) => void;
}

const ApplicationsTable = ({ applications, onApprove, onReject, onView }: Props) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-6">
      <table className="min-w-full text-sm text-right">
        <thead className="bg-blue-50 text-gray-700 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">نام کارجو</th>
            <th className="px-4 py-3">تاریخ ارسال</th>
            <th className="px-4 py-3">وضعیت</th>
            <th className="px-4 py-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {applications.map((app, index) => (
            <tr key={app.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium">{index + 1}</td>
              <td className="px-4 py-3">{app.last_name || "نامشخص"}</td>
              <td className="px-4 py-3">
                {new Date(app.created_at).toLocaleDateString("fa-IR")}
              </td>
              <td className="px-4 py-3">
                {app.status === "pending" && (
                  <span className="text-yellow-600 font-semibold">در انتظار</span>
                )}
                {app.status === "approved" && (
                  <span className="text-green-600 font-semibold">تأیید شده</span>
                )}
                {app.status === "rejected" && (
                  <span className="text-red-600 font-semibold">رد شده</span>
                )}
              </td>
              <td className="px-4 py-3 text-center flex items-center justify-end gap-3">
                <button onClick={() => onApprove(app.id)} className="text-green-600 hover:text-green-800 transition">
                  <CheckCircle size={20} />
                </button>
                <button onClick={() => onReject(app.id)} className="text-red-600 hover:text-red-800 transition">
                  <XCircle size={20} />
                </button>
                <button onClick={() => onView(app.user_id)} className="text-blue-600 hover:text-blue-800 transition">
                  <Eye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {applications.length === 0 && (
        <div className="text-center text-gray-500 py-6">درخواستی یافت نشد.</div>
      )}
    </div>
  );
};

export default ApplicationsTable;
