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
import changeFormatDate from "../features/ChangeFormatDate";
import Dropdown from "../features/Dropdown";
import Liked from "../features/Liked";
import { ThreadInterface } from "../interfaces/ThreadInterface";
import { NavLink, Link } from "react-router-dom";
import { useProfileHooks } from "../hooks/profile";
import { useProfileThreadHooks } from "../hooks/profileThread";
import { useDispatch } from "react-redux";
import { setIsFetchDetail } from "../slices/detailThreadSlice";

const ThreadCard = (thread: ThreadInterface) => {
  const { fetchProfile } = useProfileHooks();
  const { fetchProfileThread, fetchProfileThreadAuth } =
    useProfileThreadHooks();
  const dispatch = useDispatch()
  // console.log("thread data :", thread.thread);
  

  const {author, content, created_at, id, image, isLike, likes, posted_at, likedPerson, replies} = thread.thread

  const handleClick = () => {
    // dispatch(setIsFetchDetail(true))
    fetchProfile();
    fetchProfileThread();
    fetchProfileThreadAuth();
    sessionStorage.setItem("profile", JSON.stringify(author));
  };

  return (
    <Box
      w="100%"
      color="white"
      borderTop="1px"
      py="5"
      borderColor="gray.600"
    >
      <Grid templateColumns="repeat(13, 1fr)">
        <GridItem w="50px" mr="2" color="white" borderRadius="full">
          <Link
            to={`/profile/${author.username}`}
            onClick={handleClick}
          >
            <Avatar
              src={
                author.picture
                  ? author.picture
                  : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
              }
              name={author.name}
            />
          </Link>
        </GridItem>

        <GridItem colSpan="12">
          <Flex alignItems="center" alignContent="center">
            <Box>
              <Flex gap="1" color="white" alignItems="center" h="22px">
                <Link
                  to={`/profile/${author.username}`}
                  onClick={handleClick}
                >
                  <Text fontWeight="semibold">{author.name}</Text>
                </Link>

                <Link
                  to={`/profile/${author.username}`}
                  onClick={handleClick}
                >
                  <Text
                    ml="1"
                    color="gray.500"
                    textDecoration="underline"
                    _hover={{ color: "gray.200" }}
                  >
                    @{author.username}
                  </Text>
                </Link>

                <Text ml="3" fontSize="sm" color="gray.500">
                  {changeFormatDate(created_at)}
                </Text>
              </Flex>
            </Box>

            <Spacer />

            <Dropdown id={id} type="threads" userId={author.id} />
          </Flex>

          <Link
            to={`/details/${id}`}
            _hover={{ textDecoration: "none" }}
          >
            <Box>
              <Text fontSize="sm" my="2" mb="4">
                {content}
              </Text>

              <Image
                src={!image ? "" : image}
                py={image && "4"}
                maxW="100%"
              />
            </Box>
          </Link>

          <Flex gap="1">
            <Flex gap="2">
              <Liked
                liked={likes}
                id={id}
                isLiked={isLike}
                likedPerson={likedPerson}
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
              <Link
                to={`/details/${id}`}
                _hover={{ textDecoration: "none" }}
              >
                <Flex>
                  <Center gap="2" fontSize="2xl">
                    <BiCommentDetail />

                    <Text fontSize="md">{replies} Replies</Text>
                  </Center>
                </Flex>
              </Link>
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
    //   <Text>testtt</Text>
  );
};

export default ThreadCard;
