import { useEffect, useState } from "react";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

export default function ProgramHighlights({ fallbackImages = [] }) {
  const [images, setImages] = useState([]);

  /* ================= FETCH ================= */

  const fetchCarousel = async () => {
    try {
      const res = await axios.get(`${api}/gallery`);

      const carouselImgs = res.data?.data
        ?.filter((img) => img.category === "carousel")
        ?.map((img) => img.image);

      if (carouselImgs && carouselImgs.length > 0) {
        setImages(carouselImgs);
      } else {
        setImages(fallbackImages);
      }
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setImages(fallbackImages);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, [fallbackImages]);

  /* ================= SPLIT LOGIC ================= */

  const splitImages = (arr) => {
    if (!arr || arr.length === 0) return [];

    if (arr.length <= 10) return [arr];

    const rows = 3;
    const base = Math.floor(arr.length / rows);
    const remainder = arr.length % rows;

    let result = [];
    let start = 0;

    for (let i = 0; i < rows; i++) {
      const extra = i < remainder ? 1 : 0;
      const end = start + base + extra;
      result.push(arr.slice(start, end));
      start = end;
    }

    return result;
  };

  const rows = splitImages(images);

  /* ================= UI ================= */

  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 bg-white overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#254151]">
          Program Highlights
        </h2>
        <p className="text-gray-600 mt-2">
          Glimpses from our initiatives
        </p>
      </div>

      {/* ROWS */}
      <div className="space-y-10">

        {rows.map((row, rowIndex) => {
          const isReverse = rowIndex % 2 === 1;

          return (
            <div key={rowIndex} className="overflow-hidden">

              <div
                className={`flex gap-6 px-6 ${
                  isReverse
                    ? "animate-scroll-reverse"
                    : "animate-scroll"
                }`}
              >
                {[...row, ...row].map((img, i) => (
                  <div
                    key={i}
                    className="min-w-[260px] h-[180px] md:min-w-[340px] md:h-[220px] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={img}
                      alt="highlight"
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                ))}
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}
