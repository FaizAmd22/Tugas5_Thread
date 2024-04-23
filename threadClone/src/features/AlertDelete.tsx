import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  useToast
} from "@chakra-ui/react";
import { useRef } from "react";
import { API } from "../libs/axios";
import { MdDeleteForever } from "react-icons/md";
import { useProfileHooks } from "../hooks/profile";
import { useThreadsHooks } from "../hooks/threads";
import { useProfileThreadHooks } from "../hooks/profileThread";
import { useDetailThreadHooks } from "../hooks/detailThread";
import { useDispatch } from "react-redux";
import { setIsFetchDetail } from "../slices/detailThreadSlice";

export default function AlertDelete(data: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const currentUrl = window.location.href
  const toast = useToast()
  const dispatch = useDispatch()
  const token = sessionStorage.getItem("token");
  const { fetchDetailAuth } = useDetailThreadHooks();
  const { fetchProfileThreadAuth } = useProfileThreadHooks();
  const { fetchThreadAuth } = useThreadsHooks();

  console.log("type :", data);
  
  const handleDelete = async () => {
    // onClose()
    try {
      if (data.type == "threads") {
        const response = await API.delete(`/thread/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response delete :", response);
      } else {
        const response = await API.delete(`/reply/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response delete :", response);
      }

      // fetchProfile()
      fetchDetailAuth();
      fetchThreadAuth();
      fetchProfileThreadAuth();
      toast({
        position: 'top',
        title: 'Delete Success!',
        status: 'success',
        duration: 1500,
        isClosable: true,
      })
      onClose();
      if (currentUrl.includes("details") && data.type == "threads") {
        window.history.back()
      }
    } catch (error) {
      toast({
        position: 'top',
        title: "You don't have permisson!",
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
      onClose();
    }
    // window.location.reload()
  };

  return (
    <>
      <Button w='100%' padding={0} gap='2' colorScheme='red' onClick={onOpen}>
        <MdDeleteForever /> Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg='#1D1D1D' color='white'>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {data.type == "threads" ? "Delete This Thread?" : "Delete This Reply?"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
