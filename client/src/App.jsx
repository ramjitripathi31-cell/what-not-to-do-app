import { useEffect, useState, useMemo } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/tips`;

export default function App() {
  const [tips, setTips] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // debounce search input
  const debouncedSearch = useMemo(() => {
    const handler = setTimeout(() => setPage(1), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchTips();
  }, [search, category, page]);

  async function fetchTips() {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit: 5,
      search,
      category,
    });
    const res = await fetch(`${API_URL}?${params}`);
    const data = await res.json();
    setTips(data.data);
    setTotal(data.total);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚠️ What Not To Do – India</h1>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="legal">Legal</option>
          <option value="financial">Financial</option>
          <option value="health">Health</option>
        </select>
      </div>

      {/* Tips list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {tips.map((tip) => (
            <li key={tip._id} className="border p-3 rounded shadow">
              <h2 className="font-semibold">{tip.title}</h2>
              <p className="text-gray-700">{tip.description}</p>
              <span className="text-sm text-gray-500">#{tip.category}</span>
            </li>
          ))}
          {tips.length === 0 && <p>No tips found.</p>}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / 5) || 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * 5 >= total}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
