// src/components/admin/SearchBox.tsx
interface SearchBoxProps {
    value: string;
    onChange: (val: string) => void;
  }
  
  import { Search } from "lucide-react";
import { Input } from "../ui";
  
  const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    return (
      <div className="relative w-full md:w-1/2">
        <Input
          type="text"
          placeholder="جستجو بر اساس نام خانوادگی ... "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-3 py-2 pr-10"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
      </div>
    );
  };
  
  export default SearchBox;
  