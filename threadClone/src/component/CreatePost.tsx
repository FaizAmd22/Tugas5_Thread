import { Box, Avatar, Input, Flex, Button, Center, Spacer, Grid, GridItem, InputGroup, InputLeftElement, Image, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import { API } from '../libs/axios';
import axios from 'axios'

const CreatePost = (type: string) => {
    const user = useSelector(selectUser);
    const token = sessionStorage.getItem("token")
    console.log("token :", token);
    console.log("types :", type);
    
    const [formData, setFormData] = useState({
        content: '',
        image: null
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files.length > 0) {
            const selectedImage = files[0];
            console.log("set Image :", selectedImage);
            
            setFormData(prevData => ({
                ...prevData,
                image: selectedImage
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    console.log("formDatra :", formData);
    
    const handleSubmit = async () => {
        try {
            if (type.type == 'threads') {
                const response = await API.post("/thread", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                alert("Thread created!")
                console.log("response :", response);
            } else {
                const response = await API.post(`/thread/${type.id}/reply`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                alert("Reply created!")
                console.log("response :", response);
            }

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    return ( 
        <Box color='white' pb='2'>
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem mr='2'>
                    <Avatar src={user.picture ? user.picture : 'https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg'} name={user.name} w='50px' h='50px' />
                </GridItem>
                
                <GridItem colSpan={10}>
                    <Input onChange={handleChange} type='text' name='content' focusBorderColor='none' placeholder={(type.type == 'replies') ? 'Type your reply!' : 'What is happening?!'} border="none" />
                </GridItem>
                
                <Spacer />

                <Center>
                    <Flex justifyContent='center'>
                        <InputGroup w='50px' h='100%' color='green.500' fontSize='3xl'  _hover={{ color: "white"}}>
                            <InputLeftElement pointerEvents='none' fontSize='3xl' >
                                <BiSolidImageAdd />
                            </InputLeftElement>
                            
                            <Input
                                opacity='0'
                                type='file'
                                name='image'
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </Flex>
                    

                    <Button onClick={handleSubmit} bg='green.500' color='white' px='7' borderRadius='full' _hover={{ color: "green.500", bg: "white"}}>
                        Post
                    </Button>
                </Center>
            </Grid>
            <Grid templateColumns='repeat(13, 1fr)'>
                <GridItem w='75px' />
                <GridItem colSpan={5}>
                    {formData.image && (
                        <>
                            <IconButton
                                onClick={() => setFormData(prevData => ({
                                    ...prevData,
                                    image: null
                                }))}
                                isRound={true}
                                variant='solid'
                                bg='none'
                                color='red.600'
                                fontSize='28px'
                                ml='-20px'
                                mb='-20px'
                                _hover={{ bg: 'none', color: 'white'}}
                                icon={<IoCloseCircle />}
                            />

                            <Image src={URL.createObjectURL(formData.image)} h='120px' />
                        </>
                    )}
                </GridItem>
            </Grid>
        </Box>
    );
}
 
export default CreatePost;
