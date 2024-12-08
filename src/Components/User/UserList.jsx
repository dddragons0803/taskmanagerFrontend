import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Text, Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Error fetching users."));
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/users/update/${userId}`);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>User List</Text>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.id} p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
            <Text fontSize="lg" fontWeight="semibold">
              {user.firstName} {user.lastName}
            </Text>
      
            <Text fontSize="sm" color="gray.500">{user.timezone}</Text>
            <Text fontSize="sm" color={user.isActive ? "green.500" : "red.500"}>
              {user.isActive ? "Active" : "Inactive"}
            </Text>
            <Box mt={2}>
              <Button
                colorScheme="blue"
                onClick={() => handleUpdate(user.id)}
              >
                Update
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
