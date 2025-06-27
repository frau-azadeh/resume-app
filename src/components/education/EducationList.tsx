import React from "react";
import dayjs from "dayjs";
import type { EducationFormDataLocal } from "../../validation/educationSchema";

interface Props {
  educationList: EducationFormDataLocal[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

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
        className="border rounded p-2 mb-2 flex justify-between items-center"
      >
        <div>
          <div>
            {item.degree} - {item.field}
          </div>
          <div>
            {item.startDate ? dayjs(item.startDate).format("YYYY-MM-DD") : ""}
            تا{" "}
            {item.isStudying
              ? "در حال تحصیل"
              : item.endDate
                ? dayjs(item.endDate).format("YYYY-MM-DD")
                : ""}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(index)} className="text-blue-600">
            ویرایش
          </button>
          <button onClick={() => onDelete(index)} className="text-red-600">
            حذف
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default EducationList;
