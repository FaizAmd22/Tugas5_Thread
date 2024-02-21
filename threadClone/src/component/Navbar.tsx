import { Text, List, ListItem, Button, Flex, Center, Stack, Spacer, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import CreatePostModal from '../features/CreatePostModal';
import axios from "axios"


const ListNavbar = [
    {
        "name": "Home",
        "path": "/",
        "icon": <RiHome7Line />
    },
    {
        "name": "Search",
        "path": "/search",
        "icon": <TbUserSearch />
    },
    {
        "name": "Follows",
        "path": "/follows",
        "icon": <LuHeart />
    },
    {
        "name": "Profile",
        "path": "/profile",
        "icon": <HiOutlineUserCircle />
    }
]

const Navbar = () => {
    const token = sessionStorage.getItem("token")
    console.log("token :", token)

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
        window.location.assign("/");
    };

    return (
            <Stack h={{base: '1vh', md: '100%'}} pt='1' px={{base: '0', md: '10'}} pb='7'>
                <Stack>
                    <Text color='green.500' fontWeight='semibold' px='3' display={{ base: 'none', xs: 'block' }} pt={{base: '2'}}>
                        <Flex>
                            <Text fontSize={{ base: '3xl', md: '5xl' }}>
                                Circle
                            </Text>

                            <Spacer />

                            {!token ? (
                                <Link href='/login' fontSize='md' margin='auto' display={{ base: 'block', md: 'none' }} bg='none' color='green.500' border='2px' borderColor='green.500' px='5' py='1' rounded='full' _hover={{color: 'green.500', bg:'white', borderColor: 'white'}}>
                                    Login
                                </Link>
                            ) : (
                                <Link onClick={() => handleLogout()}  fontSize='md' margin='auto' display={{ base: 'block', md: 'none' }} bg='none' color='white' border='2px' borderColor='white' px='5' py='1' rounded='full' _hover={{color: 'white', bg:'green.500', borderColor: 'green.500'}}>
                                    Logout
                                </Link>
                            )
                            }
                        </Flex>
                    </Text>

                    <List spacing={3} color='gray.300' mt='3' pb='3' px='3' display={{ base: 'none', md: 'block'}}>
                        {ListNavbar.map((data, index) => {
                            return (
                            <ListItem w='100%' key={index} _hover={{ color: "white", fontWeight: 'semibold'}}>
                                <Link href={data.path} _hover={{TextDecoder: "none"}}>
                                    <Flex>
                                        <Center axis='both'>
                                            <Text fontSize='4xl' mr='2'>
                                                {data.icon}
                                            </Text>

                                            <Text>
                                                {data.name}
                                            </Text>
                                        </Center>
                                    </Flex>
                                </Link>
                            </ListItem>
                            )
                        })}
                    </List>

                    {token && <CreatePostModal />}
                </Stack>
                
                <Spacer />
                
                {!token ? (
                    <Link href='/login' w='100%' display={{ base: 'none', md: 'block'}} color='green.500' fontSize='lg' bg='none' fontWeight='semibold' border='2px' rounded='full' py='2' _hover={{ color: "green.500", borderColor:'white', bg: 'white' }}>
                        <Center gap='3'>
                            Login
                        </Center>
                    </Link>
                ) : (
                    <Button onClick={() => handleLogout()} bg='none' fontSize='xl' color='gray.400' _hover={{ color: "white", bg: 'none' }} display={{ base: 'none', md: 'block'}}>
                        <Center gap='3'>
                            <CiLogout fontSize='30px' />
                            Logout
                        </Center>
                    </Button>
                )
                }
            </Stack>
     );
}
 
export default Navbar;