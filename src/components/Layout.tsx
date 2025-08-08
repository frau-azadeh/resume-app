// src/components/Layout.tsx
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/fonts.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { supabase } from "../lib/supabase";
import { LogOut } from "lucide-react";
import Footer from "../pages/Footer";

const baseTabs = [
  { id: "personal-info", label: "اطلاعات فردی" },
  { id: "education", label: "سوابق تحصیلی" },
  { id: "work-experience", label: "سوابق کاری" },
  { id: "skill", label: "مهارت ها" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo,
  );

  const [showSummaryTab, setShowSummaryTab] = useState(false);
  const currentTab = location.pathname.split("/").pop();

  const handleTabClick = (tabId: string) => {
    navigate(`/form/${tabId}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // بررسی کامل بودن فرم برای نمایش تب "خلاصه"
  useEffect(() => {
    const checkCompletion = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      const { data } = await supabase
        .from("skill")
        .select("id")
        .eq("user_id", userId);

      if (data && data.length > 0) {
        setShowSummaryTab(true);
      }
    };

    checkCompletion();
  }, []);

  const allTabs = showSummaryTab
    ? [...baseTabs, { id: "summary", label: "اطلاع رسانی" }]
    : baseTabs;

  return (
    <div className="min-h-full" dir="rtl">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <img className="size-8" src="/resume.jpg" alt="لوگو" />
                  </div>
                  <div className="hidden md:flex md:items-center">
                    <span className="text-white text-lg font-bold ml-4">
                      داشبورد
                    </span>
                    <div className="flex gap-2">
                      {allTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id)}
                          className={classNames(
                            currentTab === tab.id
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium",
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ✅ اطلاعات کاربر و خروج در حالت دسکتاپ */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-white text-sm whitespace-nowrap">
                    {personalInfo?.first_name || "کاربر"}{" "}
                    {personalInfo?.last_name || ""}
                  </span>
                  {personalInfo?.avatar_url &&
                    personalInfo.avatar_url !== "" && (
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={personalInfo.avatar_url}
                        alt="آواتار کاربر"
                      />
                    )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white transition"
                    title="خروج از حساب"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                {/* دکمه منو در حالت موبایل */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">باز کردن منو</span>
                    {open ? (
                      <XMarkIcon className="block size-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block size-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* ✅ منوی موبایل شامل تب‌ها و دکمه خروج */}
            <Disclosure.Panel className="md:hidden px-2 pt-2 pb-3 space-y-1">
              {allTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={classNames(
                    currentTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block w-full text-right px-3 py-2 rounded-md text-base font-medium",
                  )}
                >
                  {tab.label}
                </button>
              ))}

              {/* 🔥 دکمه خروج فقط در موبایل */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:bg-red-600 hover:text-white w-full text-right px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>خروج از حساب</span>
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="bg-[#d9eafd]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
