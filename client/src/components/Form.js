import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../store/slices/todoSlice/services";
import Loading from "./Messages/Loading";

function Form() {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.isLoading);
  const errorMessage = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return;

    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        disabled={isLoading}
        property="newTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {isLoading && <Loading />}
    </form>
  );
}

export default Form;
