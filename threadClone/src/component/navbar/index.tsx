import {
  Text,
  List,
  ListItem,
  Button,
  Flex,
  Center,
  Stack,
  Spacer,
  Link,
  useToast,
} from "@chakra-ui/react";
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import CreatePostModal from "../../features/CreatePostModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../../libs/axios";
import { useThreadsHooks } from "../../hooks/threads";
import { useProfileHooks } from "../../hooks/profile";
import { useDetailThreadHooks } from "../../hooks/detailThread";
import { useProfileThreadHooks } from "../../hooks/profileThread";

const Navbar = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const toast = useToast();
  const token = sessionStorage.getItem("token");
  const [selected, setSelected] = useState<string>("Home");
  const { fetchThread } = useThreadsHooks();
  const { fetchProfile } = useProfileHooks();
  const { fetchDetail } = useDetailThreadHooks();
  const { fetchProfileThread } = useProfileThreadHooks();
  // console.log("token :", token)
  // console.log("user :", user)

  const ListNavbar = [
    {
      name: "Home",
      path: "/",
      icon: <RiHome7Line />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <TbUserSearch />,
    },
    {
      name: "Follows",
      path: "/follows",
      icon: <LuHeart />,
    },
    {
      name: "Profile",
      path: `/profile/${user.username}`,
      icon: <HiOutlineUserCircle />,
    },
  ];

  const handleClick = (name: string, path: string) => {
    if (!token) {
      if (name == "Home") {
        navigate(path);
      } else {
        Swal.fire({
          title: "You need to login first!",
          text: "Do you wanna login?",
          background: "#2b2b2b",
          color: "white",
          showCancelButton: true,
          confirmButtonText: "Yes",
          reverseButtons: true,
        }).then((result: any) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } else {
      console.log("data user di navbar : ");

      navigate(path);
      setSelected(path);
      sessionStorage.setItem("profile", JSON.stringify(user));
    }
  };

  const handleLogout = async () => {
    const response = await API.delete("/logout");
    console.log("response logout :", response);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    delete axios.defaults.headers.common["Authorization"];
    fetchThread()
    fetchDetail()
    fetchProfile()
    fetchProfileThread()
    // navigate("/")
    // alert("Logout Success!")
    Swal.fire({
      title: "Logout Success!",
      icon: "success",
      background: "#2b2b2b",
      color: "white",
      confirmButtonText: "Okey",
    }).then(() => window.location.assign("/"));
  };

  return (
    <Stack
      h={{ base: "1vh", md: "100%" }}
      pt="1"
      px={{ base: "0", md: "10" }}
      pb="7"
    >
      <Stack>
        <Text
          px="3"
          pt="2"
          color="green.500"
          fontWeight="semibold"
          display={{ base: "none", xs: "block" }}
        >
          <Flex>
            <Text fontSize={{ base: "3xl", lg: "5xl" }}>Dots.</Text>

            <Spacer />

            {!token ? (
              <Link
                onClick={() => navigate("/login")}
                px="5"
                py="1"
                bg="none"
                fontSize="md"
                margin="auto"
                rounded="full"
                border="2px"
                borderColor="green.500"
                color="green.500"
                display={{ base: "block", md: "none" }}
                _hover={{
                  color: "green.500",
                  bg: "white",
                  borderColor: "white",
                }}
              >
                Login
              </Link>
            ) : (
              <Link
                px="5"
                py="1"
                bg="none"
                margin="auto"
                fontSize="md"
                rounded="full"
                color="white"
                border="2px"
                borderColor="white"
                display={{ base: "block", md: "none" }}
                _hover={{
                  color: "white",
                  bg: "green.500",
                  borderColor: "green.500",
                }}
                onClick={() => handleLogout()}
              >
                Logout
              </Link>
            )}
          </Flex>
        </Text>

        <List
          mt="3"
          pb="3"
          px="3"
          spacing={3}
          color="gray.300"
          display={{ base: "none", md: "block" }}
        >
          {ListNavbar.map((data, index) => {
            return (
              <ListItem
                w="100%"
                key={index}
                // color={data.path.includes(selected) && "gray.100"}
                _hover={{ color: "white", fontWeight: "semibold" }}
              >
                <Link
                  onClick={() => handleClick(data.name, data.path)}
                  _hover={{ TextDecoder: "none" }}
                >
                  <Flex>
                    <Center axis="both">
                      <Text
                        color={data.path == selected && "white"}
                        fontSize={{ base: "3xl", lg: "4xl" }}
                        mr="2"
                      >
                        {data.icon}
                      </Text>

                      <Text
                        color={data.path == selected && "white"}
                        fontWeight={
                          data.path == selected ? "semibold" : "normal"
                        }
                        fontSize="md"
                      >
                        {data.name}
                      </Text>
                    </Center>
                  </Flex>
                </Link>
              </ListItem>
            );
          })}
        </List>

        {token && <CreatePostModal />}
      </Stack>

      <Spacer />

      {!token ? (
        <Link
          onClick={() => navigate("/login")}
          w="100%"
          py="2"
          bg="none"
          color="green.500"
          fontSize="lg"
          border="2px"
          rounded="full"
          fontWeight="semibold"
          display={{ base: "none", md: "block" }}
          _hover={{ color: "green.500", borderColor: "white", bg: "white" }}
        >
          <Center gap="3">Login</Center>
        </Link>
      ) : (
        <Button
          bg="none"
          color="gray.400"
          _hover={{ color: "white", bg: "none" }}
          display={{ base: "none", md: "block" }}
          onClick={() => handleLogout()}
        >
          <Center gap="3">
            <CiLogout fontSize="30px" />
            <Text fontSize={{ base: "md", lg: "lg" }}>Logout</Text>
          </Center>
        </Button>
      )}
    </Stack>
  );
};

export default Navbar;
