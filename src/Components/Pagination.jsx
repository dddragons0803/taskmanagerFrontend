import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <Box mt={4} textAlign="center">
      <HStack spacing={4}>
        <Button
          colorScheme="teal"
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <HStack spacing={2}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              isActive={currentPage === index + 1}
              variant={currentPage === index + 1 ? "solid" : "outline"}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
        <Button
          colorScheme="teal"
          onClick={handleNext}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
      <Text mt={2} color="gray.500">
        Page {currentPage} of {totalPages}
      </Text>
    </Box>
  );
};

export default Pagination;
