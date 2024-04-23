import { Flex, Image, Text, Grid, GridItem, Stack, Spacer, Button } from '@chakra-ui/react'
import { useState } from 'react';
import { FaCalendarDays } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import EditProfileModal from '../../../features/EditProfileModal';
import { useFollowHooks } from '../../../hooks/follow';
import { useProfileHooks } from '../../../hooks/profile';
import { useProfileThreadHooks } from '../../../hooks/profileThread';
import { useSideProfileHooks } from '../../../hooks/sideProfile';
import { useSuggestionHooks } from '../../../hooks/suggestion';
import { API } from '../../../libs/axios';
import { selectIsFetchProfile, selectProfile } from '../../../slices/profileSlice';
import { selectUser } from '../../../slices/userSlice';

const HeroProfile = () => {
    const user = useSelector(selectProfile)
    // const [followed, setFollowed] = useState(user.isFollow)
    const currentUser = useSelector(selectUser)
    const date = new Date(currentUser.created_at)
    const formatedDate = date.toDateString()
    const token = sessionStorage.getItem("token")
    // console.log("currentUser :", currentUser.id);
    console.log("user :", user);
    const profile = sessionStorage.getItem("profile")
    // console.log("profile :", profile);
    const { fetchProfile } = useProfileHooks();
    const {fetchSuggestion} = useSuggestionHooks()
    const { fetchCurrentUser } = useSideProfileHooks();
    
    const handleFollow = async () => {
        if (!user.isFollow) {
          const response = await API.post(
            "/follow",
            {
              following: user.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
        //   setFollowed(true);
        } else {
          const response = await API.post(
            "/unfollow",
            {
              following: user.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
        //   setFollowed(false);
        }

        await fetchCurrentUser()
        // await fetchFollow()
        await fetchProfile()
        await fetchSuggestion()
        // await fetchProfileThread()
        // await fetchProfileThreadAuth()
      };
    
    return ( 
        <Stack
            color='white'
            // borderBottom='2px'
            // borderColor='gray.700'
            pb='5'
        >
            <Image
                src={user.cover_photo ? user.cover_photo : 'https://i.pinimg.com/564x/70/38/f2/7038f235f718d1e43157fc5516a0aaa7.jpg'}
                h='350px'
                objectFit='cover'
                rounded='lg'
                mt='2'
            />
            
            <Grid templateColumns='repeat(4, 1fr)'>
                <GridItem
                    w='52'
                    h='52'
                    rounded='full'
                    bg='#1D1D1D'
                    ml='5'
                    mt='-100px'
                >
                    <Flex
                        w='100%'
                        h='100%'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Image
                            src={user.picture ? user.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'}
                            w='85%'
                            h='85%'
                            rounded='full'
                            objectFit="cover"
                        />
                    </Flex>
                </GridItem>

                <Spacer />
                <Spacer />

                {currentUser.id == user.id && (
                    <EditProfileModal />
                )}
            </Grid>

            <Flex gap='5'>
                <Text fontWeight='semibold' fontSize='3xl'>
                    {user.name}
                </Text>

                {(currentUser.id != user.id && token) && (
                    <Button
                        position='relative'
                        px='10'
                        ml='2'
                        bg='none'
                        right='0'
                        border='2px'
                        fontSize='sm'
                        margin='auto'
                        rounded='full'
                        color={user.isFollow ? "gray.500" : "white"}
                        borderColor={user.isFollow ? "gray.500" : "white"}
                        _hover={{ bg: "none", color: "green.500", borderColor: "green.500" }}
                        onClick={handleFollow}
                    >
                        {user.isFollow ? "Unfollow" : "Follow"}
                    </Button>
                )}

                <Spacer />
            </Flex>
            <Text color='gray.500' mt='-3'>
                @{user.username}
            </Text>

            <Flex alignItems='center' gap='2' color='gray.500'>
                <FaCalendarDays />
                <Text>
                    Joined {formatedDate}
                </Text>
            </Flex>

            <Flex gap='4'>
                <Flex gap='1'>
                    <Text>
                        {user.follower}
                    </Text>
                    <Text color='gray.500'>
                        Followers
                    </Text>
                </Flex>

                <Flex gap='1'>
                    <Text>
                        {user.following}
                    </Text>
                    <Text color='gray.500'>
                        Following
                    </Text>
                </Flex>
            </Flex>
        </Stack>
    );
}

export default HeroProfile;