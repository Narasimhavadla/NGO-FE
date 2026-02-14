import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function AdminDeleteEventModal({
  open,
  onClose,
  eventData,
  refreshEvents,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  if (!eventData) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`${api}/event/${eventData.id}`);

      toast.success("Event deleted successfully");
      refreshEvents();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">
                Delete Event
              </h2>

              <button onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 text-center space-y-4">
              <div className="text-red-500 text-4xl">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>

              <p className="text-gray-700">
                Are you sure you want to delete
              </p>

              <h3 className="font-bold text-[#254151] text-lg">
                {eventData.title}
              </h3>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} />
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
