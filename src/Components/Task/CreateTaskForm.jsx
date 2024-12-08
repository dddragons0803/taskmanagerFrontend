import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Heading,
  VStack,
} from "@chakra-ui/react";

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assignedToId, setAssignedToId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users to populate the assignedToId dropdown
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        status,
        assignedToId: Number(assignedToId),
      };
      console.log("new task",newTask)
      await axios.post("http://localhost:8080/api/tasks/", newTask);
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setAssignedToId("");
      onTaskCreated();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box p={5} boxShadow="md" borderRadius="md" bg="white" w="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Create New Task
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              size="sm"
            />
          </FormControl>

          <FormControl id="status" isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>

          <FormControl id="assignedTo" isRequired>
            <FormLabel>Assign To</FormLabel>
            <Select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              placeholder="Select user"
            >
          
              {users.map((user) => (
               
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Create Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateTaskForm;
