import CreatePost from "../component/CreatePost";
import { Text, Stack } from '@chakra-ui/react'
import Threads from "../component/thread/Threads";

const Home = () => {
    const token = sessionStorage.getItem("token")
    
    return ( 
            <Stack h={{base: "82vh", md: '100vh'}} color='white' p={4} pb='0'>
                <Text fontSize='2xl' py='4' fontWeight='semibold'  display={{base: 'none', md: 'block'}}>
                    Home
                </Text>

                {token && <CreatePost type='threads' />}

                <Threads />
            </Stack>
     );
}
 
export default Home;