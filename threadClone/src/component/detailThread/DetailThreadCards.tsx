import { Box, Flex, Image, Text, Grid, GridItem, Center, Link, Avatar } from '@chakra-ui/react'
import Liked from '../../features/liked';
import { BiCommentDetail } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { selectDetailThread } from '../../slices/detailThreadSlice';
import { useEffect, useState } from 'react';
import CardItems from '../CardItems';
import CreatePost from '../CreatePost';

const DetailThreadCards = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState({})
    const datas = useSelector(selectDetailThread)
    const formatedDate = new Date(data.created_at)
    const date = formatedDate.toDateString()
    const token = sessionStorage.getItem("token")
    
    useEffect (() => {
        setData(datas)

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    })

    console.log("data :", data);
    
    return (
    <>
        {
            isLoading ? (
                <Text color='white'>Loading ...</Text>
            ) : (
                <Box w='100%' color='white'>
                    <Box py='5'>
                        <Grid templateColumns='repeat(13, 1fr)'>
                            <GridItem w='50px' borderRadius='full' mr='2' color='white'>
                                <Avatar src={data.author.picture ? data.author.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} name={"testt"} />
                            </GridItem>
                            
                            <GridItem colSpan='12'>
                                <Flex flexDirection='column' gap='1' color='gray.500'>
                                    <Link fontWeight='semibold' color='white'>
                                        {data.author.name}
                                    </Link>

                                    <Link mt='-1' textDecoration='underline' _hover={{ color: "gray.200"}}>
                                        {data.author.username}
                                    </Link>
                                </Flex>
                            </GridItem>
                        </Grid>

                        <Text fontSize='sm' mt='5'>
                            {data.content}
                        </Text>
                        
                        <Image
                            src={data.image ? data.image : ''}
                            alt={data.name}
                            py='4'
                            maxW='100%'
                        />

                        <Text pb='4' color='gray.500' fontSize='sm' marginY='auto'>
                            {date}
                        </Text>

                        <Flex gap='1'>
                            <Flex gap='2'>
                                <Liked
                                    liked={data.likes} 
                                    threadId={data.id}
                                    isLiked={data.isLike}
                                />
                            </Flex>

                            <Text bg='none' color='gray.500' px='7' fontSize='xl' borderRadius='full' _hover={{ color: "gray.200"}}>
                                <Flex>
                                    <Center gap='2'>
                                            <BiCommentDetail />

                                            <Text fontSize='sm'>
                                                {data.replies} Replies
                                            </Text>
                                    </Center>
                                </Flex>
                            </Text>
                        </Flex>
                    </Box>
                    
                    <Box py='5' borderTop='1px' borderColor='gray.600'>
                        {token && <CreatePost id={data.id} type='replies' />}
                    </Box>
                    
                    {data.reply.map((replies, index) => {
                        return (
                            <CardItems thread={replies} index={index} type='replies' />
                        )
                    })}
                </Box >
            )
        }
    </>
    );
}
 
export default DetailThreadCards;