import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = `${import.meta.env.VITE_API_URL}/tips`;

export default function App() {
  const [tips, setTips] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTips();
  }, [search, category, page]);

  async function fetchTips() {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        search,
        category,
      });
      const res = await fetch(`${API_URL}?${params}`);
      const data = await res.json();
      setTips(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching tips:", err);
    } finally {
      setLoading(false);
    }
  }

  function categoryColor(cat) {
    switch (cat) {
      case "legal":
        return "border-l-4 border-red-500";
      case "financial":
        return "border-l-4 border-blue-500";
      case "health":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-400";
    }
  }

  function badgeColor(cat) {
    switch (cat) {
      case "legal":
        return "bg-red-100 text-red-600 border-red-300";
      case "financial":
        return "bg-blue-100 text-blue-600 border-blue-300";
      case "health":
        return "bg-green-100 text-green-600 border-green-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ⚠️ What Not To Do – India
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="legal">Legal</option>
          <option value="financial">Financial</option>
          <option value="health">Health</option>
        </select>
      </div>

      {/* Tips list in masonry style with animation */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {tips.map((tip, i) => (
              <motion.div
                key={tip._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`break-inside-avoid rounded-lg shadow-sm hover:shadow-md transition bg-white p-4 mb-4 ${categoryColor(
                  tip.category
                )}`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-lg">{tip.title}</h2>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium border ${badgeColor(
                      tip.category
                    )}`}
                  >
                    {tip.category}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{tip.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {tips.length === 0 && <p className="text-center">No tips found.</p>}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="font-medium">
          Page {page} / {Math.ceil(total / 10) || 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * 10 >= total}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
