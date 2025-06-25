import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import type { Day } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import dayjs, { Dayjs } from "dayjs";

interface JalaliDateInputProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  disabled?: boolean;
}

const JalaliDateInput: React.FC<JalaliDateInputProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toPickerDate = (d: Dayjs | null): Day | null => {
    if (!d || !d.isValid()) return null;
    return {
      year: d.year(),
      month: d.month() + 1,
      day: d.date(),
    };
  };

  const fromPickerDate = (d: Day | null | undefined): Dayjs | null => {
    if (!d) return null;
    const result = dayjs()
      .year(d.year)
      .month(d.month - 1)
      .date(d.day);
    return result.isValid() ? result : null;
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col" ref={wrapperRef}>
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type="text"
        className="border rounded p-2 w-full cursor-pointer"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        value={value ? value.format("YYYY-MM-DD") : ""}
        readOnly
        disabled={disabled}
      />
      {isOpen && (
        <div className="absolute z-50 mt-1">
          <Calendar
            value={toPickerDate(value)}
            onChange={(d) => {
              const newDate = fromPickerDate(d);
              onChange(newDate);
              setIsOpen(false);
            }}
            shouldHighlightWeekends
            locale="fa"
            colorPrimary="#0f62fe"
          />
        </div>
      )}
    </div>
  );
};

export default JalaliDateInput;
