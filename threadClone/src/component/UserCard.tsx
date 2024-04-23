import {
  Spacer,
  Button,
  Flex,
  Grid,
  GridItem,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UsersInterface } from "../interfaces/UsersInterface";
import { API } from "../libs/axios";
import axios from "axios";
import { useSideProfileHooks } from "../hooks/sideProfile";
import { useProfileHooks } from "../hooks/profile";
import { useProfileThreadHooks } from "../hooks/profileThread";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsFetchDetail } from "../slices/detailThreadSlice";
import { useFollowHooks } from "../hooks/follow";
import { useSuggestionHooks } from "../hooks/suggestion";

const UserCard = (data: UsersInterface) => {
  // const [followed, setFollowed] = useState<boolean>(data.data.isFollow);
  const token = sessionStorage.getItem("token");
  const { fetchProfile } = useProfileHooks();
  const { fetchSuggestion } = useSuggestionHooks();
  const { fetchCurrentUser } = useSideProfileHooks();
  const { fetchProfileThreadAuth } = useProfileThreadHooks();
  const { fetchFollow, fetchFollower } = useFollowHooks();
  const dispatch = useDispatch();

  const handleClick = async () => {
    // dispatch(setIsFetchDetail(true))
    fetchProfile();
    // fetchProfileThread();
    fetchProfileThreadAuth();
    // sessionStorage.setItem("profileId", Number(data.data.id));
    console.log("data userCard :", data.data);
    sessionStorage.setItem("profile", JSON.stringify(data.data));
  };

  // console.log("followed :", followed);

  const handleFollow = async () => {
    if (!data.data.isFollow) {
      const response = await API.post(
        "/follow",
        {
          following: data.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setFollowed(true);
    } else {
      const response = await API.post(
        "/unfollow",
        {
          following: data.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setFollowed(false);
    }
    fetchCurrentUser();
    fetchFollow()
    fetchProfile()
    fetchSuggestion()
    // if (data.type == "suggestion" || data.type == "follower") {
    //   fetchFollow();
    // }
    // if (data.type == "following") fetchFollower();
    // if (data.type == "suggestion") fetchFollow();
    // if (data.type != "suggestion") fetchSuggestion();
    // if (data.type == "following" || data.type == "follower") fetchSuggestion();
  };

  // console.log("data.data UserCard :", data.data);

  return (
    <Grid templateColumns="repeat(11, 1fr)">
      {/* <Flex> */}
      <GridItem display="flex" alignItems="center">
        <Link to={`/profile/${data.data.username}`} onClick={handleClick}>
          <Avatar
            src={
              data.data.picture
                ? data.data.picture
                : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
            }
            alt={data.data.name}
            w={data.type == "suggestion" ? "45px" : "60px"}
            h={data.type == "suggestion" ? "45px" : "60px"}
          />
        </Link>
      </GridItem>

      <GridItem colSpan="6" my="auto" pl="2">
        <Flex flexDirection="column">
          <Link to={`/profile/${data.data.username}`} onClick={handleClick}>
            <Text fontSize={data.type == "suggestion" ? "sm" : "md"}>
              {data.data.name}
            </Text>
          </Link>

          <Link to={`/profile/${data.data.username}`} onClick={handleClick}>
            <Text
              color="gray.500"
              fontSize={data.type == "suggestion" ? "sm" : "md"}
              _hover={{ color: "white" }}
            >
              @{data.data.username}
            </Text>
          </Link>
        </Flex>
      </GridItem>

      <Spacer />

      <Button
        position="relative"
        px={data.type == "suggestion" ? "6" : "10"}
        bg="none"
        right="0"
        border="2px"
        fontSize={data.type == "suggestion" ? "xs" : "sm"}
        margin="auto"
        rounded="full"
        color={data.data.isFollow ? "gray.500" : "white"}
        borderColor={data.data.isFollow ? "gray.500" : "white"}
        _hover={{ bg: "none", color: "green.500", borderColor: "green.500" }}
        onClick={handleFollow}
      >
        {data.data.isFollow ? "Unfollow" : "Follow"}
      </Button>
      {/* </Flex> */}
    </Grid>
  );
};

export default UserCard;
