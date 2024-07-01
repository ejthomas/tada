import React, { Dispatch, SetStateAction } from "react";
import { ItemData } from "./todolist";

type Props = {
  setTodos: Dispatch<SetStateAction<ItemData[]>>;
};

const Form = ({ setTodos }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload on form submit
    event.preventDefault();

    // Get name of new todo from submitted form
    const value: string = event.currentTarget.todo.value;

    // Update app state with new todo
    setTodos((prevTodos: ItemData[]) => [
      ...prevTodos,
      { title: value, id: self.crypto.randomUUID(), is_completed: false},
    ]);

    // Reset form
    event.currentTarget.reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="What do you want to do next?"
        />
      </label>
      <button>
        <span className="visually-hidden">Submit</span>
        <svg>
          <path d="" />
        </svg>
      </button>
    </form>
  );
}

export default Form;
