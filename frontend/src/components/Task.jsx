import React, { useState } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

const Task = ({ todo, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEditTodo(todo._id, editText.trim());
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  };

  return (
    <ListGroup.Item
      className={`task-item ${todo.completed ? 'completed' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Row className="align-items-center">
        <Col xs="auto">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleCompleted(todo._id)}
            className="task-checkbox"
          />
        </Col>
        <Col>
          {editing ? (
            <input
              autoFocus
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={handleKeyDown}
              className="edit-input"
            />
          ) : (
            <span className={`task-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {todo.text}
            </span>
          )}
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <button
            onClick={() => { setEditing(true); setEditText(todo.text); }}
            className="icon-btn"
            style={{ opacity: hovered && !editing ? 1 : 0 }}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDeleteTodo(todo._id)}
            className="icon-btn"
            style={{ opacity: hovered && !editing ? 1 : 0 }}
            title="Delete task"
          >
            🗑️
          </button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Task;