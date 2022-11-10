import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, destroyTodo, selectFilteredTodos } from "../store/reducers/todosSlice";

function TodoList() {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroyTodo(id));
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
