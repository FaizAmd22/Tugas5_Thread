import { Text, List, ListItem, Button, Flex, Center, Stack, Spacer, Link } from '@chakra-ui/react'
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import CreatePostModal from '../../features/CreatePostModal';
import axios from "axios"
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { Navigate } from "react-router-dom";




const Navbar = () => {
    const user = useSelector(selectUser)
    const token = sessionStorage.getItem("token")
    // console.log("token :", token)
    // console.log("user :", user)

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
            "path": `/profile/${user.username}`,
            "icon": <HiOutlineUserCircle />
        }
    ]

    const handleClick = (name: string, path: string) => {
        if (!token) {
            if (name == "Home") {
                window.location.assign(path)
                // console.log(true);
            } else {
                Swal.fire({
                    title: "You need to login first!",
                    text: "Do you wanna login?",
                    background: "#2b2b2b",
                    color: "white",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/login")
                    }
                });
                // console.log(false);
            }
        } else {
            window.location.assign(path)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        delete axios.defaults.headers.common['Authorization'];
        window.location.assign("/");
    };

    return (
        <Stack
            h={{ base: '1vh', md: '100%' }}
            pt='1'
            px={{ base: '0', md: '10' }}
            pb='7'
        >  
            <Stack>
                <Text
                    px='3'
                    pt='2'
                    color='green.500'
                    fontWeight='semibold' 
                    display={{ base: 'none', xs: 'block' }}
                >
                    <Flex>
                        <Text fontSize={{ base: '3xl', md: '5xl' }}>
                            Circle
                        </Text>

                        <Spacer />

                        {!token ? (
                            <Link
                                href='/login'
                                px='5'
                                py='1'
                                bg='none'
                                fontSize='md'
                                margin='auto'
                                rounded='full'
                                border='2px'
                                borderColor='green.500'
                                color='green.500'
                                display={{ base: 'block', md: 'none' }}
                                _hover={{ color: 'green.500', bg: 'white', borderColor: 'white' }}
                            >
                                Login
                            </Link>
                        ) : (
                            <Link 
                                px='5' 
                                py='1' 
                                bg='none' 
                                margin='auto'
                                fontSize='md' 
                                rounded='full' 
                                color='white' 
                                border='2px' 
                                borderColor='white' 
                                display={{ base: 'block', md: 'none' }} 
                                _hover={{ color: 'white', bg: 'green.500', borderColor: 'green.500' }}
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </Link>
                        )}
                    </Flex>
                </Text>

                <List
                    mt='3'
                    pb='3'
                    px='3'
                    spacing={3}
                    color='gray.300'
                    display={{ base: 'none', md: 'block' }}
                >
                    {ListNavbar.map((data, index) => {
                        return (
                            <ListItem
                                w='100%'
                                key={index}
                                _hover={{ color: "white", fontWeight: 'semibold' }}
                            >
                                <Link
                                    onClick={() => handleClick(data.name, data.path)}
                                    _hover={{ TextDecoder: "none" }}
                                >
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
                <Link
                    href='/login'
                    w='100%'
                    py='2'
                    bg='none'
                    color='green.500'
                    fontSize='lg'
                    border='2px'
                    rounded='full'
                    fontWeight='semibold'
                    display={{ base: 'none', md: 'block' }}
                    _hover={{ color: "green.500", borderColor: 'white', bg: 'white' }}
                >
                    <Center gap='3'>
                        Login
                    </Center>
                </Link>
            ) : (
                <Button 
                    bg='none' 
                    fontSize='xl' 
                    color='gray.400' 
                    _hover={{ color: "white", bg: 'none' }} 
                    display={{ base: 'none', md: 'block'}}
                    onClick={() => handleLogout()} 
                >
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