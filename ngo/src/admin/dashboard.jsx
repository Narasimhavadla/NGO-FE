import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import AdminDonationsPage from "./AdminDonationsPage";
import AdminVolunteersPage from "./AdminVolunteersPage";
import AdminEventsPage from "./AdminEventsPage";
import AdminBeneficiariesPage from "./AdminBeneficiariesPage";
import AdminGalleryPage from "./AdminGallery";
import AdminOurTeam from "./AdminTeam";
import { faTeamspeak } from "@fortawesome/free-brands-svg-icons";

export default function NGOAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: faChartLine },
    { name: "Donations", icon: faMoneyBillWave },
    { name: "Volunteers", icon: faUsers },
    { name: "Events", icon: faCalendarDays },
    { name: "Gallery", icon: faPhotoFilm },
    { name: "Team", icon: faHandshake },
    // { name: "Beneficiaries", icon: faHandHoldingHeart },
  ];

  /* ---------------- TAB COMPONENTS ---------------- */

  const DashboardTab = () => (
    <>
      {/* CARDS */}
      <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Donations",
            value: "₹2,45,000",
            icon: faMoneyBillWave,
          },
          { title: "Volunteers", value: "320", icon: faUsers },
          { title: "Events", value: "18", icon: faCalendarDays },
          {
            title: "Beneficiaries",
            value: "1,120",
            icon: faHandHoldingHeart,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>
                <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
              </div>
              <FontAwesomeIcon
                icon={card.icon}
                className="text-3xl text-[#254151]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <div className="p-6 border-b font-semibold text-gray-700">
            Recent Donations
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Donor Name</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              <tr className="border-t">
                <td className="p-4">Ravi Kumar</td>
                <td className="p-4">₹5,000</td>
                <td className="p-4">10 Feb 2026</td>
                <td className="p-4 text-green-600 font-semibold">
                  Completed
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  /* -------- TAB RENDER FUNCTION -------- */

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
    //   case "Beneficiaries":
    //     return <AdminBeneficiariesPage />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
    {/* SIDEBAR */}
<div
  className={`
    fixed lg:static top-0 left-0 h-full z-50
    bg-[#254151] text-white
    transition-all duration-300
    ${sidebarOpen ? "w-64" : "w-0 lg:w-20 !h-[100vh]"}
    overflow-hidden flex flex-col 
  `}
>
  {/* LOGO */}
  <div className={`h-20 flex items-center justify-center border-b border-white/20 font-bold ${sidebarOpen ? "text-xl" : "text-sm"}`}>
    {sidebarOpen ? "Dhatrutha" : "Dhatrutha"}
  </div>

  {/* MENU */}
  <div className={`flex-1 space-y-2 p-4`}>
    {menuItems.map((item, index) => (
      <div
        key={index}
        onClick={() => {
          setActiveTab(item.name);
          if (window.innerWidth < 1024) setSidebarOpen(false);
        }}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
          activeTab === item.name
            ? "bg-white/20"
            : "hover:bg-white/10"
        }`}
      >
        <FontAwesomeIcon icon={item.icon} />
        {sidebarOpen && <span>{item.name}</span>}
      </div>
    ))}
    {/* LOGOUT */}
  <div className="p-4 border-t border-white/20 mt-10">
    <div className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition `}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      {sidebarOpen && <span>Logout</span>}
    </div>
  </div>
  </div>

  
</div>


      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#254151] text-xl"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <h1 className="text-2xl font-bold text-gray-700">
            {activeTab}
          </h1>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1">{renderTab()}</div>
      </div>
    </div>
  );
}
