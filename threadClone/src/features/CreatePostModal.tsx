import { Button, Flex, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, Link, Input, Spacer, Avatar } from '@chakra-ui/react'
import { BiSolidImageAdd } from "react-icons/bi";


const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <>
      <Button
        onClick={onOpen}
        w='100%'
        margin='auto'
        color='white'
        bg='green.500'
        rounded='full'
        fontSize='16px'
        fontWeight='semibold'
        display={{ base: "none", md: "block" }}
        _hover={{ bg: 'white', color: 'green.500', boxShadow: 'lg' }}
      >
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          maxW="600px"
          py='4'
          mx='2'
          bg='black'
          color='white'
          textAlign='center'
        >
          <ModalCloseButton />

          <ModalBody py='16' pt='4'>
            <Flex margin='auto' gap={5}>
              <Avatar src='https://i.pinimg.com/564x/f9/a7/3c/f9a73ca8d86883de90499a06a64cdae8.jpg' />
              
              <Input 
                focusBorderColor='none'
                placeholder="What's happening?!" 
                type='text' 
                border='none'
              />
            </Flex>
          </ModalBody>

          <Flex px='10' mt='1' mb='4'>
            <Link
              bg='none'
              color='green.500'
              fontSize='3xl'
              _hover={{ color: "white" }}
            >
                  <BiSolidImageAdd />
            </Link>
              
            <Spacer />
            
            <Link
              px="6"
              py='1'
              color='white'
              rounded='full'
              bg='green.500'
              _hover={{ bg: 'white', color: 'green.500', boxShadow: 'lg' }}
            >
                Post
            </Link>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostModal;