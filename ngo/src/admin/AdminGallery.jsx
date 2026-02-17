import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify"

export default function AdminGalleryPage() {
  const api = import.meta.env.VITE_API_BASE_URL

  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("gallery");
  const [activeFilter, setActiveFilter] = useState("all");

  // 🗑️ DELETE MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ FETCH
  const fetchImages = async () => {
    const res = await axios.get(`${api}/gallery`);
    setImages(res.data.data);
    setFiltered(res.data.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ FILTER
  const handleFilter = (type) => {
    setActiveFilter(type);

    if (type === "all") {
      setFiltered(images);
    } else {
      setFiltered(
        images.filter((img) => img.category === type)
      );
    }
  };

  // ✅ UPLOAD
  const handleUpload = async () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    await axios.post(`${api}/gallery/upload`, formData);
    
    toast.success("Uploaded succesfully")
    setFile(null);
    fetchImages();
  };

  //  OPEN MODAL
  const openDeleteModal = (img) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  //  DELETE
  const confirmDelete = async () => {
    if (!selectedImage) return;

    await axios.delete(
      `${api}/gallery/${selectedImage.id}`
    );

    toast.success("Deleted succesfully")

    setShowModal(false);
    setSelectedImage(null);
    fetchImages();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        Gallery Manager
      </h1>

      {/* UPLOAD + FILTER */}
      <div className="flex flex-col gap-4 mb-6">

        {/* UPLOAD */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border px-3 py-2 rounded-lg w-full sm:w-auto"
          >
            <option value="gallery">
              Gallery View
            </option>
            <option value="carousel">
              Carousel
            </option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="border p-2 rounded-lg w-full sm:w-auto"
          />

          <button
            onClick={handleUpload}
            className="bg-[#254151] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FontAwesomeIcon icon={faUpload} />
            Upload
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2">

          {[
            { key: "all", label: "All" },
            {
              key: "gallery",
              label: "Gallery View",
            },
            {
              key: "carousel",
              label: "Carousel",
            },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() =>
                handleFilter(btn.key)
              }
              className={`px-4 py-2 rounded-lg border text-sm md:text-base ${
                activeFilter === btn.key
                  ? "bg-[#254151] text-white"
                  : "bg-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* IMAGES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-lg overflow-hidden bg-white border"
          >
            <img
              src={img.image}
              alt="gallery"
              className="w-full h-32 sm:h-36 md:h-40 object-cover"
            />

            {/* CATEGORY */}
            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {img.category}
            </span>

            {/* DELETE */}
            <button
              onClick={() =>
                openDeleteModal(img)
              }
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="sm"
              />
            </button>
          </div>
        ))}
      </div>

      {/* 🗑️ DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 relative animate-fadeIn">

            {/* CLOSE */}
            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-3 right-3 text-gray-500"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* IMAGE PREVIEW */}
            <img
              src={selectedImage?.image}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h2 className="text-lg font-semibold mb-2">
              Delete Image?
            </h2>

            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this
              image? This action cannot be undone.
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 justify-end">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
