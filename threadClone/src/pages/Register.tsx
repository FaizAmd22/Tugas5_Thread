import { Text, Stack, Input, Button, Link } from '@chakra-ui/react'
import {useState} from 'react'
import { API } from '../libs/axios';
import axios from 'axios'

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    console.log("data change :", formData);
    
    const handleSubmit = async () => {
        try {
            setError('')
            const response = await API.post("/register", formData)
            const token = response.data.token
            const userId = response.data.user.id

            sessionStorage.setItem("token", token)
            sessionStorage.setItem("id", userId)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            alert("Register Success!")
            window.location.assign('/')

            console.log('response :', response.data)
        } catch (error) {
            setError(error.response?.data.message)
        }
    }

    return ( 
        <Stack w='100vw' bg='#1D1D1D' h={'100vh'}>
            <Stack w='60%' margin='auto' color='white' p={4} pb='0'>
                <Link href='/' fontSize='5xl' fontWeight='semibold' color='green.500' _hover={{textDecoration: 'none'}}>
                    Circle
                </Link>

                <Text fontSize='3xl' pb='4' fontWeight='semibold'  display={{base: 'none', md: 'block'}}>
                    Create account Circle
                </Text>

                <Stack spacing={3}>
                    <Input onChange={handleChange} name='fullname' placeholder='Fullname' type='text' />
                    <Input onChange={handleChange} name='username' placeholder='Email' type='text' />
                    <Input onChange={handleChange} name='password' placeholder='Password' type='text' />
                </Stack>

                <Button onClick={handleSubmit} textAlign='center' mt='7' bg='green.500' rounded='full' color='white' _hover={{color: 'green.500', bg: 'white'}}>
                    Create
                </Button>

                {error && <Text color='red.500'>{error}</Text>}
                
                <Text py='2'>
                    Already have account?

                    <Link href='/login' color='green.500' px='2' _hover={{color: 'white'}}>
                        Login
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
 
export default Register;