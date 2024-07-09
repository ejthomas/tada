import { Dispatch, SetStateAction } from "react";

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
  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? {...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  return (
    <li id={item?.id} className="todo_item" onClick={completeTodo}>
      <button className="todo_items_left">
        <svg fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
          <circle cx="10" cy="10" fillRule="nonzero" r="10" />
        </svg>
        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
      </button>
      <div className="todo_items_right">
        <button>
          <span className="visually-hidden">Edit</span>
          <svg>
            <path d="" />
          </svg>
        </button>
        <button>
          <span className="visually-hidden">Delete</span>
          <svg>
            <path d="" />
          </svg>
        </button>
      </div>
    </li>
  );
};

