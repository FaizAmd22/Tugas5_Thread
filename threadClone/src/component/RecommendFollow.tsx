import { Image, Spacer, Button, Flex, Link, Grid, GridItem, Stack, Avatar } from '@chakra-ui/react'
import { useState } from "react"
import { UsersInterface } from '../interfaces/UsersInterface';


const RecommendFollow = (data: UsersInterface) => {
    const [followed, setFollowed] = useState(false)

    return ( 
        <Flex>
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem w='60px' h='60px'>
                    <Avatar src={data.picture ? data.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} alt={data.name} w='60px' h='60px'/>
                </GridItem>

                <GridItem margin='auto' pl='2'>
                    <Flex flexDirection='column'>
                        <Link>
                            {data.name}
                        </Link>

                        <Link color='gray.500' _hover={{color: "white"}}>
                            {data.username}
                        </Link>
                    </Flex>
                </GridItem>
            </Grid>

            <Spacer />

            <Button position='relative' right='0' color={followed ? "gray.500" : "white"} border='2px' rounded='full' borderColor={followed ? "gray.500" : "white"}  bg='none' fontSize='sm' margin='auto' px='10' _hover={{bg: "none", color: "green.500", borderColor: "green.500"}} onClick={() => setFollowed(!followed)}>
                {followed ? "Following" : "Follow"}
            </Button>
        </Flex>
    );
}
 
export default RecommendFollow;