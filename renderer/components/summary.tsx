type Props = {
  todos_completed: number;
  total_todos: number;
};

const Summary = ({ todos_completed, total_todos }: Props) => {
  return (
    <section>
      <div>
        <p>Tasks complete</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}

export default Summary;
