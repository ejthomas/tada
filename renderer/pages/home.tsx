"use client";
import React from "react"
import Head from "next/head"
import { Form } from "@/renderer/components/form";
import Header from "@/renderer/components/header";
import Summary from "@/renderer/components/summary";
import { TodoList } from "@/renderer/components/todolist";

export default function HomePage() {
  const [todos, setTodos] = React.useState<ItemData[]>([]);
  const todos_completed: number = todos.filter(
    (item) => item.is_completed === true
  ).length;
  const total_todos: number = todos.length;

  // Load store data
  React.useEffect(() => {
    const loadData = async () => {
      const loadedTodos: ItemData[] = await window.electron.getStoreValue();
      console.log("Loaded data", loadedTodos);
      if (!loadedTodos) {
        return;
      }
      setTodos(loadedTodos);
    };
    loadData();
  }, []);

  // Write to store when todo data changes
  React.useEffect(() => {
    const writeData = async () => {
      await window.electron.setStoreValue(todos);
      console.log("Wrote data", todos);
    };
    writeData();
  }, [todos]);

  return (
    <React.Fragment>
      <Head>
        <title>Ta-da!</title>
      </Head>
      <div className="wrapper">
        <Header />
        <Summary todos_completed={todos_completed} total_todos={total_todos} />
        <Form setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos}/>
      </div>
    </React.Fragment>
  );
};
