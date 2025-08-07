// src/components/admin/FilterStatus.tsx
interface FilterStatusProps {
    value: string;
    onChange: (val: string) => void;
  }
  
  const FilterStatus = ({ value, onChange }: FilterStatusProps) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
        <option value="all">همه وضعیت‌ها</option>
        <option value="pending">در انتظار</option>
        <option value="approved">تأیید شده</option>
        <option value="rejected">رد شده</option>
      </select>
    );
  };
  
  export default FilterStatus;
  