import React from "react"
import Head from "next/head"
import Form from "@/renderer/components/form";
import Header from "@/renderer/components/header";
import Summary from "@/renderer/components/summary";
import { TodoList } from "@/renderer/components/todolist";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Ta-da!</title>
      </Head>
      <div className="wrapper">
        <Header />
        <Summary todos_completed={0} total_todos={0} />
        <Form />
        <TodoList todos={[]} />
      </div>
    </React.Fragment>
  );
};
