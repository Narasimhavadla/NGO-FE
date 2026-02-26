import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPaperclip,
  faEnvelope,
  faUsers,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AdminNotify() {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subject, setSubject] = useState("");
  const [mailCategory, setMailCategory] = useState("Newsletter");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/bulk-emails`);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🔎 Filter + Search Logic
  const filteredUsers = data.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : user.category === filter;

    return matchesSearch && matchesFilter;
  });

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

const handleSend = async () => {
  try {
    const selectedEmails = data
      .filter((d) => selectedUsers.includes(d.id))
      .map((d) => d.email);

    const payload = {
      emails: selectedEmails,
      subject,
      message,
    };

    const res = await axios.post(
      `${api}/send-bulk-email`,
      payload
    );

    alert("Notification sent successfully!");
    console.log(res.data);

  } catch (error) {
    console.error(error);
    alert("Failed to send emails");
  }
};

  const getBadgeColor = (category) => {
    switch (category) {
      case "donors":
        return "bg-green-100 text-green-700";
      case "volunteers":
        return "bg-blue-100 text-blue-700";
      case "lead":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PANEL */}
        <div className="border rounded-xl p-4 flex flex-col h-[600px] lg:col-span-5">

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#254151]">
            <FontAwesomeIcon icon={faUsers} />
            Recipients
          </h2>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["all", "donors", "volunteers", "lead"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setSelectedUsers([]);
                }}
                className={`px-3 py-1 rounded-full text-sm capitalize transition 
                ${
                  filter === cat
                    ? "bg-[#254151] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="relative mb-4">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
            />
          </div>

          {/* SELECT ALL */}
          <div className="flex items-center mb-3 border-b pb-2">
            <input
              type="checkbox"
              checked={
                filteredUsers.length > 0 &&
                selectedUsers.length === filteredUsers.length
              }
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label className="font-medium text-gray-700">
              Select All ({filteredUsers.length})
            </label>
          </div>

          {/* USER LIST */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* CATEGORY BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getBadgeColor(
                    user.category
                  )}`}
                >
                  {user.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="border rounded-xl p-6 flex flex-col lg:col-span-7">

          <h2 className="text-xl font-semibold mb-6 text-[#254151] flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            Compose Email Notification
          </h2>

          <label className="mb-2 font-medium">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          />

          <label className="mb-2 font-medium">Type</label>
          <select
            value={mailCategory}
            onChange={(e) => setMailCategory(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          >
            <option>Newsletter</option>
            <option>Event Announcement</option>
            <option>Donation Alert</option>
          </select>

          <label className="mb-2 font-medium">Message</label>
          <textarea
            rows="6"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          />

          <label className="mb-2 font-medium">Attachment</label>
          <div className="mb-4 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
              <FontAwesomeIcon icon={faPaperclip} />
              Attach File
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
            </label>
            {attachment && (
              <span className="text-sm text-gray-600">
                {attachment.name}
              </span>
            )}
          </div>

          <p className="mb-4 text-sm text-gray-600">
            Selected Recipients:{" "}
            <span className="font-semibold">
              {selectedUsers.length}
            </span>
          </p>

          <button
            onClick={handleSend}
            disabled={selectedUsers.length === 0}
            className="mt-auto bg-[#254151] text-white py-3 rounded-xl hover:bg-[#1b303d] transition disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}