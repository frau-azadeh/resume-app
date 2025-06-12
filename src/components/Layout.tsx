// src/components/Layout.tsx
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/fonts.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const tabs = [
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

  // خواندن اطلاعات شخصی از Redux
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo,
  );

  const currentTab = location.pathname.split("/").pop();

  const handleTabClick = (tabId: string) => {
    navigate(`/form/${tabId}`);
  };

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
                      {tabs.map((tab) => (
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

                {/* بخش نام و عکس کاربر */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-white text-sm whitespace-nowrap">
                    {personalInfo?.firstName || "کاربر"}{" "}
                    {personalInfo?.lastName || ""}
                  </span>
                  {personalInfo?.avatar && personalInfo.avatar !== "" && (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={personalInfo.avatar}
                      alt="آواتار کاربر"
                    />
                  )}
                </div>

                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">باز کردن منو</span>
                    {open ? (
                      <XMarkIcon className="block size-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block size-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 bg-white shadow">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
