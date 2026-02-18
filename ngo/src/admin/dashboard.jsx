import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faHandHoldingHeart,
  faCalendarDays,
  faMoneyBillWave,
  faBars,
  faRightFromBracket,
  faPhotoFilm,
  faHandshake,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import AdminDonationsPage from "./AdminDonationsPage";
import AdminVolunteersPage from "./AdminVolunteersPage";
import AdminEventsPage from "./AdminEventsPage";
import AdminGalleryPage from "./AdminGallery";
import AdminOurTeam from "./AdminTeam";
import AdminCalender from "./AdminCalender";

export default function NGOAdminDashboard() {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [stats, setStats] = useState({
    totalDonationAmount: 0,
    totalDonors: 0,
    totalVolunteers: 0,
    totalEvents: 0,
    recentDonations: [],
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${api}/stats`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  /* ================= MENU ================= */
  const menuItems = [
    { name: "Dashboard", icon: faChartLine },
    { name: "Donations", icon: faMoneyBillWave },
    { name: "Volunteers", icon: faUsers },
    { name: "Events", icon: faCalendarDays },
    { name: "Gallery", icon: faPhotoFilm },
    { name: "Team", icon: faHandshake },
    { name: "Calender", icon: faCalendar },
    { name: "Logout", icon: faRightFromBracket },
  ];

  /* ================= LOGOUT ================= */
  const confirmLogout = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  /* ================= DASHBOARD TAB ================= */
  const DashboardTab = () => (
    <>
      {/* ===== STATS CARDS ===== */}
      <div className="p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            title: "Total Donations",
            value: `₹${stats.totalDonationAmount}`,
            icon: faMoneyBillWave,
          },
          {
            title: "Donors",
            value: stats.totalDonors,
            icon: faHandHoldingHeart,
          },
          {
            title: "Volunteers",
            value: stats.totalVolunteers,
            icon: faUsers,
          },
          {
            title: "Events",
            value: stats.totalEvents,
            icon: faCalendarDays,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition border-l-3 border-gray-800"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <FontAwesomeIcon
                icon={card.icon}
                className="text-2xl sm:text-3xl text-[#254151]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== RECENT DONATIONS ===== */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow">
          <div className="p-4 sm:p-6 border-b font-semibold text-gray-700">
            Recent Donations
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Paid for</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {stats.recentDonations.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-4 font-semibold">
                      {d.donorName}
                    </td>

                    <td className="p-4">
                      ₹{Number(d.amount).toLocaleString()}
                    </td>

                    <td className="p-4">
                      {new Date(d.createdAt).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>

                    <td className="p-4">
                      {d.donorPhone}
                    </td>

                    <td className="p-4">
                      <span className="bg-gray-200 px-2 rounded-xl text-sm">{d.payment_method}</span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2 text-sm rounded-xl ${d.payment_status == "success" ? "bg-green-100 text-green-600" : "bg-orange-200 text-orange-600"}`}>{d.payment_status}</span>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-xl text-xs">
                        {d.donationFor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden p-4 space-y-4">
            {stats.recentDonations.map((d) => (
              <div
                key={d.id}
                className="border rounded-xl p-4 shadow-sm"
              >
                {/* Name + Amount */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {d.donorName}
                  </h3>

                  <span className="font-bold text-[#254151]">
                    ₹{Number(d.amount).toLocaleString()}
                  </span>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(d.createdAt).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-medium">
                      Phone:
                    </span>{" "}
                    {d.donorPhone}
                  </p>

                  <p>
                    <span className="font-medium">
                      Method:
                    </span>{" "}
                    {d.payment_method}
                  </p>

                  <p>
                    <span className="font-medium">
                      Status:
                    </span>{" "}
                    <span className={` px-3 rounded-xl py-1 ${d.payment_status == "success" ? "bg-green-200 text-green-600" : "bg-orange-200 text-orange-600"}`}>{d.payment_status}</span>
                  </p>

                  <p>
                    <span className="font-medium">
                      For:
                    </span>{" "}
                    <span className={` px-3 py-1 rounded-xl text-xs
                       ${d.donationFor == "general" ? "bg-orange-100 text-orange-600" : "bg-blue-200 text-blue-600"}`}>
                      {d.donationFor}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  /* ================= TAB RENDER ================= */
  const renderTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardTab />;
      case "Donations":
        return <AdminDonationsPage />;
      case "Volunteers":
        return <AdminVolunteersPage />;
      case "Events":
        return <AdminEventsPage />;
      case "Gallery":
        return <AdminGalleryPage />;
      case "Team":
        return <AdminOurTeam />;
      case "Calender":
        return <AdminCalender />;
      default:
        return <DashboardTab />;
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed lg:static z-50 bg-[#254151] text-white transition-all duration-300
        ${sidebarOpen ? "w-52" : "w-0 lg:w-20"}
        h-screen overflow-hidden`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white/20 font-bold text-lg">
          Dhatrutha
        </div>

        <div className="p-4 space-y-1">
          {menuItems.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.name === "Logout") {
                  setShowLogoutConfirm(true);
                  return;
                }
                setActiveTab(item.name);
                if (window.innerWidth < 1024)
                  setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                activeTab === item.name
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              {sidebarOpen && <span>{item.name}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6">
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="text-[#254151] text-xl"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <h1 className="text-lg sm:text-2xl font-bold text-gray-700">
            {activeTab}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {renderTab()}
        </div>
      </div>

      {/* ===== LOGOUT MODAL ===== */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h2 className="mb-6 font-semibold">
              Are you sure want to Logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Logout
              </button>

              <button
                onClick={() =>
                  setShowLogoutConfirm(false)
                }
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
