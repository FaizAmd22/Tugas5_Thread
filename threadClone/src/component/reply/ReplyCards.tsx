import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import changeFormatDate from "../../features/ChangeFormatDate";
import Dropdown from "../../features/Dropdown";
import Liked from "../../features/Liked";
import { useProfileHooks } from "../../hooks/profile";
import { useProfileThreadHooks } from "../../hooks/profileThread";

const ReplyCards = (reply: any, index: number) => {
  // console.log("replies :", reply.reply);
  //   const [dataReply, setDataReply] = useState<any>([])
  //   const [isLoading, setIsLoading] = useState<boolean>(false)

  //   useEffect(() => {
  //     setIsLoading(true)
  //     setDataReply(reply)

  //     setTimeout(() => {
  //       setIsLoading(true)
  //     }, 1000);
  // })
  const { fetchProfile } = useProfileHooks();
  const { fetchProfileThread, fetchProfileThreadAuth } =
    useProfileThreadHooks();
  const handleClick = () => {
    // dispatch(setIsFetchDetail(true))
    fetchProfile();
    fetchProfileThread();
    fetchProfileThreadAuth();
  };

  return (
    <Box
      key={index}
      w="100%"
      py="5"
      color="white"
      borderTop="1px"
      borderColor="gray.600"
    >
      <Grid templateColumns="repeat(13, 1fr)">
        <Link
          to={`/profile/${reply.reply.author.username}`}
          onClick={handleClick}
        >
          <GridItem w="50px" mr="2" borderRadius="full" color="white">
            <Avatar
              src={
                reply.reply.author.picture
                  ? reply.reply.author.picture
                  : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
              }
              name={reply.reply.author.name}
            />
          </GridItem>
        </Link>

        <GridItem colSpan="12">
          <Flex alignItems="center" alignContent="center">
            <Box>
              <Flex gap="1" color="white" alignItems="center" h="22px">
                <Link
                  to={`/profile/${reply.reply.author.username}`}
                  onClick={handleClick}
                >
                  <Text fontWeight="semibold">{reply.reply.author.name}</Text>
                </Link>

                <Link
                  to={`/profile/${reply.reply.author.username}`}
                  onClick={handleClick}
                >
                  <Text
                    ml="1"
                    color="gray.500"
                    textDecoration="underline"
                    _hover={{ color: "gray.200" }}
                  >
                    @{reply.reply.author.username}
                  </Text>
                </Link>

                <Text ml="3" fontSize="sm" color="gray.500">
                  {changeFormatDate(reply.reply.created_at)}
                </Text>

                <Dropdown id={reply.reply.id} type="replies" userId={reply.reply.author.id} />
              </Flex>

              <Text fontSize="sm" mt="2" mb="4">
                {reply.reply.content}
              </Text>
            </Box>

            <Spacer />

            <Box pr={{ base: "2", md: "0", xl: "5" }}>
              <Liked
                liked={reply.reply.likes}
                id={reply.reply.id}
                isLiked={reply.reply.isLike}
                type="replies"
              />
            </Box>
          </Flex>
          <Box>
            <Image
              src={!reply.reply.image ? "" : reply.reply.image}
              maxW="100%"
              pt='2'
              pr={{ base: "4", md: "2", xl: "7" }}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ReplyCards;
