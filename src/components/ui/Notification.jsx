export default function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`mb-3 rounded px-4 py-2 text-sm ${
        type === "error"
          ? "bg-red-500/20 text-red-400"
          : "bg-green-500/20 text-green-400"
      }`}
    >
      {message}
    </div>
  );
}