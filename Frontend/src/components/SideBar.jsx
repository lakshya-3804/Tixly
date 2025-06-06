"use client";

import { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SidebarComponent = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");


  const menuGroups = [
    {
      items: [
        { icon: HiChartPie, label: "Dashboard" },          // Overview, KPIs
        { icon: HiViewBoards, label: "Bookings" },          // Current/past bookings
        { icon: HiShoppingBag, label: "Tickets" },          // All tickets issued
        { icon: HiUser, label: "Passengers" },              // Manage user profiles
        { icon: HiInbox, label: "Messages" },               // Support or updates
        { icon: HiTable, label: "Train Schedule" },         // View/edit train timings
    ]
    },
    {
      items: [
        { icon: HiChartPie, label: "Upgrade to Pro" },
        { icon: HiViewBoards, label: "Documentation" },
        { icon: BiBuoy, label: "Help" },
      ],
    },
  ];

  return (
    <>
      <aside className="hidden md:block w-64 h-screen bg-gray-900 border-r border-gray-200 ">
        <nav className="p-4 space-y-6">
          {menuGroups.map((group, groupIdx) => (
            <ul key={groupIdx} className="space-y-2">
              {group.items.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-100 transition"
                  >
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
              {groupIdx < menuGroups.length - 1 && (
                <hr className="my-4 border-gray-200" />
              )}
            </ul>
          ))}
        </nav>
      </aside>


      {/* For smaller and medium screens */}
      <div className="md:hidden m-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full text-left inline-flex items-center justify-between px-4 py-3 bg-gray-50 text-gray-500 rounded-lg dark:bg-gray-800 dark:text-gray-400"
        >
          {activeTab}
          <svg
            className={`w-5 h-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <ul className="mt-1 p-2 space-y-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {menuGroups.map((obj, objidx) => (
              <ul key={objidx} className="space-y-2">
                {obj.items.map((tab, tabidx) => (
                  <li key={tabidx}>
                    <button
                      onClick={() => {
                        setActiveTab(tab.label);
                        setIsDropdownOpen(false); // Optional: auto-close dropdown
                      }}
                      className={`flex items-center w-full px-4 py-3 rounded-lg ${
                        activeTab === tab.label
                          ? "text-white bg-blue-700 dark:bg-blue-600"
                          : "text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      <tab.icon className="w-5 me-2" />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SidebarComponent;
