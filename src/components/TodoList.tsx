"use client";

import { useState } from "react";
import { useTodos, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodo";
import { Todo } from "@/types/types";

export default function TodoList() {
  const { data: todos } = useTodos();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const isChanged =
    todos?.find((todo: Todo) => todo.id === editingId)?.title !== newTitle;

  return (
    <ul className="space-y-3">
      {todos?.map((todo: Todo) => {
        const isEditing = todo.id === editingId;

        return (
          <>
            <div>
              <h2 className="text-2xl font-semibold text-center my-3">
                To Do List
              </h2>
            </div>
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border rounded-md hover:shadow-sm mx-4 my-4"
            >
              <label className="flex items-center flex-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateTodo.mutate({ ...todo, completed: !todo.completed })
                  }
                  className="mr-3 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />

                {isEditing ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </label>

              {isEditing ? (
                <div className="ml-3 flex space-x-2">
                  <button
                    onClick={() => {
                      if (!isChanged) return;
                      updateTodo.mutate({ ...todo, title: newTitle.trim() });
                      setEditingId(null);
                    }}
                    disabled={!isChanged}
                    className={`px-3 py-1 text-sm font-medium rounded ${
                      isChanged
                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        : "bg-green-300 text-white cursor-not-allowed"
                    }`}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {!todo.completed && (
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                        setNewTitle(todo.title);
                      }}
                      className="ml-3 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo.mutate(todo.id)}
                    className="ml-3 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
                    aria-label={`Delete todo ${todo.title}`}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}
