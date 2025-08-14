// src/components/Sidebar.js
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  const role = localStorage.getItem("role");

  return (
    <Box
      width="250px"
      bg="gray.800"
      color="white"
      p="5"
      height="100vh"
      position="sticky"
      top="0"
    >
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        My Sidebar
      </Text>
      <VStack align="stretch" spacing="4">
        {role === "admin" && (
          <>
            <Box
              as={Link}
              to="/admin"
              _hover={{ bg: "gray.700" }}
              p="3"
              borderRadius="md"
              cursor="pointer"
            >
              All Candidates
            </Box>
            <Box
              as={Link}
              to="/admin/attendance"
              _hover={{ bg: "gray.700" }}
              p="3"
              borderRadius="md"
              cursor="pointer"
            >
              Attendance
            </Box>
            <Box
              as={Link}
              to="/admin/college"
              _hover={{ bg: "gray.700" }}
              p="3"
              borderRadius="md"
              cursor="pointer"
            >
              College
            </Box>
          </>
        )}
        {(role === "admin" || role === "user") && (
          <>
            <Box
              as={Link}
              to="/admin/AdminAttendanceScannedList"
              _hover={{ bg: "gray.700" }}
              p="3"
              borderRadius="md"
              cursor="pointer"
            >
              AdminAttendanceScannedList
            </Box>
            <Box
              as={Link}
              to="/admin/adminqrscanner"
              _hover={{ bg: "gray.700" }}
              p="3"
              borderRadius="md"
              cursor="pointer"
            >
              adminqrscanner
            </Box>
          </>
        )}
       
        <Button colorScheme="red" mt={8} onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
