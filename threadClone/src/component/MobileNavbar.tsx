import { Box, Text, List, ListItem, Button, Flex, Center, Stack, Spacer, Link } from '@chakra-ui/react'
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";

const MobileNavbar = () => {
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

    return ( 
        <Center h='5vh' bg='#262626'>
            <Flex gap='20'>
                {ListNavbar.map((data, index) => {
                    return (
                        <Link href={data.path} fontSize='25px'>
                            {data.icon}
                        </Link>
                    )
                })}
            </Flex>
        </Center>
    );
}
 
export default MobileNavbar;