import { Text, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
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
                if (filter.length > 0) setMessage(true)
                setDataFilter(filter)
            } else {
                const empty: any = []
                setDataFilter(empty)
                setMessage('')
            }
        }

        getData()
    }, [username])
    

    return ( 
        <Stack h={{base: "78vh", md: '100vh'}} color='white' px={4} pb='0'>
            <Text fontSize='2xl' py={{base: '0', md: '4'}} pb='2' fontWeight='semibold'>
                Search
            </Text>

            <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.400' pl='2'>
                    <IoSearchOutline />
                </InputLeftElement>
                
                <Input onChange={handleChange} name='username' rounded='full' borderColor='gray.500' type='tel' placeholder='search' focusBorderColor='green.500' />
            </InputGroup>

            <SearchedUser />

            {message &&
                <Text marginX='auto' pt='50' color='white'>
                    User not found!
                </Text>
            }
        </Stack>
     );
}
 
export default Search;