import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, Box, useToast } from "@chakra-ui/react";
import { updateTask } from "../../services/api"; // Importing the updateTask function
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const UpdateTaskForm = () => {
  const { id } = useParams(); // Get the taskId from the URL
  console.log(id)
  const navigate = useNavigate();
  const toast = useToast(); // Chakra toast for notifications

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    assignedUserId: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch task details by ID
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_BASE}/tasks/${id}`);
        console.log(response);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    // Fetch users for the 'assigned to' dropdown
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE}/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTask();
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateTask function instead of axios directly
      const response = await updateTask(id, task);
      console.log("Task updated successfully:", response.data);
      toast({
        title: "Task Updated",
        description: "The task has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/tasks"); // Redirect to tasks page after successful update
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "There was an error updating the task.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} boxShadow="lg" borderRadius="md" bg="white" maxW="500px" mx="auto">
      <Heading as="h2" size="lg" mb={4} textAlign="center">Update Task</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Assigned To</FormLabel>
            <Select
              name="assignedUserId"
              value={task.assignedUserId}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full" isLoading={false}>
            Update Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UpdateTaskForm;
