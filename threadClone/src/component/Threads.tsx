import dataThread from "../mocks/thread.json"
import { Box, Flex, Stack, Image, Text, Grid, GridItem, Center, Link, Avatar } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import Liked from '../features/threads/liked';
import { useEffect, useState } from "react";
import { ThreadInterface } from "../interfaces/ThreadInterface";

const Threads = () => {
    const [data, setData] = useState<ThreadInterface[]>([])

    useEffect(() => {
        setData(dataThread)
    }, [])

    return ( 
        <Stack h='100vh' py='5'
            style={{ overflowY: "auto" }} sx={{
            '&::-webkit-scrollbar': {
                width: '4px',
                borderRadius: 'full',
                backgroundColor: `none`,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: `green.500`,
            }
        }}>
            {data.map((user: ThreadInterface, index: number) => {
                const {image, liked, name, picture, posted_at, replied, thread, username} = user

                return (
                    <Box key={index} w='100%' color='white' borderTop='1px' py='5' borderColor='gray.600'>
                        <Grid templateColumns='repeat(13, 1fr)'>
                            <GridItem w='50px' borderRadius='full' mr='2' color='white'>
                                <Avatar src={picture ? picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} name={name} />
                            </GridItem>
                            
                            <GridItem colSpan='12'>
                                    <Flex gap='1' color='gray.500'>
                                        <Link fontWeight='semibold' color='white'>
                                            {name}
                                        </Link>

                                        <Link textDecoration='underline' _hover={{ color: "gray.200"}}>
                                            {username}
                                        </Link>

                                        <Text ml='3' fontSize='sm' marginY='auto'>
                                            {posted_at}
                                        </Text>
                                    </Flex>

                                <Link href={`/details/${index}`} _hover={{textDecoration: 'none'}}>
                                    <Text fontSize='sm' my='2' mb='4'>
                                        {thread}
                                    </Text>

                                    
                                    <Image
                                        src={!image ? '' : image}
                                        py={image && '4'}
                                        maxW='100%'
                                    />
                                </Link>

                                <Flex gap='1'>
                                    <Flex gap='2'>
                                        <Liked liked={liked} />
                                    </Flex>

                                    <Text bg='none' color='gray.500' px='7' fontSize='xl' borderRadius='full' _hover={{ color: "gray.200"}}>
                                        <Link href={`/details/${index}`} _hover={{textDecoration: 'none'}}>
                                            <Flex>
                                                <Center gap='2'>
                                                        <BiCommentDetail />

                                                        <Text fontSize='sm'>
                                                            {replied} Replies
                                                        </Text>
                                                </Center>
                                            </Flex>
                                        </Link>
                                    </Text>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </Box>
                )
            })}
        </Stack>
     );
}
 
export default Threads;