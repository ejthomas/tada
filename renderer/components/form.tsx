import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setTodos: Dispatch<SetStateAction<ItemData[]>>;
};

export const Form = ({ setTodos }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload on form submit
    event.preventDefault();

    // Get name of new todo from submitted form
    const value: string = event.currentTarget.todo.value;

    // Update app state with new todo
    setTodos((prevTodos: ItemData[]) => [
      ...prevTodos,
      { title: value, id: crypto.randomUUID(), is_completed: false},
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
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
        >
          <path
            d="m11
               11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0
               .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414
               0
               .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </form>
  );
}
