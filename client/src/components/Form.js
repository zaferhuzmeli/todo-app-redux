import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/reducers/todosSlice";

function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    dispatch(addTodo({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        property="newTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default Form;
