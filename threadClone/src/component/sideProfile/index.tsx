import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Copyright from "./components/Copyright";
import Suggestion from "./components/Suggestion";
import CurrentProfile from "./components/CurrentProfile";
import { useSideProfileHooks } from "../../hooks/sideProfile";
import { LoadingSideProfile } from "../LoadingCard";

const SideProfile = () => {
  const { fetchCurrentUser } = useSideProfileHooks();
  const token = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }

    // setTimeout(() => {
      setIsLoading(false);
    // }, 500);
  }, []);
  // console.log("data :", data);
  // console.log("filtered :", filtered);

  return (
    <Stack
      w={{ xl: "80%" }}
      h="100vh"
      gap="3"
      py="5"
      p="3"
      margin={{ xl: "auto" }}
      style={{ overflowY: "auto" }}
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
          borderRadius: "full",
          backgroundColor: `none`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `green.500`,
        },
      }}
    >
      {token && (
        <>
          <Box rounded="md" bg="#262626" p="4">
            {isLoading ? <LoadingSideProfile /> : <CurrentProfile />}
          </Box>

          <Text color="white" fontWeight="semibold" pl="2">
            Suggestion for you
          </Text>

          <Suggestion />
        </>
      )}

      <Copyright />
    </Stack>
  );
};

export default SideProfile;
