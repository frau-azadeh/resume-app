import React from "react";
import dayjs from "dayjs";
import type { EducationFormDataLocal } from "../../validation/educationSchema";
import { Button } from "../ui";

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
     className="border border-gray-300 rounded-lg p-4 mb-3 flex justify-between items-center shadow-sm bg-white"
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
