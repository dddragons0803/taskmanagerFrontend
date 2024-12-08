import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon, Switch } from "@chakra-ui/react";
import axios from "axios";

const CreateUserForm = ({ onUserCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isActive, setIsActive] = useState(true); // default to active
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { firstName, lastName,  timezone, isActive };
      await axios.post("http://localhost:8080/api/users/", newUser);
      setFirstName("");
      setLastName("");
      setTimezone("");
      setIsActive(true); // Reset isActive to true
      onUserCreated(); // Notify parent to refresh the user list
    } catch (err) {
      setError("Error creating user.");
    }
  };

  return (
    <Box p={5} boxShadow="md" borderRadius="md" bg="white" w="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>Create New User</Heading>
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
          <Button colorScheme="teal" type="submit" width="full">Create User</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateUserForm;
