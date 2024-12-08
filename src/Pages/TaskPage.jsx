import React, { useState } from "react";
import TaskList from "../Components/Task/TaskList";
import CreateTaskForm from "../Components/Task/CreateTaskForm";

const TaskPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    setRefresh(!refresh); // Toggle to refresh the task list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>
      <CreateTaskForm onTaskCreated={handleTaskCreated} />
      <TaskList refresh={refresh} />
    </div>
  );
};

export default TaskPage;
