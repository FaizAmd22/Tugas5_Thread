import { useState } from "react"
import { Flex, Text, Center } from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Liked = (liked) => {
    const [isClicked, setIsClicked] = useState(false)
    const [likedCount, setLikedCount] = useState(liked.liked)

    
    const handleLiked = () => {
        setIsClicked(!isClicked)
        console.log(isClicked)
        
        if (!isClicked) {
            setLikedCount(likedCount + 1)
        } else {
            setLikedCount(likedCount - 1)
        }
    }

    return ( 
        <Flex gap='2'>
            <Text as='Button' px='0' bg='none' text='start' color='gray.500' fontSize='xl' _hover={{ color: "gray.200"}} onClick={handleLiked}>
                {isClicked ? (
                    <Text color='red.500'>
                        <FaHeart />
                    </Text>
                ) : <FaRegHeart />}
            </Text>

            <Text color='gray.500' fontSize='sm'>
                {likedCount}
            </Text>
        </Flex>
    );
}
 
export default Liked;