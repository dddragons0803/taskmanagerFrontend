import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon, Switch } from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get userId from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details for editing
    axios
      .get(`http://localhost:8080/api/users/${id}`)
      .then((response) => {
        const { firstName, lastName, timezone, isActive } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setTimezone(timezone);
        setIsActive(isActive);
      })
      .catch(() => setError("Error fetching user details"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { firstName, lastName,timezone, isActive };
      await axios.put(`http://localhost:8080/api/users/${id}`, updatedUser);
      navigate("/users"); // Navigate back to user list after update
    } catch (err) {
      setError("Error updating user.");
    }
  };

  return (
    <Box p={5} boxShadow="md" borderRadius="md" bg="white" w="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>Update User</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </FormControl>
     
          <FormControl id="timezone" isRequired>
            <FormLabel>Timezone</FormLabel>
            <Input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Enter timezone"
            />
          </FormControl>
          <FormControl id="isActive" display="flex" alignItems="center">
            <FormLabel>Active</FormLabel>
            <Switch
              isChecked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">Update User</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UpdateUserForm;
