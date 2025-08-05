import React from "react";
import DateObject from "react-date-object";
import type { EducationFormDataLocal } from "../../validation/educationSchema";
import { Button } from "../ui";

interface Props {
  educationList: EducationFormDataLocal[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}


export interface EducationFormData extends Omit<EducationFormDataLocal, "start_date" | "end_date"> {
  id?: number; // 👈 این رو اضافه کن برای شناسایی رکوردها
  user_id: string;
  start_date: string;
  end_date?: string;
}

const formatDate = (date: DateObject | null): string => {
  if (!date) return "";
  return date.format("YYYY-MM-DD"); // میلادی
};

const EducationList: React.FC<Props> = ({
  educationList,
  onEdit,
  onDelete,
}) => (
  <div className="mt-6">
    <h2 className="font-bold mb-2">لیست سوابق</h2>
    {educationList.length === 0 && <p>هیچ سابقه تحصیلی ثبت نشده است.</p>}
    {educationList.map((item, index) => (
      <div
        key={index}
        className="border border-gray-300 rounded-lg p-4 mb-3 flex justify-between items-center shadow-sm bg-white"
      >
        <div>
          <div>
            {item.degree} - {item.field}
          </div>
          <div>
            {formatDate(item.start_date)} تا{" "}
            {item.is_studying
              ? "در حال تحصیل"
              : formatDate(item.end_date)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(index)} variant="primary">
            ویرایش
          </Button>
          <Button onClick={() => onDelete(index)} variant="destructive">
            حذف
          </Button>
        </div>
      </div>
    ))}
  </div>
);

export default EducationList;
