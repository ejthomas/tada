type TodoListProps = {
  todos: ItemData[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos.map((item, index) => <TodoItem key={index} item={item} />)
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
};

const TodoItem = ({ item }: TodoItemProps) => {
  return (
    <li id={item?.id} className="todo_item">
      <button className="todo_done">
        <svg>
          <circle cx="10" cy="10" fillRule="nonzero" r="10" />
        </svg>
        <p>{item?.title}</p>
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

