import React, { Dispatch, SetStateAction } from "react";

type TodoListProps = {
  todos: ItemData[];
  setTodos: Dispatch<SetStateAction<ItemData[]>>;
};

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos.map((item, index) => <TodoItem key={index} item={item} setTodos={setTodos} />)
      ) : (
        <p>No tasks left, great job!</p>
      )}
    </ol>
  );
}

export type ItemData = {
  id: string;
  is_completed: boolean;
  title: string;
};

type TodoItemProps = {
  key: number;
  item: ItemData;
  setTodos: Dispatch<SetStateAction<ItemData[]>>;
};

const TodoItem = ({ item, setTodos }: TodoItemProps) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const completeTodo = () => {
    setTodos((prevTodos: ItemData[]) =>
      prevTodos.map((todo: ItemData) =>
        todo.id === item.id
          ? {...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  const handleEdit = () => {
    setEditing(true);
  };
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Put cursor at end of current text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);
  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditing(false);
  };
  const handleInputBlur = () => {
    setEditing(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prevTodos: ItemData[]) => 
      prevTodos.map((todo: ItemData) =>
        todo.id === item.id ? { ...todo, title: event.target.value } : todo
      )
    );
  };
  const handleDelete = () => {
    setTodos((prevTodos: ItemData[]) => prevTodos.filter((todo: ItemData) => todo.id !== item.id));
  };
  return (
    <li id={item?.id} className="todo_item" onClick={completeTodo}>
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left">
            <svg 
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              stroke="#22C55E"
              fill={item.is_completed ? "#22C55E" : "#0d0d0d"}
            >
              <circle cx="12" cy="12" fillRule="nonzero" r="9.9" />
            </svg>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <p>Edit</p>
            </button>
            <button onClick={handleDelete}>
              <span className="visually-hidden">Delete</span>
              <p>Delete</p>
            </button>
          </div>
        </>
      )}
    </li>
  );
};

