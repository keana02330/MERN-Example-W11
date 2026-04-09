import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';

const TaskList = ({ todos, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return <p className="text-center text-muted mt-3">No tasks yet. Add one above!</p>;
  }

  return (
    <ListGroup variant="flush">
      {todos.map((todo) => (
        <Task
          key={todo._id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ListGroup>
  );
};

export default TaskList;