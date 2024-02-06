import { Text, Box, Image, Spacer, Button, Flex } from '@chakra-ui/react'
import { useState } from "react"


const RecommendFollow = (data) => {
    const [followed, setFollowed] = useState(false)

    return ( 
        <Flex gap='3'>
            <Image src={data.picture ? data.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} alt={data.name} borderRadius='full' w='60px' h='60px' />

            <Box margin='auto'>
                <Text>
                    {data.name}
                </Text>

                <Text as='Button' color='gray.500' _hover={{color: "white"}}>
                    {data.username}
                </Text>
            </Box>

            <Spacer />

            <Button color={followed ? "gray.500" : "white"} border='2px' rounded='full' borderColor={followed ? "gray.500" : "white"}  bg='none' fontSize='sm' margin='auto' px='7' _hover={{bg: "none", color: "green.500", borderColor: "green.500"}} onClick={() => setFollowed(!followed)}>
                {followed ? "Following" : "Follow"}
            </Button>
        </Flex>
    );
}
 
export default RecommendFollow;