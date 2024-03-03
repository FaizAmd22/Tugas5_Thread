import { Spacer, Button, Flex, Link, Grid, GridItem, Avatar } from '@chakra-ui/react'
import { useState } from "react"
import { Navigate } from "react-router-dom";
import { UsersInterface } from '../interfaces/UsersInterface';


const CardUser = (data: UsersInterface) => {
    const [followed, setFollowed] = useState(false)

    return ( 
        <Grid templateColumns='repeat(11, 1fr)'>
            {/* <Flex> */}
            <GridItem w='60px' h='60px'>
                <Navigate to>
                <Avatar
                    src={data.picture ? data.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'}
                    alt={data.name}
                    w='60px'
                    h='60px'
                />
                </Navigate>
            </GridItem>

            <GridItem colSpan='6' my='auto' pl='2'>
                <Flex flexDirection='column'>
                    <Link>
                        {data.name}
                    </Link>

                    <Link color='gray.500' _hover={{color: "white"}}>
                        {data.username}
                    </Link>
                </Flex>
            </GridItem>
            
            <Spacer />

            <Button
                position='relative'
                px='10'
                bg='none'
                right='0'
                border='2px'
                fontSize='sm'
                margin='auto'
                rounded='full'
                color={followed ? "gray.500" : "white"}
                borderColor={followed ? "gray.500" : "white"}
                _hover={{ bg: "none", color: "green.500", borderColor: "green.500" }}
                onClick={() => setFollowed(!followed)}
                >
                {followed ? "Unfollow" : "Follow"}
            </Button>
        {/* </Flex> */}
                </Grid>
    );
}
 
export default CardUser;