import { Box } from '@chakra-ui/react'
import { useSelector } from "react-redux";
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
                        <Box
                            key={index} 
                            py='3'
                            color='white'
                        >
                            <CardUser
                                name={data.name}
                                username={data.username}
                                picture={data.picture}
                            />
                        </Box>
                    )
                })
            }
        </Box>
    );
}

export default SearchedUser;