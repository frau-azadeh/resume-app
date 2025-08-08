import type{ StatusFilter } from "../../types/admin";

interface FilterStatusProps {
  value: StatusFilter;
  onChange: (val: StatusFilter) => void;
}

export default function FilterStatus({ value, onChange }: FilterStatusProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as StatusFilter)}
      className=" border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
      <option value="all">همه</option>
      <option value="pending">در انتظار</option>
      <option value="approved">تأیید</option>
      <option value="rejected">رد</option>
    </select>
  );
}
