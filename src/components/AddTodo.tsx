"use client";
import { useState } from "react";
import { useAddTodo } from "@/hooks/useTodo";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const mutation = useAddTodo();

  const handleAddTodo = () => {
    if (title.trim() != "") {
      mutation.mutate({ title, completed: false });
      setTitle("");
    }
  };
  return (
    <div className="flex items-center gap-2 p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        Add Todo
      </button>
    </div>
  );
}
