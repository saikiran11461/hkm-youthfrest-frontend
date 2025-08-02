import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Button,
  Flex,
  Avatar,
  useColorModeValue,
  Center,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import axios from "axios";
import Layout from "./component/Layout";

const EmptyState = () => (
  <Center py={12} flexDir="column">
    <Icon as={FaUserCheck} boxSize={16} color="gray.300" mb={3} />
    <Text fontSize="xl" fontWeight="semibold" color="gray.500">
      No attendees marked yet.
    </Text>
    <Text color="gray.400" mt={2}>
      When attendance is marked, you'll see the list here.
    </Text>
  </Center>
);

const AttendanceList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tableBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const evenRowBg = useColorModeValue("gray.50", "gray.700");
  const oddRowBg = "transparent";
  const rowHoverBg = useColorModeValue("teal.50", "teal.900");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("https://hkm-youtfrest-backend-razorpay-882278565284.asia-south1.run.app/users/attendance-list");
        setCandidates(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching attendance list:", err);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <Layout>
      <Box maxW="7xl" mx="auto"  mt={10} px={{ base: 2, md: 6 }}>
        <Flex justify="space-between" align="center" mb={6} flexDir={{ base: "column", md: "row" }}>
          <Heading size="lg" color="teal.700" mb={{ base: 3, md: 0 }}>
            Attendance List
          </Heading>
          <Button colorScheme="teal" variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Flex>
        <Box
          py={0}
          px={{ base: 0, md: 2 }}
          bg={tableBg}
          borderRadius="2xl"
          boxShadow="lg"
          border="1px solid"
          borderColor={borderColor}
          minH="300px"
          overflowX="auto"
        >
          {loading ? (
            <Center py={24}>
              <Spinner size="xl" color="teal.400" />
            </Center>
          ) : candidates.length === 0 ? (
            <EmptyState />
          ) : (
            <Table variant="simple" size="md">
              <Thead position="sticky" top={0} zIndex={1} bg={headerBg} boxShadow="sm">
                <Tr>
                  <Th>Name</Th>
                  <Th>Gender</Th>
                  <Th>College</Th>
                  <Th>WhatsApp</Th>
                  <Th>Payment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {candidates.map((candidate, idx) => (
                  <Tr
                    key={candidate._id}
                    _hover={{ bg: rowHoverBg }}
                    bg={idx % 2 === 0 ? evenRowBg : oddRowBg}
                    transition="background 0.2s"
                  >
                    <Td>
                      <Flex align="center">
                        <Avatar
                          size="sm"
                          name={candidate.name}
                          mr={2}
                          bg="teal.400"
                          color="white"
                          fontWeight="bold"
                        />
                        <chakra.span fontWeight="medium">{candidate.name}</chakra.span>
                      </Flex>
                    </Td>
                    <Td>{candidate.gender || <Text color="gray.400">–</Text>}</Td>
                    <Td>
                      <Text isTruncated maxW="170px">{candidate.college || <Text color="gray.400">–</Text>}</Text>
                    </Td>
                    <Td>
                      <Text fontFamily="mono" fontSize="sm">
                        {candidate.whatsappNumber}
                      </Text>
                    </Td>
                    <Td>
                      <Box
                        as="span"
                        px={3}
                        py={1}
                        borderRadius="lg"
                        color={candidate.paymentStatus === "Paid" ? "green.700" : "orange.600"}
                        bg={candidate.paymentStatus === "Paid" ? "green.100" : "orange.100"}
                        fontWeight="semibold"
                        fontSize="sm"
                      >
                        {candidate.paymentStatus}
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default AttendanceList;