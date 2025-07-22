"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodoList, createTodo, updateTodo, deleteTodo } from "@/lib/api";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
