import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieForm from "../components/movies/MovieForm";

const ITEMS_PER_PAGE = 5;

export default function MoviesTable() {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = movies
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((m) =>
      filter === "All" ? true : m.status === filter
    );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      {/* Top controls */}
      <div className="flex gap-2 mb-4">
        <input
          className="bg-dark-700 p-2 rounded"
          placeholder="Search movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-dark-700 p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Upcoming</option>
          <option>Running</option>
          <option>Ended</option>
        </select>

        <button
          className="bg-primary px-3 rounded"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Movie
        </button>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visible.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(m);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteMovie(m.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-3 flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-2 ${
              page === i + 1 ? "bg-primary" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔥 MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-dark-800 rounded-lg p-6 w-96">
            <MovieForm
              initialData={editing}
              onSubmit={editing ? updateMovie : addMovie}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}