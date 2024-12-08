import React from "react";
import { Box, Button, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();



  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex>
        <Heading as="h1" size="lg">
          My Application
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button colorScheme="teal.100" variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button colorScheme="teal.100" variant="outline" onClick={() => navigate("/users")}>
            Users
          </Button>
          <Button colorScheme="teal.100" variant="outline" onClick={() => navigate("/tasks")}>
            Tasks
          </Button>
    
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
