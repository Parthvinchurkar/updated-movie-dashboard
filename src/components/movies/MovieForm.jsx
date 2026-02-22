import { useEffect, useState } from "react";
import Notification from "../ui/Notification";

export default function MovieForm({ initialData, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setStatus(initialData.status || "Upcoming");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Movie title is required");
      setSuccess("");
      return;
    }

    onSubmit({
      id: initialData?.id || Date.now(),
      title,
      status,
    });

    setError("");
    setSuccess("Movie saved successfully");

    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Movie" : "Add Movie"}
      </h2>

      <Notification message={error} type="error" />
      <Notification message={success} type="success" />

      {/* Movie Title */}
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-dark-700 text-white placeholder-gray-400 outline-none"
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 rounded bg-dark-700 text-white outline-none"
      >
        <option value="Upcoming">Upcoming</option>
        <option value="Running">Running</option>
        <option value="Ended">Ended</option>
      </select>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 rounded"
        >
          Cancel
        </button>

        {/* ✅ SAVE BUTTON — COLOUR CSS HANDLE KAREGA */}
        <button
          type="submit"
          className="px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}