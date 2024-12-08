import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskPage from "./Pages/TaskPage";
import UserPage from "./Pages/UserPage";
import HomePage from "./Pages/HomePage";
import UpdateTaskForm from './Components/Task/UpdateTaskForm.jsx';
import CreateUserForm from "./Components/User/CreateUserForm.jsx";
import UpdateUserForm from "./Components/User/UpdateUserForm.jsx";
import UserList from "./Components/User/UserList.jsx";
import Header from "./Components/Header.jsx";

const App = () => {
  return (
    <>
   
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/tasks/update/:id" element={<UpdateTaskForm />} />
        <Route path="/users/create" element={<CreateUserForm />} />
        <Route path="/users/update/:id" element={<UpdateUserForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
