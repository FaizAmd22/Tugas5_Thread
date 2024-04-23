import {
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Stack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItems from "../../../component/ThreadCard";
import { useProfileThreadHooks } from "../../../hooks/profileThread";
import { IThreads, ThreadInterface } from "../../../interfaces/ThreadInterface";
import { useParams } from "react-router-dom";
import { API } from "../../../libs/axios";
import { selectProfile } from "../../../slices/profileSlice";
import {
  addProfileThread,
  selectProfileThread,
} from "../../../slices/profileThreadSlice";
import {
  selectIsFetchDetail,
  setIsFetchDetail,
} from "../../../slices/detailThreadSlice";
import ThreadCard from "../../../component/ThreadCard";
import { LoadingThread } from "../../../component/LoadingCard";

const ThreadProfileCards = () => {
  const { username } = useParams();
  const profileThreads = useSelector(selectProfileThread);
  const token = sessionStorage.getItem("token");
  const { fetchProfileThread, fetchProfileThreadAuth } =
    useProfileThreadHooks();
  const isFetch = useSelector(selectIsFetchDetail);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  console.log("filtered :", profileThreads);

  useEffect(() => {
    // if (token) {
    //   fetchProfileThreadAuth();
    // } else {
    //   fetchProfileThread();
    // }

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500);
    const fetchData = async () => {
      if (token) {
        await fetchProfileThreadAuth()
      } else {
        await fetchProfileThread();
      }
      setIsLoading(false);
    };
    fetchData();
  }, [username]);

  return (
    <>
      {isLoading ? (
        <Stack
        gap="10"
        w="100%"
        m="auto"
        mt='50px'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingThread />
      </Stack>
      ) : (
        profileThreads.map((thread: IThreads, index: number) => {
          return (
            <ThreadCard
              key={index}
              thread={thread}
              index={index}
              type="threads"
            />
          );
        })
      )}
      ;
    </>
  );
  // return profileThreads.map((thread: IThreads, index: number) => {
  //   return (
  //     <CardItems
  //       key={index}
  //       thread={thread}
  //       index={index}
  //       type="threads"
  //     />
  //   );
  // })
  // return (
  //   <Text>testttt</Text>
  // )
};

export default ThreadProfileCards;
