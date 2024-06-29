import React from "react";

const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload on form submit
    event.preventDefault();

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
