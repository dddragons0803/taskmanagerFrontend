import React, { useState } from "react";
import UserList from "../Components/User/UserList";
import CreateUserForm from "../Components/User/CreateUserForm";

const UserPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUserCreated = () => {
    setRefresh(!refresh); // Toggle to refresh the user list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>
      <CreateUserForm onUserCreated={handleUserCreated} />
      <UserList refresh={refresh} />
    </div>
  );
};

export default UserPage;
