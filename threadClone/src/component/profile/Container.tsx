import { Box, Flex, Image, Text, Grid, GridItem, Center, Link, Avatar, Stack, Spacer, Button } from '@chakra-ui/react'
import { FaCalendarDays } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

const ContainerProfile = () => {
    const user = useSelector(selectUser)
    const date = new Date(user.created_at)
    const formatedDate = date.toDateString()
    
    return ( 
        <Stack color='white' borderBottom='2px' borderColor='gray.700' pb='5'>
            <Image src='https://i.pinimg.com/564x/70/38/f2/7038f235f718d1e43157fc5516a0aaa7.jpg' h='350px' objectFit='cover' rounded='lg' mt='2' />
            
            <Grid templateColumns='repeat(4, 1fr)'>
                <GridItem w='52' h='52' rounded='full' bg='#1D1D1D' ml='5' mt='-100px'>
                    <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
                        <Image src={user.picture ? user.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} w='85%' h='85%' rounded='full'/>
                    </Flex>
                </GridItem>

                <Spacer />
                <Spacer />

                <Button border='2px' bg='none' color='white' rounded='full' _hover={{borderColor: 'green.500', color: 'green.500'}}>
                    Edit Profile
                </Button>
            </Grid>

            <Text fontWeight='semibold' fontSize='3xl'>
                {user.name}
            </Text>
            <Text color='gray.500' mt='-3'>
                @{user.username}
            </Text>

            <Flex alignItems='center' gap='2' color='gray.500'>
                <FaCalendarDays />
                <Text>
                    Joined {formatedDate}
                </Text>
            </Flex>

            <Flex gap='4'>
                <Flex gap='1'>
                    <Text>
                        {user.following}
                    </Text>
                    <Text color='gray.500'>
                        Following
                    </Text>
                </Flex>

                <Flex gap='1'>
                    <Text>
                        {user.follower}
                    </Text>
                    <Text color='gray.500'>
                        Follower
                    </Text>
                </Flex>
            </Flex>
        </Stack>
    );
}

export default ContainerProfile;