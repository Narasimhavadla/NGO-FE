import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDeleteTeamModal({
  open,
  setOpen,
  selectedMember,
  refreshTeam,
}) {
  if (!open || !selectedMember) return null;

    const api = import.meta.env.VITE_API_BASE_URL

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${api}/team/${selectedMember.id}`
      );

      toast.success("Team member deleted successfully ");
      setOpen(false);
      refreshTeam(); // reload team list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete team member");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Delete Team Member
          </h2>

          {/* Content */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {selectedMember.name}
            </span>
            ?
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
