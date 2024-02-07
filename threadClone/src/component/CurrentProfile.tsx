import { Text, Box, Stack, Image, Grid, GridItem, Spacer, Button, Center, Flex } from '@chakra-ui/react'
import { HiSparkles } from "react-icons/hi2";

const CurrentProfile = (datas) => {
    return ( 
        <Stack gap='2'>
                    <Text color='white' fontWeight='semibold' fontSize='xl'>
                        My Profile
                    </Text>
                    
                    <Box w='100%' h='150px' rounded='lg' bgGradient='linear(to-l, #7928CA, #FF0080)' />

                    <Grid templateColumns='repeat(3, 1fr)'>
                        <GridItem w='115px' h='115px' bg='#262626' borderRadius='full' mr='2' mt='-70px' ml='6'>
                            <Center w='115px' h='115px'>
                                <Image src={datas.picture} alt={datas.name} borderRadius='full' w='100px' h='100px' />
                            </Center>
                        </GridItem>

                        <Spacer />

                        <Button w='11vw' color='white' bg='none' rounded='full' textAlign='center' px='5' border='2px' borderColor='white' _hover={{ bg: 'none', color: "green.400", borderColor: 'green.400' }} fontSize='15px'>
                            Edit Profile
                        </Button>
                    </Grid>

                    <Stack gap='1'>
                            <Flex color='white'>
                                <Center gap='2'>
                                    <Text color='yellow'>
                                        <HiSparkles />
                                    </Text>
                                    {datas.name}
                                    <Text color='yellow'>
                                        <HiSparkles />
                                    </Text>
                                </Center>
                            </Flex>

                        <Text color='gray.500' fontSize='sm'>
                            {datas.username}
                        </Text>

                        <Text color='white' my='2'>
                            {datas.bio}
                        </Text>

                        <Flex gap='4' color='white'>
                            <Center gap='1'>
                                {datas.following}
                                <Text color='gray.500'>
                                    Following
                                </Text>
                            </Center>

                            <Center gap='1'>
                                {datas.followers}
                                <Text color='gray.500'>
                                    Followers
                                </Text>
                            </Center>
                        </Flex>
                    </Stack>
                </Stack>
    );
}
 
export default CurrentProfile;