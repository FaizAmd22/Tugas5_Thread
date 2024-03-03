import { Box, Flex, Image, Text, Grid, GridItem, Link, Avatar, Spacer } from '@chakra-ui/react'
import changeFormatDate from '../../features/ChangeFormatDate';
import Dropdown from '../../features/Dropdown';
import Liked from '../../features/Liked';

const ReplyCards = (reply: any, index: number) => {
    // console.log("replies :", reply.reply);
    
    return (
        <Box
            key={index}
            w='100%'
            py='5'
            color='white'
            borderTop='1px'
            borderColor='gray.600'
        >
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem
                    w='50px'
                    mr='2'
                    borderRadius='full'
                    color='white'
                >
                    <Avatar
                        src={reply.reply.author.picture ? reply.reply.author.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'}
                        name={reply.reply.author.name}
                    />
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
                                <Link fontWeight='semibold'>
                                    {reply.reply.author.name}
                                </Link>

                                <Link
                                    ml='1'
                                    color='gray.500'
                                    textDecoration='underline'
                                    _hover={{ color: "gray.200" }}
                                >
                                    {reply.reply.author.username}
                                </Link>

                                <Text ml='3' fontSize='sm' color='gray.500'>
                                    {changeFormatDate(reply.reply.created_at)}
                                </Text>

                                <Dropdown id={reply.reply.id} type='replies' />
                            </Flex>

                            <Text fontSize='sm' mt='2' mb='4'>
                                {reply.reply.content}
                            </Text>
                        </Box>

                        <Spacer />

                        <Box pr={{base: '2', md: '0', xl: '5'}}>
                            <Liked
                                liked={reply.reply.likes}
                                id={reply.reply.id}
                                isLiked={reply.reply.isLike}
                                type='replies'
                            />
                        </Box>

                    </Flex>
                        <Box>
                            <Image
                                src={!reply.reply.image ? '' : reply.reply.image}
                                maxW='100%'
                                pr={{base: '4', md: '2', xl: '7'}}
                            />
                        </Box>
                </GridItem>
            </Grid>
        </Box>
     );
}
 
export default ReplyCards;