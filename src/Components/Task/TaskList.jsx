import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask , fetchStatusTasks } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Box, Button, List, ListItem, Text, Spinner, Alert, AlertIcon, HStack, Select } from "@chakra-ui/react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null); // Track which task is being deleted
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0 (0-based pagination)
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [sortBy, setSortBy] = useState("title"); // Default sorting by title
  const [sortDir, setSortDir] = useState("asc"); // Default sorting direction (ascending)
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setLoading(true);
    setError(null);

 

    // Fetch tasks with dynamic sorting
    fetchTasks({ pageNumber: currentPage, pageSize: 5, sortBy, sortDir })
      .then((response) => {
        setTasks(response.data.content);
        setTotalPages(response.data.totalPages); // Set total pages from response
      })
      .catch((err) => {
        setError("Error fetching tasks.");
        setTasks([]); // Clear tasks if there's an error
      });

    // Fetch users
    axios.get("http://localhost:8080/api/users/") // Adjust the API endpoint as necessary
      .then((response) => setUsers(response.data))
      .catch(() => setError("Error fetching users."))
      .finally(() => setLoading(false));

  }, [currentPage, sortBy, sortDir]); // Fetch tasks when the currentPage, sortBy, or sortDir changes

  useEffect(() => {
    if (selectedStatus) {
    //   setFilteredTasks(tasks.filter((task) => task.status === selectedStatus));
    fetchStatusTasks({status:selectedStatus})
    .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((err) => {
        setError("Error fetching tasks.");
        setTasks([]); // Clear tasks if there's an error
      });
    } else {
      setFilteredTasks(tasks); // If no status is selected, show all tasks
    }
  }, [tasks, selectedStatus]);

  const handleDelete = (id) => {
    setDeleting(id); // Set the task ID that's being deleted
    deleteTask(id)
      .then(() => {
        // Optimistic UI update
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        setDeleting(null);
      })
      .catch(() => {
        setError("Error deleting task.");
        setDeleting(null); // Reset deleting state on error
      });
  };

  const handleUpdate = (id) => {
    // Navigate to the Update Task page, passing the task ID
    console.log("Navigating to update task with ID:", id);
    navigate(`/tasks/update/${id}`);
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Not Assigned";
  };
  const getTimeZone = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.timezone}` : "Not Assigned";
  };


  // Pagination handler functions
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1); // Move to the next page (0-based)
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move to the previous page (0-based)
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page); // Set page based on user click
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update sorting field
  };

  const handleSortDirectionChange = () => {
    setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc")); // Toggle sorting direction
  };

  if (loading) return <Spinner size="xl" />; // Display a loading spinner

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Task List</Text>
      
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Sorting Controls */}
      <HStack spacing={4} mb={4}>
        <Select value={sortBy} onChange={handleSortChange} width="200px">
          <option value="title">Title</option>
          <option value="createdAt">Created At</option>
          <option value="updatedAt">Updated At</option>
        </Select>
        <Button onClick={handleSortDirectionChange}>
          Sort {sortDir === "asc" ? "Ascending" : "Descending"}
        </Button>
      <Select
          placeholder="Filter by Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          width="200px"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </Select>
      </HStack>

      <List spacing={4}>
  {filteredTasks.map((task) => (
    <ListItem
      key={task.id}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.50"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s ease-in-out"
    >
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={1}>
          {task.title}
        </Text>
        <Text fontSize="md" color={task.status === "Completed" ? "green.600" : "orange.600"}>
          Status: {task.status}
        </Text>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.600" mb={1}>
          <strong>Assigned To:</strong> {getUserName(task.assignedToId)}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={1}>
          <strong>User Timezone:</strong> {getTimeZone(task.assignedToId)}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={1}>
          <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
        </Text>
      </Box>
      <Box mt={4} textAlign="right">
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => handleDelete(task.id)}
          isLoading={deleting === task.id}
          loadingText="Deleting..."
          mr={3}
        >
          Delete
        </Button>
        <Button colorScheme="blue" size="sm" onClick={() => handleUpdate(task.id)}>
          Update
        </Button>
      </Box>
    </ListItem>
  ))}
</List>


      {/* Pagination Controls */}
      <HStack spacing={4} mt={4} justify="center">
        <Button onClick={handlePrevious} isDisabled={currentPage === 0}>
          Previous
        </Button>
        <Text>{`Page ${currentPage + 1} of ${totalPages}`}</Text>{/* Display current page 1-based */}
        <Button onClick={handleNext} isDisabled={currentPage === totalPages - 1}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default TaskList;