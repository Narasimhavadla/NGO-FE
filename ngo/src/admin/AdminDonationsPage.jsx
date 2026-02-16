import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AddDonationModal from "../components/AdminAddDonation";

export default function AdminDonationsPage() {
  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddDonation,setShowAddDonation] = useState(false)

  const api = import.meta.env.VITE_API_BASE_URL

  // ===== PAGINATION STATES =====
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // ================= FETCH API =================
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `${api}/admin/donations`
      );

      if (res.data.status) {

        const sortedData = res.data.data.sort(
          (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setDonations(sortedData);
        setMeta(res.data.meta);
      }
    } catch (err) {
      console.error("Failed to fetch donations", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================
  const filteredDonations = donations.filter((donation) =>
    donation.donorName
      ?.toLowerCase()
      .includes(search.toLowerCase()) || 
    donation.donorPhone 
      ?.toLowerCase()
      .includes(search)
  );

  // ================= PAGINATION =================
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentRecords = filteredDonations.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredDonations.length / recordsPerPage
  );

  // ================= EXPORT HELPERS =================
  const formatDataForExcel = (data) => {
    return data.map((item) => ({
      Donor_Name: item.donorName,
      Email: item.donorEmail,
      Phone: item.donorPhone,
      Amount: item.amount,
      Status: item.payment_status,
      DonationFor : item.donationFor,
      Method : item.payment_method,
      Date: new Date(item.createdAt).toLocaleDateString(),
    }));
  };

  // Export Current Page
  const exportCurrentPage = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      formatDataForExcel(currentRecords)
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Current Page Donations"
    );

    XLSX.writeFile(
      workbook,
      "Current_Page_Donations.xlsx"
    );
  };

  // Export All
  const exportAllData = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      formatDataForExcel(filteredDonations)
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "All Donations"
    );

    XLSX.writeFile(workbook, "All_Donations.xlsx");
  };

  // ================= DELETE (UI ONLY) =================
 

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#254151]">
          Donations Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search donor name..."
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            onClick={exportCurrentPage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
          >
            Export Current
          </button>

          <button
            onClick={exportAllData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
          >
            Export All
          </button>

          <button className="bg-[#254151] text-white px-2 rounded-lg py-2"
          onClick={() => setShowAddDonation(true)}
          >
            Add Donation
          </button>

        </div>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading donations...
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Total Donations
            </p>
            <h2 className="text-xl font-bold">
              ₹{meta.monthlyTotal || 0}
            </h2>
            <p className="opacity-60 text-xs">
              in this month
            </p>
          </div>

          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-2xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Total Donors
            </p>
            <h2 className="text-xl font-bold">
              {meta.donorsCount || 0}
            </h2>
          </div>

          <FontAwesomeIcon
            icon={faUsers}
            className="text-2xl text-[#F4CE50]"
          />
        </div>
        
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="lg:hidden space-y-4">
        {currentRecords.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold ">
                {donation.donorName}
              </h2>

              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  donation.payment_status ===
                  "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {donation.payment_status ===
                "success"
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>

            <p>{donation.donorEmail}</p>

            <p>₹{donation.amount}</p>

            <p>
              {new Date(
                donation.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-x-auto mt-6">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Donor</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">
                Donation For
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((donation) => (
              <tr
                key={donation.id}
                className="border-b"
              >
                <td className="p-2 font-semibold text-sm">
                  {donation.donorName}
                </td>
                 <td className="p-2">
                  {donation.donorPhone}
                </td>

                <td className="p-2">
                  {donation.donorEmail}
                </td>

                <td className="p-2">
                  ₹{donation.amount}
                </td>

                <td className="p-2">
                  {new Date(
                    donation.createdAt
                  ).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <span className="bg-gray-300 px-2 rounded-xl text-sm">{donation.payment_method}</span>
                </td>

                <td className="p-2">
                  <span
                    className={`px-2 rounded-xl text-sm font-semibold 
                    ${
                      donation.payment_status === "success"
                        ? "bg-green-200 text-green-600"
                        : donation.payment_status === "failed"
                        ? "bg-red-200 text-red-600"
                        : "bg-orange-200 text-orange-600"
                    }`}
                  >
                    {donation.payment_status}
                  </span>
                </td>


                <td className=" text-center space-x-2">
                 <span className="bg-orange-200 text-orange-600 font-semibold px-3 rounded-xl text-sm">{donation.donationFor} </span>                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.max(p - 1, 1)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() =>
              setCurrentPage(i + 1)
            }
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#254151] text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>


      {showAddDonation && <AddDonationModal
        open={showAddDonation}
        setOpen={setShowAddDonation}
        fetchDonations={fetchDonations}
      /> }

    </div>
  );
}
