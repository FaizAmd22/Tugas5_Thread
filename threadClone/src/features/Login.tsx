import { Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Link, Stack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [register, setRegister] = useState(false)
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)
  
  useEffect(() => {
    if (!isOpen) {
      setRegister(false)
    }
  }, [isOpen])
      
  return (
    <>
      <Button w='100%' onClick={onOpen} color='gray.800' bg='white' rounded='full' fontWeight='bold' fontSize='lg' textAlign='center' px='8'>
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        {!register ? (
          <ModalContent maxW="600px" textAlign='center' margin='auto' py='4' mx='2'>
            <ModalHeader>Login</ModalHeader>

            <ModalCloseButton />

            <ModalBody py='16'>
            <Stack spacing={3}>
              <Input placeholder='Email' type='email' />
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <BiSolidShow /> : <BiSolidHide /> }
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            </ModalBody>

            <Button w='80%' color='white' bg='green.500' margin='auto' _hover={{bg: 'white', color: 'green.500', boxShadow: 'lg' }}>
              Submit
            </Button>
            
            <Flex margin='auto' gap='2' mt='1' mb='4'>
              Don't have any account yet?

              <Link color='blue.600' textDecoration='underline' onClick={() => setRegister(true)}>
                Register
              </Link>
            </Flex>
          </ModalContent>
        ) : (
          <ModalContent maxW="600px" textAlign='center' margin='auto' py='4' mx='2'>
            <ModalHeader>Register</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
            <Stack spacing={3}>
              <Input placeholder='Name' type='text' />
              <Input placeholder='Username' type='text' />
              <Input placeholder='Email' type='email' />
              <Input placeholder='Password' type='text' />
            </Stack>
            </ModalBody>

            <Button w='80%' color='white' bg='green.500' margin='auto' mt='10' _hover={{bg: 'white', color: 'green.500', boxShadow: 'lg' }}>
              Submit
            </Button>
            
            <Flex margin='auto' gap='2' mt='1' mb='4'>
              Have an account?

              <Link color='blue.600' textDecoration='underline' onClick={() => setRegister(false)}>
                Login
              </Link>
            </Flex>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default Login;