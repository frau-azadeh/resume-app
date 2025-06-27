import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setResumeFile } from "../../store/slices/skillSlice"; // <-- use skillSlice here
import type { RootState, AppDispatch } from "../../store/store";
import  Button  from "../ui/Button";

const ResumeUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resumeFile = useSelector((state: RootState) => state.skill.resumeFile);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setResumeFile({ name: file.name, base64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("لطفا فقط فایل PDF انتخاب کنید.");
    }
  };

  return (
    <div className="mt-8" dir="rtl">
      <h3 className="text-lg font-semibold mb-2">رزومه (فقط PDF)</h3>
      {resumeFile ? (
        <div className="border p-3 rounded flex justify-between items-center">
          <div className="text-sm">{resumeFile.name}</div>
          <div className="flex gap-3">
            <a
              href={resumeFile.base64}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              مشاهده
            </a>
            <Button
              variant="destructive"
              onClick={() => {
                dispatch(setResumeFile(null));
                toast.info("فایل رزومه حذف شد");
              }}
            >
              حذف
            </Button>
          </div>
        </div>
      ) : (
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="w-full border p-2 rounded"
        />
      )}
    </div>
  );
};

export default ResumeUpload;
