import CreatePost from "../component/CreatePost";
import { Text, Stack } from '@chakra-ui/react'
import Threads from "../component/Threads";

const Home = () => {
    return ( 
        <div>
            <Stack h={{base: "78vh", md: '100vh'}} color='white' p={4} pb='0'>
                <Text fontSize='2xl' py='4' fontWeight='semibold'  display={{base: 'none', md: 'block'}}>
                    Home
                </Text>

                <CreatePost />

                <Threads />
            </Stack>
        </div>
     );
}
 
export default Home;