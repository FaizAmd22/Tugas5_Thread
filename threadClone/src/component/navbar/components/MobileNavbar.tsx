import { Flex, Center, Link, Text } from "@chakra-ui/react";
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
// import { Link } from "react-router-dom";

const MobileNavbar = () => {
  const user = useSelector(selectUser);
  const token = sessionStorage.getItem("token");
  const [selected, setSelected] = useState<string>("Home");
  const navigate = useNavigate();
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
        // window.location.assign(path);
        navigate(path);
        // console.log(true);
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
            // window.location.replace("/login");
            navigate("/login");
          }
        });
        // console.log(false);
      }
    } else {
      // window.location.assign(path);
      navigate(path);
      setSelected(path);
    }
  };

  return (
    <Center h="9vh" bg="#262626">
      <Flex gap="20">
        {ListNavbar.map((data, index) => {
          return (
            <Link
              key={index}
              fontSize="25px"
              onClick={() => handleClick(data.name, data.path)}
            >
              <Text color={selected == data.path ? "white" : "#767676"}>
                {data.icon}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </Center>
  );
};

export default MobileNavbar;
