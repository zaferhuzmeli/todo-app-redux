import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changedActiveFilter, clearCompleted , selectTodos, selectActiveFilter} from "../store/reducers/todosSlice";

function ContentFooter() {


  const dispatch = useDispatch();
  
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;

  const activeFilter = useSelector(selectActiveFilter);

  const handleFilter = (filter) => {
    dispatch(changedActiveFilter(filter));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong mv-value="todoLeft">{itemsLeft}</strong> item{itemsLeft > 1 ? 's' : ''} left
      </span>

      <ul className="filters">
        <li>
          <a className={activeFilter === 'all' ? 'selected' : ''} onClick={() => handleFilter('all')}>All</a>
        </li>
        <li>
          <a className={activeFilter === 'active' ? 'selected' : ''} onClick={() => handleFilter('active')}>Active</a>
        </li>
        <li>
          <a className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => handleFilter('completed')}>Completed</a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
