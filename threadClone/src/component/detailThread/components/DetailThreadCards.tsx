import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Center,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  selectDetailThread,
  setIsFetchDetail,
} from "../../../slices/detailThreadSlice";
import { useProfileThreadHooks } from "../../../hooks/profileThread";
import Dropdown from "../../../features/Dropdown";
import Liked from "../../../features/Liked";
import CreatePost from "../../../features/CreatePost";
import ReplyCards from "../../reply/ReplyCards";
import { useProfileHooks } from "../../../hooks/profile";

const DetailThreadCards = () => {
  // const [data, setData] = useState<any>({});
  const data = useSelector(selectDetailThread);
  const formatedDate = new Date(data.created_at);
  const date = formatedDate.toDateString();
  const token = sessionStorage.getItem("token");
  const { fetchProfile } = useProfileHooks();
  const { fetchProfileThread, fetchProfileThreadAuth } =
    useProfileThreadHooks();
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(setIsFetchDetail(true))
    fetchProfile();
    fetchProfileThread();
    fetchProfileThreadAuth();
  };

  console.log("datas di detailThreadCards:", data);

  // useEffect(() => {
  //   setData(datas);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // });

  // console.log("data :", data);

  return (
    <>
      {/* {isLoading ? (
        <Text color="white">Loading ...</Text>
      ) : ( */}
      <Box w="100%" color="white">
        <Box py="5">
          <Grid templateColumns="repeat(13, 1fr)">
            <GridItem w="50px" mr="2" color="white" borderRadius="full">
              <Avatar
                src={
                  data.author.picture
                    ? data.author.picture
                    : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
                }
                name={"testt"}
              />
            </GridItem>

            <GridItem colSpan="12">
              <Flex>
                <Flex gap="1" color="gray.500" flexDirection="column">
                  <NavLink
                    to={`/profile/${data.author.username}`}
                    onClick={handleClick}
                  >
                    <Text fontWeight="semibold" color="white">
                      {data.author.name}
                    </Text>
                  </NavLink>

                  <NavLink
                    to={`/profile/${data.author.username}`}
                    onClick={handleClick}
                  >
                    <Text
                      mt="-1"
                      textDecoration="underline"
                      _hover={{ color: "gray.200" }}
                    >
                      @{data.author.username}
                    </Text>
                  </NavLink>
                </Flex>

                <Spacer />

                <Dropdown id={data.id} type="threads" userId={data.author.id} />
              </Flex>
            </GridItem>
          </Grid>

          <Text fontSize="sm" mt="5">
            {data.content}
          </Text>

          <Image
            src={data.image ? data.image : ""}
            alt={data.name}
            py="4"
            maxW="100%"
          />

          <Text pb="4" color="gray.500" fontSize="sm">
            {date}
          </Text>

          <Flex gap="1">
            <Flex gap="2">
              <Liked
                liked={data.likes}
                id={data.id}
                isLiked={data.isLike}
                type="threads"
              />
            </Flex>

            <Text
              px="7"
              bg="none"
              fontSize="xl"
              color="gray.500"
              borderRadius="full"
              _hover={{ color: "gray.200" }}
            >
              <Flex>
                <Center gap="2">
                  <BiCommentDetail />

                  <Text fontSize="sm">{data.replies} Replies</Text>
                </Center>
              </Flex>
            </Text>
          </Flex>
        </Box>

        <Box py="5" borderTop="1px" borderColor="gray.600">
          {token && <CreatePost id={data.id} type="replies" />}
        </Box>

        {!token
          ? data.reply.map((replies, index) => {
              return (
                <ReplyCards reply={replies} index={index} type="replies" />
              );
            })
          : data.reply.data.map((replies, index) => {
              return <ReplyCards reply={replies} index={index} />;
            })}
      </Box>
      {/* )} */}
      {/* <Text>testtt</Text> */}
    </>
  );
};

export default DetailThreadCards;
