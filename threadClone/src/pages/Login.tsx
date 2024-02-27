import { Text, Stack, Input, InputGroup, Button, InputRightElement, Link } from '@chakra-ui/react'
import { useState } from 'react';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { API } from '../libs/axios';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/authSlice';
import * as Swal from 'sweetalert2'

const Login = () => {
    const [show, setShow] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()


    const handleLogin = async (e: React.FormEvent) => {
        const requestingData = {
            username,
            password
        }

        if (!requestingData.username && !requestingData.password) {
            setError("Data can't be empty!")
        } else if (!requestingData.password) {
            setError("Password can't be empty")
        } else if (!requestingData.username) {
            setError("Username can't be empty!")
        }

        try {
            setError('')
            const response = await API.post("/login", requestingData)
            console.log("response: ", response);
            dispatch(addUser(response.data))
            
            const token = response.data.token
            const userId = response.data.user.id

            sessionStorage.setItem("token", token)
            sessionStorage.setItem("id", userId)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Swal.fire({
                title: "Login Success!",
                text: "That thing is still around?",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.assign("/")
                }
            })
        
            
            

            console.log("error : ", response.data);
        } catch (error) {
            console.log("error : ", error.response);
            setError(error.response.data.message)
        }
    }
    
    return ( 
        <Stack w='100vw' bg='#1D1D1D' h={'100vh'}>
            <Stack w={{ base: '90%', md: '40%' }} margin='auto' color='white' p={4} pb='0'>
                <Link href='/' fontSize='5xl' fontWeight='semibold' color='green.500' _hover={{textDecoration: 'none'}}>
                    Circle
                </Link>

                <Text fontSize='3xl' pb='4' fontWeight='semibold'  display={{base: 'none', md: 'block'}}>
                    Login to Circle
                </Text>

                <Stack spacing={3}>
                    <Input onChange={(e) => setUsername(e.target.value)} placeholder='Email' type='email' />

                    <InputGroup size='md'>
                        <Input onChange={(e) => setPassword(e.target.value)}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Password'
                        />
                        <InputRightElement width='4.5rem'>
                        <Button bg='none' color='green.500' h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? <BiSolidShow /> : <BiSolidHide /> }
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                </Stack>

                <Button onClick={handleLogin} textAlign='center' mt='7' bg='green.500' rounded='full' color='white' _hover={{color: 'green.500', bg: 'white'}}>
                    Submit
                </Button>

                {error && <Text color='red.500'>{error}</Text>}
                
                <Text py='2'>
                    Don't have an account yet?

                    <Link href='/register' color='green.500' px='2' _hover={{color: 'white'}}>
                        Create account
                    </Link>
                </Text>

                <Link href='/' textAlign='center' mt='5' bg='red.500' py='2' fontWeight='semibold' rounded='full'  _hover={{color: 'red.500', bg: 'white', textDecoration: 'none'}}>
                    <Text>
                        Back To Home
                    </Text>
                </Link>
            </Stack>
        </Stack>
     );
}
 
export default Login;