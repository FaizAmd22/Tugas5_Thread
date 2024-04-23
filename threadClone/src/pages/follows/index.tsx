import {
  Text,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Box,
  Button,
} from "@chakra-ui/react";
import datas from "../../mocks/users.json";
import { useState, useEffect } from "react";
import { IUsers, UsersInterface } from "../../interfaces/UsersInterface";
import CardUser from "../../component/UserCard";
import { API } from "../../libs/axios";
import {
  FollowerInterface,
  FollowingInterface,
} from "../../interfaces/FollowsInterface";
import UserCard from "../../component/UserCard";
import { useSelector } from "react-redux";
import { selectFollower, selectFollowing } from "../../slices/followSlice";
import { useFollowHooks } from "../../hooks/follow";
import { setIsFetchDetail } from "../../slices/detailThreadSlice";

const Follows = () => {
  // const [data, setData] = useState<UsersInterface[]>([])
  // const userId = sessionStorage.getItem("id");
  // const token = sessionStorage.getItem("token");
  // const [following, setFollowing] = useState<any>([]);
  // const [follower, setFollower] = useState<any>([]);
  const { fetchFollow } = useFollowHooks();
  const follower = useSelector(selectFollower);
  const following = useSelector(selectFollowing);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await API.get(`/follow/${userId}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log("response :", response.data);

    //   setFollower(response.data.follower);
    //   setFollowing(response.data.following);
    // };

    // fetchData();
    // setData(datas)
    fetchFollow();
  }, []);

  // console.log("data :", data)
  return (
    <Stack
      h={{ base: "78vh", md: "100vh" }}
      color="white"
      py={{ base: "0", md: "4" }}
      px="4"
    >
      <Text fontSize="2xl" pt={{ base: "0", md: "4" }} fontWeight="semibold">
        Follows
      </Text>

      <Tabs isFitted variant="unstyled">
        <TabList>
          <Tab>
            <Button
              w="100%"
              bg="none"
              color="white"
              _hover={{ bg: "none" }}
              onClick={() => fetchFollow()}
            >
              Followers
            </Button>
          </Tab>
          <Tab>
            <Button
              w="100%"
              bg="none"
              color="white"
              _hover={{ bg: "none" }}
              onClick={() => fetchFollow()}
            >
              Followings
            </Button>
          </Tab>
        </TabList>

        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel
            h={{ base: "68vh", md: "80vh" }}
            gap="5"
            mt="5"
            py="0"
            display="flex"
            flexDirection="column"
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "6px",
                backgroundColor: `none`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `green.500`,
                borderRadius: "3px",
              },
            }}
          >
            {follower.map((data: UsersInterface, index: number) => {
              return (
                <Box color="white" key={index}>
                  <UserCard data={data} type="follower" />
                </Box>
              );
            })}
            {/* <Text>Follower</Text> */}
          </TabPanel>

          <TabPanel
            h={{ base: "68vh", md: "80vh" }}
            gap="5"
            mt="5"
            py="0"
            display="flex"
            flexDirection="column"
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "6px",
                backgroundColor: `none`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `green.500`,
                borderRadius: "3px",
              },
            }}
          >
            {following.map((data: UsersInterface, index: number) => {
              return (
                <Box color="white" key={index}>
                  <UserCard data={data} type="following" />
                </Box>
              );
            })}
            {/* <Text>Following</Text> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Follows;
