import { Text, List, ListItem, Button, Flex, Center, Stack, Spacer, Link } from '@chakra-ui/react'
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

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
    return (
        <>
            <Stack h='100%' p='3' px='10' pb='7'>
                <Stack>
                    <Text color='green.500' fontWeight='semibold' fontSize='6xl' px='3'>
                        Circle
                    </Text>

                    <List spacing={3} color='gray.300' mt='3' pb='3' px='3'>
                        {ListNavbar.map((data, index) => {
                            return (
                            <ListItem as='Button' w='100%' key={index} _hover={{ color: "white", fontWeight: 'semibold'}}>
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

                    <Button bg='green.500' color='white' rounded='full' _hover={{ color: "green.500", bg: "white"}}>
                        Create Post
                    </Button>
                </Stack>

                <Spacer />
                
                <Button bg='none' fontSize='xl' color='gray.400' _hover={{ color: "white", bg: 'none' }}>
                    <Center gap='3'>
                        <CiLogout fontSize='30px' />
                        Logout
                    </Center>
                </Button>
            </Stack>
        </>
     );
}
 
export default Navbar;