const api = process.env.NEXT_PUBLIC_API;

export async function fetchTodoList() {
  const result = await fetch(`${api}/todos`);
  if (!result.ok) throw new Error("Fetch failed");
  return result.json();
}

export async function createTodo(todo: { title: string; completed: boolean }) {
  const result = await fetch(`${api}/todos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!result.ok) throw new Error("Create Error");
  return result.json();
}

export async function updateTodo(todo: {
  id: number;
  title: string;
  completed: boolean;
}) {
  const result = await fetch(`${api}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!result.ok) throw new Error("Update Error");
  return result.json();
}

export async function deleteTodo(id: number) {
  const result = await fetch(`${api}/todos/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) throw new Error("Delete Error");
  return result.json();
}
