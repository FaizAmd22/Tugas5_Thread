import { Text, Box } from '@chakra-ui/react'
import ContainerProfile from '../component/profile/container';
import ProfileCards from '../component/profile/ProfilleCards';
import Threads from '../component/thread/Threads';

const MyProfile = () => {


    return ( 
        <Box h={{ base: "78vh", md: '100vh' }} overflowY='auto' p='4' style={{ overflowY: "auto" }} sx={{
            '&::-webkit-scrollbar': {
                width: '4px',
                borderRadius: 'full',
                backgroundColor: `none`,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: `green.500`,
            }
        }}>
            <ContainerProfile />

            <ProfileCards />
        </Box>
     );
}
 
export default MyProfile;