import { Box, Flex, Image, Text, Grid, GridItem, Center, Link, Avatar, Spacer } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import changeFormatDate from '../features/ChangeFormatDate';
import Dropdown from '../features/Dropdown';
import Liked from '../features/Liked';

const CardItems = (thread: any, index: number) => {
    // console.log("replies :", thread.thread);
    
    return (
        <Box
            key={index}
            w='100%'
            color='white'
            borderTop='1px'
            py='5'
            borderColor='gray.600'
        >
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem
                    w='50px'
                    mr='2'
                    color='white'
                    borderRadius='full'
                >
                    <Link href={`/profile/${thread.thread.author.username}`}>
                    <Avatar
                        src={thread.thread.author.picture ? thread.thread.author.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'}
                        name={thread.thread.author.name}
                    />
                    </Link>
                </GridItem>
                
                <GridItem colSpan='12'>
                    <Flex alignItems='center' alignContent='center'>
                        <Box>
                            <Flex
                                gap='1'
                                color='white'
                                alignItems='center'
                                h='22px'
                            >
                                <Link
                                    href={`/profile/${thread.thread.author.username}`}
                                    fontWeight='semibold'
                                >
                                    {thread.thread.author.name}
                                </Link>

                                <Link
                                    href={`/profile/${thread.thread.author.username}`}
                                    ml='1'
                                    color='gray.500'
                                    textDecoration='underline'
                                    _hover={{ color: "gray.200" }}
                                >
                                    {thread.thread.author.username}
                                </Link>

                                <Text ml='3' fontSize='sm' color='gray.500'>
                                    {changeFormatDate(thread.thread.created_at)}
                                </Text>
                            </Flex>
                        </Box>

                        <Spacer />

                        <Dropdown id={thread.thread.id} type='threads' />
                    </Flex>
                    
                    <Link
                        href={`/details/${thread.thread.id}`}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Box>
                            <Text fontSize='sm' my='2' mb='4'>
                                {thread.thread.content}
                            </Text>
                            
                            <Image
                                src={!thread.thread.image ? '' : thread.thread.image}
                                py={thread.thread.image && '4'}
                                maxW='100%'
                            />
                        </Box>
                    </Link>

                    <Flex gap='1'>
                        <Flex gap='2'>
                            <Liked
                                liked={thread.thread.likes}
                                id={thread.thread.id}
                                isLiked={thread.thread.isLike}
                                type='threads'
                            />
                        </Flex>

                        <Text
                            px='7'
                            bg='none'
                            fontSize='xl'
                            color='gray.500'
                            borderRadius='full'
                            _hover={{ color: "gray.200" }}
                        >
                            <Link href={`/details/${thread.thread.id}`} _hover={{textDecoration: 'none'}}>
                                <Flex>
                                    <Center gap='2' fontSize='2xl'>
                                            <BiCommentDetail />

                                            <Text fontSize='md'>
                                                {thread.thread.replies} Replies
                                            </Text>
                                    </Center>
                                </Flex>
                            </Link>
                        </Text>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default CardItems;