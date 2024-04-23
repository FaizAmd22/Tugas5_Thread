import { Text, Stack, Input, Button, Link, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { API } from "../../libs/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log("data change :", formData);

  const handleSubmit = async () => {
    try {
      setError("");
      const response = await API.post("/register", formData);
      const token = response.data.token;
      const userId = response.data.user.id;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", userId);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast({
        position: "top",
        title: "Register Success!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      // window.location.assign("/");
      navigate("/");

      // console.log('response :', response.data)
    } catch (error) {
      // if (!formData.username && !formData.password && !formData.fullname) {
      //   setError("Data can't be empty!");
      // } else if (!formData.password) {
      //   setError("Password can't be empty");
      // } else if (!formData.username) {
      //   setError("Username can't be empty!");
      // } else if (!formData.fullname) {
      //   setError("Fullname can't be empty!");
      // }

      setError(error.response?.data.message);
    }
  };

  return (
    <Stack w="100vw" h="100vh" bg="#1D1D1D">
      <Stack
        w={{ base: "90%", md: "40%" }}
        p="4"
        pb="0"
        color="white"
        margin="auto"
      >
        <Link
          href="/"
          fontSize="5xl"
          color="green.500"
          fontWeight="semibold"
          _hover={{ textDecoration: "none" }}
        >
          Dots.
        </Link>

        <Text
          pb="4"
          fontSize="3xl"
          fontWeight="semibold"
          display={{ base: "none", md: "block" }}
        >
          Create account Dots.
        </Text>

        <Stack spacing={3}>
          <Input
            type="text"
            name="fullname"
            placeholder="Fullname"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Stack>

        <Button
          mt="7"
          color="white"
          rounded="full"
          bg="green.500"
          textAlign="center"
          _hover={{ color: "green.500", bg: "white" }}
          onClick={handleSubmit}
        >
          Create
        </Button>

        {error && <Text color="red.500">{error}</Text>}

        <Text py="2">
          Already have account?
          <Link
            px="2"
            color="green.500"
            _hover={{ color: "white" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Link>
        </Text>

        <Link
          mt="5"
          py="2"
          bg="red.500"
          rounded="full"
          textAlign="center"
          fontWeight="semibold"
          _hover={{ color: "red.500", bg: "white", textDecoration: "none" }}
          onClick={() => navigate("/")}
        >
          <Text>Back To Home</Text>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Register;
