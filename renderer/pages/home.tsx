"use client";
import React from "react"
import Head from "next/head"
import Form from "@/renderer/components/form";
import Header from "@/renderer/components/header";
import Summary from "@/renderer/components/summary";
import { TodoList, ItemData } from "@/renderer/components/todolist";

export default function HomePage() {
  const [todos, setTodos] = React.useState<ItemData[]>([
    { title: "Some task", id: crypto.randomUUID(), is_completed: false },
    {
      title: "Some other task",
      id: crypto.randomUUID(),
      is_completed: true,
    },
    { title: "last task", id: crypto.randomUUID(), is_completed: false },
  ]);
  const todos_completed: number = todos.filter(
    (item) => item.is_completed === true
  ).length;
  const total_todos: number = todos.length;
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
