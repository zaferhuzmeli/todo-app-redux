import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTodoAsync,
  destroyTodoAsync,
  fetchTodos,
} from "../store/slices/todoSlice/services";
import { selectFilteredTodos } from "../store/slices/todoSlice";
import Error from "./Messages/Error";

function TodoList() {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error message={error} />;
  }

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  const handleDestroyTodo = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(destroyTodoAsync(id));
    }
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              property="done"
              className="toggle"
              type="checkbox"
              onChange={() => handleToggle(item.id, !item.completed)}
              checked={item.completed}
            />
            <label property="text">{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroyTodo(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
