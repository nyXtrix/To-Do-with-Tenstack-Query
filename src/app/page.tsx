"use client";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div>
      <TodoList />
      <AddTodo />
    </div>
  );
}
