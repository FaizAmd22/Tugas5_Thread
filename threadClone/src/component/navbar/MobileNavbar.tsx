import { Flex, Center,Link } from '@chakra-ui/react'
import { RiHome7Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

const MobileNavbar = () => {
    const user = useSelector(selectUser)
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
    
    return ( 
        <Center h='9vh' bg='#262626'>
            <Flex gap='20'>
                {ListNavbar.map((data, index) => {
                    return (
                        <Link
                            key={index}
                            href={data.path} fontSize='25px'
                        >
                            {data.icon}
                        </Link>
                    )
                })}
            </Flex>
        </Center>
    );
}
 
export default MobileNavbar;