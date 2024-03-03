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
            <Stack
                w={{ base: '90%', md: '40%' }}
                p='4'
                pb='0'
                color='white'
                margin='auto'
            >
                <Link
                    href='/'
                    fontSize='5xl'
                    fontWeight='semibold'
                    color='green.500'
                    _hover={{ textDecoration: 'none' }}
                >
                    Circle
                </Link>

                <Text
                    pb='4'
                    fontSize='3xl'
                    fontWeight='semibold'
                    display={{ base: 'none', md: 'block' }}
                >
                    Login to Circle
                </Text>

                <Stack spacing={3}>
                    <Input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            placeholder='Password'
                            type={show ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <InputRightElement width='4.5rem'>
                            <Button
                                h='1.75rem'
                                bg='none'
                                size='sm'
                                color='green.500'
                                onClick={() => setShow(!show)}
                            >
                                {show ? <BiSolidShow /> : <BiSolidHide /> }
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Stack>

                <Button
                    mt='7'
                    color='white'
                    rounded='full'
                    bg='green.500'
                    textAlign='center'
                    _hover={{ color: 'green.500', bg: 'white' }}
                    onClick={handleLogin}
                >
                    Submit
                </Button>

                {error && <Text color='red.500'>{error}</Text>}
                
                <Text py='2'>
                    Don't have an account yet?

                    <Link
                        px='2'
                        href='/register'
                        color='green.500'
                        _hover={{ color: 'white' }}
                    >
                        Create account
                    </Link>
                </Text>

                <Link
                    href='/'
                    mt='5'
                    py='2'
                    bg='red.500'
                    rounded='full'
                    textAlign='center'
                    fontWeight='semibold'
                    _hover={{ color: 'red.500', bg: 'white', textDecoration: 'none' }}
                >
                    <Text>
                        Back To Home
                    </Text>
                </Link>
            </Stack>
        </Stack>
     );
}
 
export default Login;