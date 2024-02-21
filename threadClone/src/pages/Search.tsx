import { Text, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { RiUserSearchLine } from "react-icons/ri";

const Search = () => {
    return ( 
        <Stack h={{base: "78vh", md: '100vh'}} color='white' px={4} pb='0'>
            <Text fontSize='2xl' py={{base: '0', md: '4'}} pb='2' fontWeight='semibold'>
                Search
            </Text>

            <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.400' pl='2'>
                    <RiUserSearchLine />
                </InputLeftElement>
                <Input rounded='full' borderColor='gray.500' type='tel' placeholder='Phone number' focusBorderColor='green.500' />
            </InputGroup>
        </Stack>
     );
}
 
export default Search;