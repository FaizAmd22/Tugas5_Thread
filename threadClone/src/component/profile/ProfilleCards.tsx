import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThreadInterface } from '../../interfaces/ThreadInterface';
import { API } from '../../libs/axios';
import { selectProfile } from '../../slices/profileSlice';
import CardItems from '../CardItems';


const ProfileCards = () => {
    const [data, setData] = useState<ThreadInterface[]>([])
    const token = sessionStorage.getItem("token")
    const user = useSelector(selectProfile)

    console.log("userId :", user);
    
    const filteredData = data.filter((item) => item.author.id == user.id);
    console.log("filtered :", filteredData);
    
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
        filteredData.map((thread: any, index: number) => {
            return (
                <CardItems
                    thread={thread}
                    index={index}
                    type='threads'
                />
            )
        })
     );
}
 
export default ProfileCards;