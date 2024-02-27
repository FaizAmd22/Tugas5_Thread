import { Box, Flex, Image, Text, Grid, GridItem, Center, Link, Avatar, Spacer, Menu, MenuItem, MenuButton, MenuList, IconButton } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import changeFormatDate from '../features/changeFormatDate';
import Liked from '../features/liked';

const CardItems = (thread: any, index: number) => {
    console.log("replies :", thread.thread);
    if (thread.type == "replies") {
        console.log(true);
    } else {
        console.log(false);
    }
    
    return (
        <Box key={index} w='100%' color='white' borderTop='1px' py='5' borderColor='gray.600'>
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem w='50px' borderRadius='full' mr='2' color='white'>
                    <Avatar src={thread.thread.author.picture ? thread.thread.author.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} name={thread.thread.author.name} />
                </GridItem>
                
                <GridItem colSpan='12'>
                    <Flex alignItems='center' alignContent='center'>
                        <Box>
                            <Flex gap='1' color='gray.500'>
                                <Link fontWeight='semibold' color='white'>
                                    {thread.thread.author.name}
                                </Link>

                                <Link textDecoration='underline' _hover={{ color: "gray.200"}}>
                                    {thread.thread.author.username}
                                </Link>

                                <Text ml='3' fontSize='sm' marginY='auto'>
                                    {changeFormatDate(thread.thread.created_at)}
                                </Text>
                            </Flex>

                            {thread.type == "replies" && (
                                <Text fontSize='sm' my='2' mb='4'>
                                    {thread.thread.content}
                                </Text>
                            )}
                        </Box>

                        <Spacer />

                        {thread.type == "replies" && (
                            <Box pr={{base: '2', md: '0', xl: '5'}}>
                                <Liked liked={thread.thread.likes} threadId={thread.thread.id} isLiked={thread.thread.isLike} />
                            </Box>
                        )}

                        {thread.type != 'replies' && (
                            <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label='Options'
                              icon={<BsThreeDotsVertical />}
                              variant='none'
                              borderColor='gray.900'
                            />
                            <MenuList bg='gray.900'>
                              <MenuItem icon={<MdEdit />} bg='gray.900' isDisabled>
                                Edit
                              </MenuItem>
                              <MenuItem icon={<MdDeleteForever />} bg='gray.900'>
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                    </Flex>
                    
                    {thread.type == 'replies' ? (
                        <Box>
                            <Image
                                src={!thread.thread.image ? '' : thread.thread.image}
                                py={thread.thread.image && '4'}
                                maxW='100%'
                            />
                        </Box>
                    ) : (
                        <Link href={`/details/${thread.thread.id}`} _hover={{textDecoration: 'none'}}>
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
                    )}
                    

                    {thread.type != 'replies' && (
                        <Flex gap='1'>
                            <Flex gap='2'>
                                <Liked liked={thread.thread.likes} threadId={thread.thread.id} isLiked={thread.thread.isLike} />
                            </Flex>

                            <Text bg='none' color='gray.500' px='7' fontSize='xl' borderRadius='full' _hover={{ color: "gray.200"}}>
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
                    )}
                </GridItem>
            </Grid>
        </Box>
        // <Text>
        //     Tesettt
        // </Text>
     );
}
 
export default CardItems;