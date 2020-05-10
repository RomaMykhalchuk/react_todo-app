import React from 'react';
import TodoApp from './Components/TodoApp/TodoApp';
import TodoList from './Components/TodoList/TodoList';
import TodosFilter from './Components/TodosFilter/TodosFilter';

const todos = [
  {
    title: 'Clean a car',
    id: 1,
    completed: false,
  },
  {
    title: 'Go to the gym',
    id: 2,
    completed: false,
  },
];

class App extends React.Component {
  state = {
    todos: [...todos],
    filtrationType: '',
  }

  handleSubmit = (newTask) => {
    this.setState(prev => ({
      todos: [...prev.todos, newTask],
    }));
  }

  statusHandler = (taskId) => {
    this.setState(prev => ({
      todos: prev.todos.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    }));
  }

  filterSelector = (filterType) => {
    this.setState({ filtrationType: filterType });
  }

  filterByPattern = () => {
    switch (this.state.filtrationType) {
      case 'active':
        return this.state.todos.filter(task => !task.completed);

      case 'completed':
        return this.state.todos.filter(task => task.completed);

      default:
        return this.state.todos;
    }
  }

  activeTasksCounter = () => this.state.todos
    .filter(task => !task.completed).length

  handleTaskRemover = (taskId) => {
    this.setState(prev => ({
      todos: [...prev.todos].filter(task => +taskId !== task.id),
    }));
  }

  removeCheckedTasks = () => {
    this.setState(prev => ({
      todos: [...prev.todos].filter(task => !task.completed),
    }));
  }

  getClearButtonStatus = () => this.state.todos.some(task => task.completed)

  checkAllTasks = (clicks) => {
    if (clicks % 2 === 0) {
      this.setState(prev => ({
        todos: [...prev.todos].map(task => ({
          ...task,
          completed: false,
        })),
      }));
    } else {
      this.setState(prev => ({
        todos: [...prev.todos].map(task => ({
          ...task,
          completed: true,
        })),
      }));
    }
  }

  updateTask = (data, id) => {
    this.setState(prev => ({
      todos: prev.todos.map((task) => {
        if (task.id === +id) {
          return {
            ...task,
            title: data,
          };
        }

        return task;
      }),
    }));
  }

  render() {
    const tasksListLength = this.state.todos.length;

    return (
      <section className="todoapp">
        <TodoApp
          handleSubmit={this.handleSubmit}
        />
        {tasksListLength !== 0 && (
          <TodoList
            checkAllTasks={this.checkAllTasks}
            todosList={this.filterByPattern()}
            handleTaskRemover={this.handleTaskRemover}
            statusHandler={this.statusHandler}
            updateTask={this.updateTask}

          />
        )}
        {tasksListLength !== 0 && (
          <TodosFilter
            activeTasksCounter={this.activeTasksCounter}
            filterSelector={this.filterSelector}
            clearButtonStatus={this.getClearButtonStatus()}
            removeCheckedTasks={this.removeCheckedTasks}
          />
        ) }
      </section>
    );
  }
}

export default App;
