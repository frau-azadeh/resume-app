import clsx from "clsx";
import React from "react";

interface PasswordStrengthMeter {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeter> = ({
  password,
}) => {
  if (!password) return null;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[@$!%*?&]/.test(password);

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  let color = "";
  let percent = 0;
  switch (score) {
    case 0:
    case 1:
      color = "bg-red-500";
      percent = 25;
      break;
    case 2:
      color = "bg-yellow-500";
      percent = 50;
      break;
    case 3:
      color = "bg-blue-500";
      percent = 75;
      break;
    case 4:
      color = "bg-green-600";
      percent = 100;
      break;
  }

  return (
    <div className="space-y-1">
      <div className="h-2 w-full bg-gray-200 rounded-full owerflow-hidden">
        <div
          className={clsx("h-full transition-all duration-300", color)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
