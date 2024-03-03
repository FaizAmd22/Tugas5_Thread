import { Box, Button, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../libs/axios';
import { IoChevronBackOutline } from "react-icons/io5";
import DetailThreadCards from './DetailThreadCards';
import { useDispatch } from 'react-redux';
import { ThreadInterface } from '../../interfaces/ThreadInterface';
import { addDetailThread } from '../../slices/detailThreadSlice';

const DetailThread = () => {
    let { id } = useParams()
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState<ThreadInterface>({})
    const dispatch = useDispatch()
    dispatch(addDetailThread(data))

    
    const fetchData = async () => {
        const response = await API.get(`/thread/${id}`)

        // console.log("response :", response.data.data);
        setData(response.data.data)
    }

    const fetchDataWithAuth = async () => {
        const response = await API.get(`/threads/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        // console.log("response :", response.data.data);
        setData(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchDataWithAuth()
        } else {
            fetchData()
        }
    }, [])

    return ( 
        <Box
            p='4'
            h={{ base: "78vh", md: '100vh' }}
            overflowY='auto'
            style={{ overflowY: "auto" }} sx={{
            '&::-webkit-scrollbar': {
                width: '4px',
                borderRadius: 'full',
                backgroundColor: `none`,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: `green.500`,
            }
        }}>
            <Button
                mt='5'
                mb='4'
                ml='-5'
                bg='none'
                color='white'
                fontSize='24px'
                fontWeight='semibold'
                transitionDuration='500ms'
                display={{ base: 'none', md: 'block' }}
                _hover={{ bg: 'none', color: 'green.500' }}
                onClick={() => window.location.assign("/")}
            >
                <Flex alignItems='center' gap='2'>
                    <Box w='20%'>
                        <IoChevronBackOutline />
                    </Box>    
                    Status
                </Flex>
            </Button>

            <DetailThreadCards />
        </Box>
    );
}
 
export default DetailThread;