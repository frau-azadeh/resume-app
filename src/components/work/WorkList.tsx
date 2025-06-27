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
    <div className="mt-8 space-y-4">
      {workList.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {item.companyName} - {item.position}
            </p>
            <p className="text-sm text-gray-500">
              {item.startDate?.format("YYYY-MM-DD")} تا{" "}
              {item.isWorking ? "شاغل" : item.endDate?.format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onEdit(index)} variant="outline">
              ویرایش
            </Button>
            <Button
              onClick={() => onDelete(index)}
              variant="outline"
              color="red"
            >
              حذف
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkList;
