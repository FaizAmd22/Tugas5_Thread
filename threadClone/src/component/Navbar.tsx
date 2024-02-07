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
            <Stack h={{base: '5vh', md: '100%'}} pt='1' px={{base: '0', md: '10'}} pb='7'>
                <Stack>
                    <Text color='green.500' fontWeight='semibold' fontSize={{ base: '2xl', md: '5xl' }} px='3' display={{ base: 'none', xs: 'block' }} pt={{base: '2'}}>
                        <Flex>
                            Circle

                            <Spacer />

                            <Button display={{ base: 'block', md: 'none' }} bg='none' color='white' border='2px' borderColor='white' rounded='full' _hover={{bg:'none', color: 'green.500', borderColor: 'green.500'}}>
                                Logout
                            </Button>
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

                    <Button bg='green.500' color='white' rounded='full' _hover={{ color: "green.500", bg: "white"}} display={{ base: 'none', md: 'block'}}>
                        Create Post
                    </Button>
                </Stack>

                <Spacer />
                
                <Button bg='none' fontSize='xl' color='gray.400' _hover={{ color: "white", bg: 'none' }} display={{ base: 'none', md: 'block'}}>
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