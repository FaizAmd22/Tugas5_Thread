import { Box, Stack, Text, Flex, Center, Button, Image } from '@chakra-ui/react'
import datas from "../mocks/users.json"
import RecommendFollow from './RecommendFollow';
import CurrentProfile from './currentProfile';
import icon from '../assets/icon.png'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

const SideProfile = () => {
    const { name, bio, followers, following, picture, username } = datas[0]
    
    return (
        <Stack h='100vh' gap='3' p='3' py='5'
            style={{ overflowY: "auto" }} sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                    borderRadius: 'full',
                    backgroundColor: `none`,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `green.500`,
                }
            }}
        >
            <Box rounded='md' bg='#262626' p='4'>
                <CurrentProfile name={name} username={username} picture={picture} following={following} followers={followers} bio={bio} />
            </Box>

            <Box h='30vh' rounded='lg' p='4' bg='#262626'
                style={{ overflowY: "auto" }} sx={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        borderRadius: 'full',
                        backgroundColor: `none`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `green.500`,
                    }
                }}
            >
                {datas.map((data, index) => {
                    return (
                        <Box color='white' key={index} py='3'>
                            <RecommendFollow name={data.name} username={data.username} picture={data.picture} />
                        </Box>
                    )
                })}
            </Box>

            <Box color='white' rounded='lg' p='4' bg='#262626'>
                <Text>
                    <Flex>
                        <Center gap='2'>
                            Developed by <b>Faizhal Ahmad</b>
                            
                            <Text fontSize='13px'>
                                ●
                            </Text>

                            <Button fontSize='20px' p='0' bg='none' color='white' _hover={{bg: "none", color: "green.500"}}>
                                <FaGithub />
                            </Button>
                            <Button fontSize='20px' p='0' bg='none' color='white' _hover={{bg: "none", color: "green.500"}}>
                                <FaLinkedin />
                            </Button>
                            <Button fontSize='20px' p='0' bg='none' color='white' _hover={{bg: "none", color: "green.500"}}>
                                <FaFacebook />
                            </Button>
                            <Button fontSize='20px' p='0' bg='none' color='white' _hover={{bg: "none", color: "green.500"}}>
                                <PiInstagramLogoFill />
                            </Button>
                        </Center>
                    </Flex>
                </Text>

                <Text>
                    <Flex>
                        <Center gap='2' color='gray.500'>
                            Powered by Dumbways Indonesia

                            <Image src={icon} w='30px' />
                            <Text fontSize='13px'>
                                ●
                            </Text>

                            #1CodingBootcamp
                        </Center>
                    </Flex>
                </Text>
            </Box>
        </Stack>
    );
}

export default SideProfile;