import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {
state = {
  allTasksSelected: false,
}

handleTogglerAll = () => {
  this.setState(prev => ({
    allTasksSelected: !prev.allTasksSelected,
  }));
}

render() {
  const { todosList, handleTaskRemover } = this.props;
  const { allTasksSelected } = this.state;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={() => this.handleTogglerAll()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todosList.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            allTasksSelected={allTasksSelected}
            handleTaskRemover={handleTaskRemover}
          />
        ))}
      </ul>
    </section>
  );
}
}
/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-2" />
          <label htmlFor="todo-2">qwertyuio</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-3" />
          <label htmlFor="todo-3">zxcvbnm</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li> */

TodoList.propTypes = {
  todosList: PropTypes.arrayOf({
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  handleTaskRemover: PropTypes.func.isRequired,
};

export default TodoList;
