import { Text, Stack, Input, InputGroup, Button, InputRightElement, Link } from '@chakra-ui/react'
import { useState } from 'react';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { API } from '../libs/axios';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

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
            
            const token = response.data.token

            sessionStorage.setItem("token", token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            alert("Login Success!")
            window.location.replace("/")

            console.log("error : ", response.data);
        } catch (error) {
            console.log("error : ", error.response);
            setError(error.response.data.message)
        }
    }
    
    return ( 
        <Stack w='100vw' bg='#1D1D1D' h={'100vh'}>
            <Stack w={{base: '90%', md: '40%'}} margin='auto' color='white' p={4} pb='0'>
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
                
                <Text>
                    Don't have an account yet?

                    <Link href='/register' color='green.500' px='2' _hover={{color: 'white'}}>
                        Create account
                    </Link>
                </Text>
            </Stack>
        </Stack>
     );
}
 
export default Login;