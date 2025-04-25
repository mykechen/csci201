import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("http://localhost:8080/api/hello");
    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl mb-4">Frontend ↔ Backend Test</h1>
      <button
        onClick={fetchMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Ping Backend
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}
