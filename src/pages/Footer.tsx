import React from "react";

import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();

  // مسیرهایی که نباید Footer در آن‌ها نمایش داده شود
  const hideFooterRoutes = ["/login", "/signup"];

  if (hideFooterRoutes.includes(location.pathname)) return null;

  return (
    <footer className="bg-[#d9eafd] py-4">
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 text-center">
          تمامی حقوق این پنل متعلق به{" "}
          <a
            href="https://sunflower-dev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-semibold no-underline hover:underline"
          >
            آزاده شریفی سلطانی
          </a>{" "}
          می‌باشد.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
