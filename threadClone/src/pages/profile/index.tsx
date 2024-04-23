import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProfileHooks } from "../../hooks/profile";
import ThreadProfileCards from "./components/ThreadProfilleCards";
import HeroProfile from "./components/HeroProfile";
import { LoadingProfile } from "../../component/LoadingCard";
import { useSuggestionHooks } from "../../hooks/suggestion";

const Profile = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchProfile } = useProfileHooks();
  const {fetchSuggestion} = useSuggestionHooks()
  const token = sessionStorage.getItem("token");
  // const dispatch = useDispatch();
  // const isFetch = useSelector(selectIsFetchProfile);

  useEffect(() => {
    // if (token) {
    // dispatch(setProfile({}));

    setIsLoading(true);
    // fetchProfile();
    // fetchSuggestion()

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
    const fetchData = async () => {
      await fetchProfile()
      await fetchSuggestion()
      
      setIsLoading(false);
    };
    fetchData();
    // }
  }, [username]);

  return (
    <Box
      h={{ base: "74vh", md: "96vh" }}
      px="4"
      // py='0'
      mt='4'
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
      {isLoading ? (
        <Box h='90vh'>
          <Box mt='20px'>
            <LoadingProfile />
          </Box>
        </Box>
      // <Text>Loading....</Text>
      ) : (
        <>
          <HeroProfile />

          <ThreadProfileCards />
        </>
      )}
    </Box>
  );
};

export default Profile;
