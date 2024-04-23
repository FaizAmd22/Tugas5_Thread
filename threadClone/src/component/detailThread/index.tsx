import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import DetailThreadCards from "./components/DetailThreadCards";
import { useDetailThreadHooks } from "../../hooks/detailThread";
import {
  selectIsFetchDetail,
  setIsFetchDetail,
} from "../../slices/detailThreadSlice";
import { useDispatch, useSelector } from "react-redux";
import loading from "../../assets/loading1.gif"

const DetailThread = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("token");
  const { fetchDetail, fetchDetailAuth } = useDetailThreadHooks();
  const isFetch = useSelector(selectIsFetchDetail);
  const dispatch = useDispatch();
  console.log("isFetch :", isFetch);

  useEffect(() => {
    if (token) {
      fetchDetailAuth();
    } else {
      fetchDetail();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Box
      p="4"
      h={{ base: "78vh", md: "100vh" }}
      overflowY="auto"
      style={{ overflowY: "auto" }}
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
      <Button
        mt="5"
        mb="4"
        ml="-5"
        bg="none"
        color="white"
        fontSize="24px"
        fontWeight="semibold"
        transitionDuration="500ms"
        display={{ base: "none", md: "block" }}
        _hover={{ bg: "none", color: "green.500" }}
        onClick={() => window.history.back()}
      >
        <Flex alignItems="center" gap="2">
          <Box w="20%">
            <IoChevronBackOutline />
          </Box>
          Status
        </Flex>
      </Button>

      {isLoading ? (
        <Box w='100%' h='80%' display='flex' alignItems='center' justifyContent='center'>
          <Image src={loading} alt='loading' />
        </Box>
      ) : (
        <DetailThreadCards />
      )}
    </Box>
  );
};

export default DetailThread;
