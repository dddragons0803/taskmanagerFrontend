import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const HomePage = () => {
  return (
    
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      <Header />
      <h1>Welcome to the Task Manager</h1>
      
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <Link to="/tasks">Manage Tasks</Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link to="/users">Manage Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
