import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPaperclip,
  faEnvelope,
  faUsers,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminNotify() {
  // Replace with API data
  const donors = [
    { id: 1, name: "Ramesh Kumar", email: "ramesh@gmail.com" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com" },
    { id: 3, name: "Suresh Reddy", email: "suresh@gmail.com" },
    { id: 4, name: "Anjali Verma", email: "anjali@gmail.com" },
  ];

  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Newsletter");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const filteredDonors = donors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredDonors.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredDonors.map((d) => d.id));
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSend = () => {
    const selectedEmails = donors
      .filter((d) => selectedUsers.includes(d.id))
      .map((d) => d.email);

    const payload = {
      emails: selectedEmails,
      subject,
      category,
      message,
      attachment,
    };

    console.log("Sending Mail Data:", payload);
    alert("Notification sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="border rounded-xl p-4 flex flex-col h-[600px]">

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#254151]">
            <FontAwesomeIcon icon={faUsers} />
            Donor List
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search donors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
            />
          </div>

          {/* Select All */}
          <div className="flex items-center mb-3 border-b pb-2">
            <input
              type="checkbox"
              checked={
                filteredDonors.length > 0 &&
                selectedUsers.length === filteredDonors.length
              }
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label className="font-medium text-gray-700">
              Select All
            </label>
          </div>

          {/* Donor List */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(donor.id)}
                    onChange={() => handleCheckboxChange(donor.id)}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {donor.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {donor.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="border rounded-xl p-6 flex flex-col">

          <h2 className="text-xl font-semibold mb-6 text-[#254151] flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            Compose Notification
          </h2>

          {/* Subject */}
          <label className="mb-2 font-medium">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          />

          {/* Category */}
          <label className="mb-2 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          >
            <option>Newsletter</option>
            <option>Event Announcement</option>
            <option>Donation Alert</option>
          </select>

          {/* Message */}
          <label className="mb-2 font-medium">Message</label>
          <textarea
            rows="6"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254151]"
          />

          {/* Attachment */}
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

          {/* Selected Count */}
          <p className="mb-4 text-sm text-gray-600">
            Selected Recipients:{" "}
            <span className="font-semibold">
              {selectedUsers.length}
            </span>
          </p>

          {/* Send Button */}
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