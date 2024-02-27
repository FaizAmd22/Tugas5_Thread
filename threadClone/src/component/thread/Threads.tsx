import { Stack } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { ThreadInterface } from "../../interfaces/ThreadInterface";
import { API } from "../../libs/axios";
import { useDispatch } from "react-redux";
import { addThread } from "../../slices/threadSlice";
import ThreadCards from "./ThreadCards";
import { addThreadProfile } from '../../slices/threadProfileSlice';

const Threads = () => {
    const [data, setData] = useState<ThreadInterface[]>([])
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('token')
    dispatch(addThread(data))
    const test = ''

    const userId = sessionStorage.getItem("id")
    // console.log("userId :", userId);

    
    const filteredData = data.filter((item) => item.author.id == userId);
    console.log("filtered :", filteredData);
    dispatch(addThreadProfile(filteredData))
    
    console.log(filteredData);
    
    const fetchData = async () => {
        try {
            const response = await API.get("/thread")
            console.log("response :", response.data.data);
            setData(response.data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchDataAuth = async () => {
        try {
            const response = await API.get(`/threads`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            console.log("response :", response.data.data);
            setData(response.data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        if (token) {
            fetchDataAuth()
        } else {
            fetchData();
        }
    }, [])

    return ( 
        <Stack h='100vh' py='5'
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
            <ThreadCards />
        </Stack>
     );
}
 
export default Threads;