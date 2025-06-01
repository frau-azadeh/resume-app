// src/components/Layout.tsx
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import PersonalInfo from "../pages/PersonalInfo";
import EducationHistory from "../pages/EducationHistory";

interface LayoutProps {}

const user = {
  name: "علی رضایی",
  email: "ali@example.com",
  imageUrl: "https://i.pravatar.cc/100",
};

// تب‌های داخلی داشبورد
const tabs = [
  { id: "personal-info", label: "اطلاعات فردی" },
  { id: "education", label: "سوابق تحصیلی" },
  { id: "work-experience", label: "سوابق کاری" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC<LayoutProps> = () => {
  const [activeTab, setActiveTab] = useState("personal-info");

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
                    <span className="text-white text-lg font-bold ml-4">داشبورد</span>
                    <div className="flex gap-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={classNames(
                            activeTab === tab.id
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                    >
                      <span className="sr-only">مشاهده اعلان‌ها</span>
                      <BellIcon className="size-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                          <span className="sr-only">باز کردن منوی کاربر</span>
                          <img
                            className="size-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              پروفایل شما
                            </span>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              تنظیمات
                            </span>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              خروج
                            </span>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
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
      onClick={() => setActiveTab(tab.id)}
      className={classNames(
        activeTab === tab.id
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "block w-full text-right px-3 py-2 rounded-md text-base font-medium"
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
            {activeTab === "personal-info" && <PersonalInfo />}
            {activeTab === "education" && <EducationHistory />}
            {/* بقیه تب‌ها رو هم اینجا لود کن بعداً */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
