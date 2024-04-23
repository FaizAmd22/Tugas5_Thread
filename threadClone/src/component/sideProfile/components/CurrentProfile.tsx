import { Text, Box, Stack, Avatar, Grid, GridItem, Spacer, Button, Center, Flex, Image } from '@chakra-ui/react'
import { HiSparkles } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import EditProfileModal from '../../../features/EditProfileModal';

const CurrentProfile = () => {
    const user = useSelector(selectUser);

    // console.log("user di current:", user);
    const { name, username, bio, cover_photo, follower, following, picture } = user
    
    // console.log("following :", following);
    // console.log("follower :", follower);
    

    return (
        <Stack gap='2'>
            <Text
                color='white'
                fontWeight='semibold'
                fontSize='xl'
            >
                My Profile
            </Text>
            
            <Box w='100%' h='150px' rounded='lg'>
                <Image
                    src={cover_photo ? cover_photo : 'https://wallpapers.com/images/high/blue-gradient-background-gu71dwd19no9ra2v.webp'}
                    w='100%'
                    h='150px'
                    rounded='lg'
                    objectFit="cover"
                />
            </Box>

            <Grid templateColumns='repeat(5, 1fr)'>
                <Spacer />
                <GridItem
                    w='115px'
                    h='115px'
                    mt='-70px'
                    bg='#262626'
                    borderRadius='full'
                >
                    <Center w='115px' h='115px'>
                        <Avatar
                            src={picture ? picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'}
                            alt={name}
                            w='100px'
                            h='100px'
                            objectFit="cover"
                        />
                    </Center>
                </GridItem>

                <Spacer />
                <Spacer />

                <EditProfileModal />
            </Grid>

            <Stack gap='1'>
                <Flex color='white'>
                    <Center gap='2'>
                        <Text color='yellow'>
                            <HiSparkles />
                        </Text>

                        {name}

                        <Text color='yellow'>
                            <HiSparkles />
                        </Text>
                    </Center>
                </Flex>

                <Text color='gray.500' fontSize='sm'>
                    @{username}
                </Text>

                <Text color='white' my='2'>
                    {bio}
                </Text>

                <Flex gap='4' color='white'>
                    <Center gap='1'>
                        {follower}
                        
                        <Text color='gray.500'>
                            Followers
                        </Text>
                    </Center>

                    <Center gap='1'>
                        {following}

                        <Text color='gray.500'>
                            Following
                        </Text>
                    </Center>
                </Flex>
            </Stack>
        </Stack>
    );
}
 
export default CurrentProfile;
