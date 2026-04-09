import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const backendUrl = 'http://localhost:5050/api/todos';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(backendUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleAddTodo();
  };

  const handleToggleCompleted = async (id) => {
    try {
      const updatedTodo = { ...todos.find((todo) => todo._id === id) };
      updatedTodo.completed = !updatedTodo.completed;
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleEditTodo = async (id, newText) => {
    try {
      const updatedTodo = { ...todos.find((todo) => todo._id === id), text: newText };
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-wrapper">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="todo-card p-4">
              <h1 className="todo-title mb-1">My Todo List</h1>
              <p className="todo-subtitle mb-4">
                {remaining} task{remaining !== 1 ? 's' : ''} remaining
              </p>

              <InputGroup className="mb-4">
                <Form.Control
                  placeholder="Add a new task..."
                  value={newTodoText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="todo-input"
                />
                <Button variant="primary" onClick={handleAddTodo} className="add-btn">
                  Add
                </Button>
              </InputGroup>

              <TaskList
                todos={todos}
                onToggleCompleted={handleToggleCompleted}
                onDeleteTodo={handleDeleteTodo}
                onEditTodo={handleEditTodo}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;