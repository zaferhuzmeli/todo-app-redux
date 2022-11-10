import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, destroyTodo, selectFilteredTodos, fetchTodos } from "../store/slices/todosSlice";
import Error from "./Messages/Error";

function TodoList() {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroyTodo(id));
    }
  };

  if ( isLoading ) {
    return <div>Loading...</div>;
  }

  if ( error ) {
    return <Error message={error}/>
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              property="done"
              className="toggle"
              type="checkbox"
              onChange={() => dispatch(toggleTodo(item.id))}
              checked={item.completed}
            />
            <label property="text">{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
