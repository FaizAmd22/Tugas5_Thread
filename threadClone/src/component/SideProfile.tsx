import { Box, Stack, Text, Flex, Center, Link, Image, Avatar } from '@chakra-ui/react'
import datas from "../mocks/users.json"
import RecommendFollow from './RecommendFollow';
import CurrentProfile from './currentProfile';
import icon from '../assets/icon.png'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { UsersInterface } from '../interfaces/UsersInterface';
import { useEffect, useState } from 'react';

const SideProfile = () => {
    const [data, setData] = useState<UsersInterface[]>([])
    
    useEffect(() => {
        setData(datas)
    }, [])
    const { name, bio, followers, following, picture, username } = datas[0]

    console.log("data :", data)
    
    return (
        <Stack w={{xl: '80%'}} margin={{xl: 'auto'}} h='100vh' gap='3' p='3' py='5'
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

            <Text color='white' fontWeight='semibold' pl='2'>
                Suggestion for you
            </Text>
            <Box h='30vh' rounded='lg' px='4' bg='#262626'
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
                {data.map((data: UsersInterface, index: number) => {
                    return (
                        <Box color='white' key={index} py='3'>
                            <RecommendFollow name={data.name} username={data.username} picture={data.picture} />
                        </Box>
                    )
                })}
            </Box>

            <Box color='white' rounded='lg' p='4' bg='#262626' fontSize='12px'>
                
                <Flex mb='2'>
                    <Center>
                        <Text>
                            Developed by <b>Faizhal Ahmad</b>
                        
                            <Box pt='1'>
                                <Flex gap='3'>
                                    <Link target='_blank' href='https://github.com/' fontSize='lg' _hover={{color: 'green.500'}}>
                                        <FaGithub />
                                    </Link>
                                    <Link target='_blank' href='https://www.linkedin.com/' fontSize='lg' _hover={{color: 'green.500'}}>
                                        <FaLinkedin />
                                    </Link>
                                    <Link target='_blank' href='https://www.facebook.com' fontSize='lg' _hover={{color: 'green.500'}}>
                                        <FaFacebook />
                                    </Link>
                                    <Link target='_blank' href='http://instagram.com/' fontSize='lg' _hover={{color: 'green.500'}}>
                                        <PiInstagramLogoFill />
                                    </Link>
                                </Flex>
                            </Box>
                        </Text>
                    </Center>
                </Flex>

                <Text colSpan='5' color='gray.500'>
                    <Flex gap='2'>
                        Powered by Dumbways Indonesia
                        
                        <Image src={icon} w='20px' />
                    </Flex>

                    #1CodingBootcamp
                </Text>
            </Box>
        </Stack>
    );
}

export default SideProfile;