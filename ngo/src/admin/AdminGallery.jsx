import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
  ]);

  const handleDelete = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Gallery Images
        </h1>

        <button className="bg-[#254151] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1f3644] transition">
          <FontAwesomeIcon icon={faUpload} />
          Add Image
        </button>
      </div>

      {/* IMAGES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden bg-white border"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-40 md:h-48 object-cover"
            />

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
