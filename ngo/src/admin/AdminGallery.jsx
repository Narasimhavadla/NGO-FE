import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faUpload,
  faPlus,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminGalleryPage() {
  const [selectedCarousel, setSelectedCarousel] = useState("Events");

  // Dummy Carousel Data
  const carousels = [
    {
      id: 1,
      name: "Events",
      images: [
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
      ],
    },
    {
      id: 2,
      name: "Volunteers",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      ],
    },
    {
      id: 3,
      name: "Donations",
      images: [
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
        "https://images.unsplash.com/photo-1593113598332-cd59a93e9f0a?w=800",
      ],
    },
  ];

  const activeCarousel = carousels.find(
    (c) => c.name === selectedCarousel
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#254151]">
          Gallery Carousels
        </h1>

        <button className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1f3644] transition flex items-center justify-center gap-2 w-full md:w-auto">
          <FontAwesomeIcon icon={faPlus} />
          Create Carousel
        </button>
      </div>

      {/* STATS */}
     

      {/* CAROUSEL TABS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {carousels.map((carousel) => (
          <button
            key={carousel.id}
            onClick={() => setSelectedCarousel(carousel.name)}
            className={`px-4 py-2 rounded-lg border font-medium transition ${
              selectedCarousel === carousel.name
                ? "bg-[#254151] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {carousel.name}
          </button>
        ))}
      </div>

      {/* UPLOAD BUTTON */}
      <div className="mb-6">
        <button className="bg-[#F4CE50] text-[#254151] px-4 py-2 rounded-lg hover:bg-yellow-400 transition flex items-center gap-2">
          <FontAwesomeIcon icon={faUpload} />
          Add Image to {selectedCarousel}
        </button>
      </div>

      {/* IMAGES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeCarousel.images.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={img}
              alt="carousel"
              className="w-full h-48 object-cover"
            />

            <div className="p-3 flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
