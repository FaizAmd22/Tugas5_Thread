import datas from '../mocks/users.json'
import { BiSolidImageAdd } from "react-icons/bi";
import { Box, Avatar, Input, Flex, Button, Center, Spacer, Grid, GridItem } from '@chakra-ui/react'

const CreatePost = () => {
    const profilePicture = datas[0].picture
    const nameUser = datas[0].name

    return ( 
        <Box color='white' pb='2'>
            <Grid templateColumns='repeat(13, 1fr)'>
                    <GridItem mr='2'>
                        <Avatar src={profilePicture} name={nameUser} w='50px' h='50px' />
                    </GridItem>
                    
                    <GridItem colSpan={10}>
                        <Input focusBorderColor='none' placeholder='What is happening?!' border="none" />
                    </GridItem>
                    
                    <Spacer />

                    <Center>
                        <Button bg='none' color='green.500' fontSize='3xl'  _hover={{ color: "white"}}>
                            <BiSolidImageAdd />
                        </Button>

                        <Button bg='green.500' color='white' px='7' borderRadius='full' _hover={{ color: "green.500", bg: "white"}}>
                            Post
                        </Button>
                    </Center>
            </Grid>
        </Box>

     );
}
 
export default CreatePost;