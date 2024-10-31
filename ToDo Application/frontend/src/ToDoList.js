import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Form, Container, Row, Col, Tab, Nav, Dropdown } from 'react-bootstrap';
import "./ToDoList.css";

function TodoList() {
  const [todoLists, setTodoLists] = useState([{ name: 'All Items', todos: [] }]);

  // Fetch todos from the backend on initial load
  useEffect(() => {
    fetch("http://localhost:5288/todos")
      .then(response => response.json())
      .then(data => setTodoLists([{ name: 'All Items', todos: data }]));
  }, []);

  const getVariant = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 2) return 'danger';
    if (diffDays <= 4) return 'warning';
    if (diffDays <= 7) return 'success';
    return 'primary';
  };

  const addTodoList = (newListName) => {
    setTodoLists([...todoLists, { name: newListName, todos: [] }]);
  };

  const addTodo = (newTodo, listName) => {
    // Post new todo to the backend
    fetch("http://localhost:5288/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTodo, List: listName })
    })
    .then(response => response.json())
    .then(todo => {
      // Update local state after adding a new todo
      setTodoLists(todoLists.map(list => {
        if (list.name === listName || list.name === 'All Items') {
          return { ...list, todos: [...list.todos, todo] };
        } else {
          return list;
        }
      }));
    });
  };

  const moveTodo = (todoToMove, newListName) => {
    setTodoLists(todoLists.map(list => {
      if (list.name === 'All Items') {
        return { ...list, todos: todoLists.reduce((acc, currentList) => [...acc, ...currentList.todos], []) };
      } else if (list.name === newListName) {
        return { ...list, todos: [...list.todos, todoToMove] };
      } else if (list.todos.includes(todoToMove)) {
        return { ...list, todos: list.todos.filter(todo => todo !== todoToMove) };
      } else {
        return list;
      }
    }));
  };

  return (
    <Container className="p-3">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">Assignment 4: ToDo List</h1>
        </Col>
      </Row>
      <Row className="d-flex align-items-start">
        <Col md={4} className="form-container">
          <Form onSubmit={(e) => {
              e.preventDefault();
              addTodoList(e.target.elements[0].value);
              e.target.reset();
            }}>
            <Form.Group className="mb-3">
              <Form.Label>New List Name</Form.Label>
              <Form.Control type="text" required placeholder='Add new list' />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Add New List</Button>
          </Form>

          <Form onSubmit={(e) => {
                e.preventDefault();
                addTodo({
                  title: e.target.elements.title.value,
                  description: e.target.elements.description.value,
                  dueDate: e.target.elements.dueDate.value
                }, e.target.elements.list.value);
                e.target.reset();
              }}>
              <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control type="text" id="title" name="title" placeholder='Add todo item' required />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control as="textarea" rows={3} id="description" name="description" required />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="dueDate">Due Date</Form.Label>
                <Form.Control type="date" id="dueDate" name="dueDate" required />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="list">List</Form.Label>
                <Form.Control as="select" id="list" name="list" required>
                  {todoLists.map((list, index) => (
                    <option key={index} value={list.name}>{list.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Add Todo Item</Button>
          </Form>
        </Col>
        <Col md={8}>
          <Tab.Container id="list-tabs" defaultActiveKey="All Items">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {todoLists.map((list, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={list.name}>{list.name}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {todoLists.map((list, index) => (
                    <Tab.Pane eventKey={list.name} key={index}>
                      {list.todos.map((todo, index) => (
                        <ListGroup.Item key={index} variant={getVariant(todo.dueDate)}>
                          <h4 contentEditable>{todo.title}</h4>
                          <p contentEditable>{todo.description}</p>
                          <input type="date" defaultValue={todo.dueDate} className="p-2" />
                          <Dropdown onSelect={(newListName) => moveTodo(todo, newListName)} className="float-right">
                            <Dropdown.Toggle variant="success" id={`dropdown-basic${index}`}>
                              Move to...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {todoLists.map((list, listIndex) => (
                                <Dropdown.Item eventKey={list.name} key={listIndex}>{list.name}</Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </ListGroup.Item>
                      ))}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
