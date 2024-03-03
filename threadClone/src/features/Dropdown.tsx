import {  Menu, MenuItem, MenuButton, MenuList, IconButton } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { API } from '../libs/axios';
import * as Swal from 'sweetalert2'

const Dropdown = (data: any) => {
    const token = sessionStorage.getItem("token") 
    // console.log("id :", data.type);
    
    
    const handleDelete = () => {
        // console.log("id :", id.id);
        Swal.fire({
            title: "Are you sure wanna delete?",
            background: "#2b2b2b",
            color: "white",
            showCancelButton: true,
            confirmButtonText: "Yes",
            reverseButtons: true
        }).then( async (result) => {
            // console.log("id :", data.type);
            if (result.isConfirmed) {
                try {
                    if (data.type == "threads") {
                        await API.delete(`/thread/${data.id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                    } else {
                        await API.delete(`/reply/${data.id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        background: "#2b2b2b",
                        color: "white",
                        showConfirmButton: false,
                    })
                    // console.log("response :", response);

                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                } catch (error) {
                    // console.log(error.response.data.message)
                    Swal.fire({
                        icon: "error",
                        title: "Cannot delete!",
                        background: "#2b2b2b",
                        color: "white",
                        showConfirmButton: false,
                    })
                }
            }
        })
        
    }

    return ( 
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<BsThreeDotsVertical />}
                variant='none'
                borderColor='gray.900'
            />
            <MenuList bg='gray.900'>
                <MenuItem
                    icon={<MdEdit />}
                    bg='gray.900'
                    isDisabled
                >
                    Edit
                </MenuItem>

                <MenuItem
                    icon={<MdDeleteForever />}
                    bg='gray.900'
                    onClick={handleDelete}
                >
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
 
export default Dropdown;