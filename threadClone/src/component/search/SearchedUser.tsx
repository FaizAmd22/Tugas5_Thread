import { Box, Flex, Image, Text, Grid, GridItem, Center, Link, Avatar } from '@chakra-ui/react'
import { useSelector } from "react-redux";
import { UsersInterface } from '../../interfaces/UsersInterface';
import { selectUsers } from "../../slices/searchedUserSlice";
import CardUser from '../CardUser';

const SearchedUser = () => {
    const users = useSelector(selectUsers)
    console.log("users di searchUser:", users);
    

    return ( 
        <Box>
            { 
                users.map((data: any, index: number) => {
                    return (
                        <Box color='white' key={index} py='3'>
                            <CardUser name={data.name} username={data.username} picture={data.picture} />
                        </Box>
                    )
                })
            }
        </Box>
    );
}

export default SearchedUser;