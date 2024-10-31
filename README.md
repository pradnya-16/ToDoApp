# Todo List Application

This project is a web application that allows users to create and manage todo items in various lists. The application is structured with a React frontend and a .NET 8.0 backend. Users can create new todo lists, add items to lists, and view items with due dates highlighted in different colors based on urgency.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Features and Functionalities](#features-and-functionalities)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [API Documentation](#api-documentation)

---

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Bootstrap**: CSS framework for responsive design, used here with React-Bootstrap components.
- **React-Router**: Library to handle tabbed navigation within the application.

### Backend
- **.NET 8.0**: Used to build the Web API for the application.
- **ASP.NET Core Minimal API**: Provides lightweight endpoint handling for CRUD operations.
- **CORS**: Cross-Origin Resource Sharing, enabled to allow the frontend to communicate with the backend.

---

## Features and Functionalities

### Frontend Functionalities
1. **View Todo Lists**:
   - Lists are displayed in a tabbed format, allowing users to view all items or filter by list.
   - Items are color-coded based on urgency:
     - Red: Due within 2 days
     - Yellow: Due within 4 days
     - Green: Due within a week
     - Blue: Due in more than a week

2. **Add Todo Items and Lists**:
   - Users can add new lists and todo items to those lists.
   - Each item requires a title, description, due date, and associated list.

3. **Move Todo Items**:
   - Users can move items between lists via a dropdown.

4. **Interactive UI**:
   - Form submission, list and item creation, and item coloring based on due dates.
   
### Backend Functionalities
1. **GET /todos**: Retrieve all todo items or filter by list name.
2. **POST /todos**: Add a new todo item to the database.
3. **CORS Support**: Allows the frontend to fetch data from the backend server.

---

## Installation

### Prerequisites
- **Node.js and npm**: Download from [https://nodejs.org/](https://nodejs.org/) to install both.
- **.NET 8.0 SDK**: Install from [https://dotnet.microsoft.com/download/dotnet](https://dotnet.microsoft.com/download/dotnet).
- **Git** (optional, if you need to clone the repository): Download from [https://git-scm.com/](https://git-scm.com/).

### Cloning the Repository
To start, clone this repository to your local machine:
```bash
git clone https://github.com/username/assignment-4-pradnya-16.git
cd assignment-4-pradnya-16 bash
```

## Running the Project
1. ### Running the Backend (API)
- **Navigate to the Backend Folder:**
  ```bash
  cd backend/TodoApi
  ```
- **Install Dependencies (if needed):**
  **You may not need this, but if there are dependencies, run:**
  ```bash
    dotnet restore
  ```
- **Run the Backend:**
  ```bash
    dotnet run
  ```
- **Confirm the Backend is Running:**
    - Open your browser or Postman and go to http://localhost:5288/todos to test the endpoint.
    - Swagger documentation is available (if enabled) at http://localhost:5288/swagger.
2. ### Running the Frontend (React Application)
- **Navigate to the Frontend Folder:**
  ```bash
  cd frontend
  ```
- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Run the Frontend:**
  ```bash
  npm start
  ```
- **Access the Frontend:**
  - The React app should open automatically at http://localhost:3000. If not, open a browser and go to this URL.

## API Documentation
**Endpoints**
1. **GET /todos**
   - Retrieves all todo items or filters by list if the list query parameter is provided.
   - Example request:
     ```bash
     - GET http://localhost:5288/todos
     - GET http://localhost:5288/todos?list=Work
     ```

2. **POST /todos**
   - Adds a new todo item.
   - Required fields: title, description, dueDate, and list.
   - Example request (using curl):
     ```bash
     - curl -X POST http://localhost:5288/todos -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task description", "dueDate": "2024-11-01", "list": "Personal"}'
     ```
