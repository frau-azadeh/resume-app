import React from "react";
import Button from "../ui/Button";
import type { WorkFormData } from "../../pages/WorkInfo";

interface WorkListProps {
  workList: WorkFormData[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const WorkList: React.FC<WorkListProps> = ({ workList, onEdit, onDelete }) => {
  return (
    <div className="mt-8 space-y-4" dir="rtl">
      {workList.map((item, index) => (
        <div
          key={index}
          className="p-5 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow duration-200"
        >
          <div>
            <p className="font-semibold text-gray-900">
              {item.companyName} - {item.position}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {item.startDate?.format("YYYY-MM-DD")} تا{" "}
              {item.isWorking ? (
                <span className="text-green-600 font-medium">شاغل</span>
              ) : (
                item.endDate?.format("YYYY-MM-DD")
              )}
            </p>
          </div>
          <div className="flex gap-3">
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
};

export default WorkList;
