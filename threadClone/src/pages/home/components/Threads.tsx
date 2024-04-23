import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingThread } from "../../../component/LoadingCard";
import ThreadCard from "../../../component/ThreadCard";
import { useThreadsHooks } from "../../../hooks/threads";
import { ThreadInterface } from "../../../interfaces/ThreadInterface";
import { selectThread } from "../../../slices/threadSlice";
import ThreadCards from "./ThreadCards";

const Threads = () => {
  const { fetchThread, fetchThreadAuth } = useThreadsHooks();
  const token = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loopingLoading = [1, 2, 3, 4];
  const datas = useSelector(selectThread);

  // console.log("datas di thread :", datas);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (token) {
        await fetchThreadAuth();
      } else {
        await fetchThread();
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Stack
      h="80vh"
      my="5"
      overflowY="auto"
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
      {isLoading ? (
        <Stack
          gap="10"
          w="100%"
          h="100vh"
          m="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loopingLoading.map((_, index: number) => {
            return <LoadingThread key={index} />;
          })}
        </Stack>
      ) : (
        datas.map((thread: ThreadInterface, index: number) => {
          return <ThreadCard key={index} thread={thread} />;
        })
      )}
    </Stack>
  );
};

export default Threads;
