// src/components/admin/AdminDecisionModal.tsx
import { Dialog } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import type { DecisionStatus } from "../../types/admin";

type Props = {
  open: boolean;
  onClose: () => void;

  initialStatus: DecisionStatus;
  initialMessage: string;
  candidateName: string;

  onSubmit: (status: DecisionStatus, message: string) => Promise<void> | void;
};

const MAX_LEN = 400;

export default function AdminDecisionModal({
  open,
  onClose,
  initialStatus,
  initialMessage,
  candidateName,
  onSubmit,
}: Props) {
  const [status, setStatus] = useState<DecisionStatus>(initialStatus);
  const [message, setMessage] = useState<string>(initialMessage);

  // متن‌های پیشنهادی
  const suggested = useMemo(() => {
    return {
      approved: "درخواست شما پذیرفته شد. به‌زودی با شما تماس می‌گیریم.",
      rejected: "متأسفانه در این مرحله پذیرفته نشدید.",
    } as const;
  }, []);

  // اگر کاربر هنوز ادیتی نکرده، با تغییر وضعیت، متن پیشنهادی جدید رو ست کن
  useEffect(() => {
    const normalized = (s: string) => s.replace(/\s+/g, " ").trim();
    const isInitial =
      normalized(message) === normalized(initialMessage) ||
      normalized(message) === normalized(suggested.approved) ||
      normalized(message) === normalized(suggested.rejected);

    if (isInitial) {
      setMessage(suggested[status]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleUseSuggested = (): void => {
    setMessage(suggested[status]);
  };

  const handleSave = async (): Promise<void> => {
    await onSubmit(status, message.trim());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
        <Dialog.Panel className="bg-white w-full max-w-2xl rounded-2xl p-6 text-right">
          <Dialog.Title className="text-lg font-bold mb-1">
            ثبت/ویرایش تصمیم برای {candidateName}
          </Dialog.Title>
          <p className="text-sm text-gray-500 mb-6">
            وضعیت و پیام برای کارجو را وارد کنید. این پیام در صفحه خلاصه وضعیت نمایش داده می‌شود.
          </p>

          {/* دکمه‌های وضعیت */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => setStatus("rejected")}
              className={`rounded-xl border px-4 py-3 text-center ${
                status === "rejected"
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              رد شود
            </button>

            <button
              type="button"
              onClick={() => setStatus("approved")}
              className={`rounded-xl border px-4 py-3 text-center ${
                status === "approved"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              تایید شود
            </button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">پیام برای کارجو</label>
            <button
              type="button"
              onClick={handleUseSuggested}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              استفاده از متن پیشنهادی
            </button>
          </div>

          {/* textarea */}
          <div className="mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
              className="w-full h-40 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-3"
              dir="rtl"
              maxLength={MAX_LEN}
            />
            <div className="mt-1 text-xs text-gray-500 text-left">
              {message.length}/{MAX_LEN}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              ذخیره تصمیم
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
