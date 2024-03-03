import { useEffect, useState } from "react"
import { Flex, Text, Center, Link } from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2'
import { API } from "../libs/axios";
import axios from 'axios'
// import { Navigate } from "react-router-dom";

const Liked = (likes: any) => {
    const [isClicked, setIsClicked] = useState(likes.isLiked)
    const [likedCount, setLikedCount] = useState(likes.liked)
    const token = sessionStorage.getItem('token')
    const id = likes.id
    const test = ''
    
    
    
    // console.log("liked :", likes);
    const handleLiked = () => {
        
        if (!token) {
            Swal.fire({
                title: "You need to login first!",
                text: "Do you wanna login?",
                background: "#2b2b2b",
                color:"white",
                showCancelButton: true,
                confirmButtonText: "Yes",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("/login")
                } 
            });
        } else {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const fetchLike = async () => {
                // if (likes.type == 'threads') {
                    await API.post(`/thread/${id}/like`, test, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                // } else {
                //     await API.post(`/reply/${id}/like`, test, {
                //         headers: {
                //             'Authorization': `Bearer ${token}`,
                //         }
                //     });
                // }
            }
            fetchLike()

            // console.log("thread Id :", likes);
            setIsClicked(!isClicked)
            console.log(isClicked)
            
            if (!isClicked) {
                setLikedCount(likedCount + 1)
            } else {
                setLikedCount(likedCount - 1)
            }
        }
    }

    return ( 
        <Flex gap='2'>
            <Link
                px='0'
                bg='none'
                text='start'
                fontSize='2xl'
                color='gray.500'
                _hover={{ color: "gray.200" }}
                onClick={handleLiked}
            >
                {isClicked ? (
                    <Text color='red.500'>
                        <FaHeart />
                    </Text>
                ) : <FaRegHeart />}
            </Link>

            <Text color='gray.500' fontSize='md'>
                {likedCount}
            </Text>
        </Flex>
    );
}
 
export default Liked;