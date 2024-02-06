import { useState } from "react"
import { Flex, Text, Center } from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Liked = () => {
    const [isClicked, setIsClicked] = useState(false)

    return ( 
        <Text as='Button' px='0' bg='none' text='start' color='gray.500' fontSize='xl' _hover={{ color: "gray.200"}} onClick={() => setIsClicked(!isClicked)}>
            {isClicked ? (
                <Text color='red.500'>
                    <FaHeart />
                </Text>
            ) : <FaRegHeart />}
        </Text>
    );
}
 
export default Liked;