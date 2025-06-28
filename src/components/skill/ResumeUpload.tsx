import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setResumeFile } from "../../store/slices/skillSlice";
import type { RootState, AppDispatch } from "../../store/store";
import Button from "../ui/Button";
import { Input } from "../ui";

const ResumeUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resumeFile = useSelector((state: RootState) => state.skill.resumeFile);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          setResumeFile({ name: file.name, base64: reader.result as string })
        );
        toast.success("فایل رزومه با موفقیت بارگذاری شد.");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("لطفاً فقط فایل PDF انتخاب کنید.");
    }
  };

  return (
    <div
      dir="rtl"
      className="mx-auto bg-white p-6 rounded-lg shadow-md border-t border-gray-200 pt-6 mb-10 space-y-8"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        رزومه (فقط PDF)
      </h3>

      {resumeFile ? (
        <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <div
            className="text-sm text-gray-700 truncate max-w-xs"
            title={resumeFile.name}
          >
            {resumeFile.name}
          </div>

          <div className="flex gap-3 items-center">
            <a
              href={resumeFile.base64}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              مشاهده
            </a>

            <Button
              variant="destructive"
              onClick={() => {
                dispatch(setResumeFile(null));
                toast.info("فایل رزومه حذف شد.");
              }}
              className="px-3 py-1"
            >
              حذف
            </Button>
          </div>
        </div>
      ) : (
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm bg-white"
        />
      )}
    </div>
  );
};

export default ResumeUpload;
