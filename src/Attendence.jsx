import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputLeftAddon,
  Flex,
  Text,
  Icon,
  Fade, 
  Image,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const Attendence = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successName, setSuccessName] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    setError("");
    setSuccessName("");
    const trimmedPhone = phone.trim().replace(/\D/g, "");

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://hkm-youtfrest-backend-razorpay-882278565284.asia-south1.run.app/users/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: trimmedPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "already-marked") {
          toast({
            title: "Already Marked",
            description: data.message || "Attendance has already been marked.",
            status: "info",
            duration: 3500,
            isClosable: true,
          });
        } else {
          toast({
            title: "Attendance Marked!",
            description: `Marked for ${data.name}`,
            status: "success",
            duration: 3500,
            isClosable: true,
          });
          setSuccessName(data.name);
          setPhone("");
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Could not mark attendance",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Server error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={2}>
      <Box
        w="full"
        maxW="400px"
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        textAlign="center"
      >
        <Heading mb={2} size="lg" color="teal.600" fontWeight="bold">
          Mark Attendance
        </Heading>
        <Text mb={7} fontSize="md" color="gray.500">
          Enter your WhatsApp mobile number to mark your attendance.
        </Text>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="phone" fontWeight="medium">
              WhatsApp Number
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="+91" />
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile"
                value={phone}
                onChange={e => {
                  // allow only numbers
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) setPhone(val);
                }}
                maxLength={10}
                autoComplete="tel"
                bg="gray.100"
                fontWeight="medium"
                letterSpacing="wide"
                required
                isDisabled={loading}
              />
            </InputGroup>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button
            mt={6}
            colorScheme="teal"
            width="full"
            type="submit"
            isLoading={loading}
            loadingText="Marking..."
            disabled={loading || phone.length !== 10}
            fontWeight="bold"
            fontSize="lg"
            borderRadius="lg"
            boxShadow="md"
          >
            Mark Attendance
          </Button>
        </form>

        {/* Success Message/Fade-in illustration */}
        <Fade in={!!successName}>
          {successName && (
            <Box mt={8} textAlign="center">
              <Icon as={CheckCircleIcon} w={12} h={12} color="green.400" />
              <Text mt={3} fontSize="xl" fontWeight="bold" color="green.600">
                Attendance marked for
              </Text>
              <Text fontSize="2xl" fontWeight="extrabold" color="teal.700">
                {successName}
              </Text>
              <Image
                mt={2}
                mx="auto"
                src="https://cdn.dribbble.com/users/1615584/screenshots/4187826/check02.gif"
                alt="Success"
                boxSize="80px"
                borderRadius="full"
                objectFit="cover"
              />
            </Box>
          )}
        </Fade>
      </Box>
    </Flex>
  );
};

export default Attendence;