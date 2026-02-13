import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteVolunteerModal({
  open,
  onClose,
  volunteer,
  refreshVolunteers,
}) {
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_API_BASE_URL;

  // ✅ DELETE FUNCTION INSIDE MODAL
  const handleConfirmDelete = async () => {
    if (!volunteer?.id) return;

    try {
      setLoading(true);

      await axios.delete(`${api}/volunteer/${volunteer.id}`);

      // Refresh list
      refreshVolunteers();

      // Close modal
      onClose();
      toast.success("Volunteer deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                <FontAwesomeIcon icon={faTrash} />
                Delete Volunteer
              </h2>

              <button onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-black">
                {volunteer?.name}
              </span>
              ? <br />
              This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
