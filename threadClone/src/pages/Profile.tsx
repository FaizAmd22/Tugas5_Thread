import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ContainerProfile from '../component/profile/container';
import ProfileCards from '../component/profile/ProfilleCards';
import { API } from '../libs/axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfile } from '../slices/profileSlice';

const Profile = () => {
    let { username } = useParams();
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    dispatch(setProfile(data))

    console.log("data :", data);

    const fetchData = async () => {
        const response = await API.get(`/user/${username}`)
        console.log("respnse :", response);
        setData(response.data.data)
    }

    useEffect(() => {
        fetchData()

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    return ( 
        <Box
            h={{ base: "78vh", md: '100vh' }}
            p='4'
            overflowY='auto'
            style={{ overflowY: "auto" }}
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
            {isLoading ? (
                <Text color='white'>
                    Loading ....
                </Text>
            ) : (
                <>
                    <ContainerProfile />

                    <ProfileCards />
                </>
            )}
        </Box>
     );
}
 
export default Profile;