import { Box, Stack, Text, Flex, Center, Link, Image, Avatar } from '@chakra-ui/react'
import datas from "../../mocks/users.json"
import CurrentProfile from './CurrentProfile';
import icon from '../../assets/icon.png'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { UsersInterface } from '../../interfaces/UsersInterface';
import { useEffect, useState } from 'react';
import axios from "axios"
import { API } from '../../libs/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import CardUser from '../CardUser';

const SideProfile = () => {
    const [data, setData] = useState<UsersInterface[]>([])
    const [filtered, setFiltered] = useState<UsersInterface[]>([])
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("id")
    const dispatch = useDispatch()
    dispatch(setUser(data))
    
    const fetchData = async () => {
        try {
            const response = await API.get(`/user/${userId}`)
            const datas = response.data.data
            console.log("datas :", datas);
            setData(datas)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchSuggestion = async () => {
        try {
            const response = await API.get('/users')
            console.log("response suggestion cuy:", response.data.data);
            const datas = response.data.data
            console.log("datas :", datas);
            

            const filtered = datas.filter((user) => user.id != userId).slice(0, 7)
            console.log("filtered :", filtered);
            setFiltered(filtered)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        fetchSuggestion()
        fetchData();
    }, [datas])
    
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
            {token && <>
                <Box rounded='md' bg='#262626' p='4'>
                    <CurrentProfile />
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
                    {filtered.map((data: UsersInterface, index: number) => {
                        return (
                            <Box color='white' key={index} py='3'>
                                <CardUser name={data.name} username={data.username} picture={data.picture} />
                            </Box>
                        )
                    })}
                </Box>
                </>
            }

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