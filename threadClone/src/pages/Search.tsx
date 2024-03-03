import { Text, Stack, Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import SearchedUser from '../component/search/SearchedUser';
import { UsersInterface } from '../interfaces/UsersInterface';
import { API } from '../libs/axios';
import { setUsers } from '../slices/searchedUserSlice';

const Search = () => {
    const [username, setUsername] = useState<string | null>(null)
    const [dataFilter, setDataFilter] = useState<UsersInterface>([])
    const [message, setMessage] = useState<boolean>(false)
    const dispatch = useDispatch()
    dispatch(setUsers(dataFilter))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUsername(e.target.value)
    }

    useEffect(() => {
        const getData = async () => {
            const response = await API.get('/users')
            const data = response.data.data
            if (username?.length > 0) {
                const filter = data.filter((item) => item.username.toLowerCase().includes(username.toLowerCase()))
                console.log("filter di search :", filter);
                if (filter.length == 0) setMessage(true)
                setDataFilter(filter)
            } else {
                setDataFilter([])
                setMessage(false)
            }
        }

        getData()
    }, [username])
    

    return ( 
        <Stack
            h={{ base: "78vh", md: '100vh' }}
            px='4'
            pb='0'
            color='white'
        >
            <Text
                pb='2'
                fontSize='2xl'
                fontWeight='semibold'
                py={{ base: '0', md: '4' }}
            >
                Search
            </Text>

            <InputGroup>
                <InputLeftElement
                    pl='2'
                    color='gray.400'
                    pointerEvents='none'
                >
                    <IoSearchOutline />
                </InputLeftElement>
                
                <Input
                    onChange={handleChange}
                    type='text'
                    rounded='full'
                    name='username'
                    placeholder='search'
                    borderColor='gray.500'
                    focusBorderColor='green.500'
                />
            </InputGroup>

            {message &&
                <Text marginX='auto' pt='50' color='white'>
                    User not found!
                </Text>
            }

            <Box
                // bg='red'
                h='84vh'
                overflowY='auto'
                sx={{
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
                <SearchedUser />
            </Box>
        </Stack>
     );
}
 
export default Search;