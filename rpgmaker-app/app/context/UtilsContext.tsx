"use client";

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ITTodo } from '../lib/definitions';
import { usePathname } from 'next/navigation';

interface UtilsContextType {
  todos: ITTodo[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  addTodo: (todo: ITTodo) => Promise<void>;
  deleteTodo: (id: string) => void;
}

const UtilsContext = createContext<UtilsContextType | undefined>(undefined);

export const UtilsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<ITTodo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/content-back/api/tasks");
        setTodos(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const addTodo = async (todo: ITTodo) => {
    try {
      const response = await axios.post("http://localhost:8080/content-back/api/tasks", todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/content-back/api/tasks/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };

  return (
    <UtilsContext.Provider value={{
      todos,
      addTodo,
      deleteTodo,
      loading,
      setLoading,
    }}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsContext = () => {
  const context = useContext(UtilsContext);
  if (!context) {
    throw new Error('useUtilsContext must be used within a UtilsProvider');
  }
  return context;
};
