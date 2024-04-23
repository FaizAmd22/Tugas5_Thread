import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Button,
  useDisclosure,
  Image,
  Circle,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../libs/axios";
import { FaEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { selectUser } from "../slices/userSlice";
import { useProfileHooks } from "../hooks/profile";
import { useSideProfileHooks } from "../hooks/sideProfile";
import { useThreadsHooks } from "../hooks/threads";
import { useDetailThreadHooks } from "../hooks/detailThread";
import { useProfileThreadHooks } from "../hooks/profileThread";

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(selectUser);
  const toast = useToast();
  const [inputData, setInputData] = useState({
    username: null,
    name: null,
    bio: null,
  });
  const [picture, setPicture] = useState<string | null>(null);
  const [previewPicture, setPreviewPicture] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const { fetchProfile } = useProfileHooks();
  const { fetchCurrentUser } = useSideProfileHooks();
  const { fetchThreadAuth } = useThreadsHooks();
  const { fetchProfileThreadAuth } = useProfileThreadHooks();
  const { fetchDetailAuth } = useDetailThreadHooks();

  useEffect(() => {
    if (user) {
      setInputData(() => ({
        username: user.username,
        name: user.name,
        bio: user.bio,
      }));
      setPicture(user.picture);
      setPreviewPicture(user.picture);
      setCover(user.cover_photo);
      setPreviewCover(user.cover_photo);
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setPicture(user.picture);
    setPreviewPicture(user.picture);
    setCover(user.cover_photo);
    setPreviewCover(user.cover_photo);
    onClose();
  };

  const handlePicture = (e: any) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPicture(selectedImage);
          setPreviewPicture(reader.result);
        }
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleCover = (e: any) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCover(selectedImage);
          setPreviewCover(reader.result);
        }
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async () => {
    const userId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    const response = await API.patch(`/user/update/${userId}`, inputData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (picture != user.picture) {
      const responsePicture = await API.patch(
        `/user/picture/${userId}`,
        { picture: picture },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("response : ", responsePicture);
    }

    if (cover != user.cover_photo) {
      const responseCover = await API.patch(
        `/user/cover/${userId}`,
        { cover_photo: cover },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("response : ", responseCover);
    }

    // console.log("response : ", response);
    const PostThreadPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // fetchCurrentUser();
        // fetchProfile();
        // fetchThreadAuth();
        // fetchDetailAuth();
        // fetchProfileThreadAuth();
        resolve(0);
      }, 1000);
    });

    toast.promise(PostThreadPromise, {
      success: {
        title: "Profile Updated!",
        position: "top",
        description: "Your profile has been updated successfully!",
      },
      error: {
        title: "Error",
        position: "top",
        description: "An error occurred while update profile",
      },
      loading: {
        title: "Update Profile",
        position: "top",
        description: "Please wait...",
      },
    });

    // fetchDetail()
    fetchCurrentUser();
    fetchProfile();
    fetchThreadAuth();
    fetchDetailAuth();
    fetchProfileThreadAuth();
    onClose();
    // window.location.reload();
  };

  // console.log("inputData :", inputData);
  // console.log("picture :", picture);
  // console.log("cover :", cover);

  return (
    <>
      <Button
        w="11vw"
        px="5"
        bg="none"
        border="2px"
        color="white"
        rounded="full"
        fontSize="14px"
        textAlign="center"
        borderColor="white"
        _hover={{ bg: "none", color: "green.400", borderColor: "green.400" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal
        isCentered
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay onClick={handleClose} />

        <ModalContent bg="#1D1D1D" color="white">
          <ModalHeader>Edit Profile</ModalHeader>

          <ModalCloseButton onClick={handleClose} />

          <ModalBody w="100%" margin="auto">
            {/* <form> */}
            <InputGroup w="100%" _hover={{ color: "white" }}>
              <InputLeftElement
                pointerEvents="none"
                cursor="pointer"
                w="100%"
                h="200px"
              >
                <Image
                  src={
                    previewCover ||
                    "https://wallpapers.com/images/high/blue-gradient-background-gu71dwd19no9ra2v.webp"
                  }
                  rounded="lg"
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
              </InputLeftElement>

              <Input
                opacity="0"
                // bg='red'
                type="file"
                name="cover_photo"
                cursor="pointer"
                w="100%"
                // placeholder="edit cover"
                // _placeholder={{ opacity: 1, color: "red" }}
                zIndex="100"
                accept="image/*"
                onChange={handleCover}
              />

              <InputRightElement>
                <Text
                  bg="#1D1D1D"
                  color="white"
                  p="5"
                  rounded="full"
                  fontSize="20px"
                >
                  <FaEdit />
                </Text>
              </InputRightElement>
            </InputGroup>

            <InputGroup
              w="150px"
              bg="#1D1D1D"
              mt="80px"
              rounded="full"
              color="green.500"
              cursor="pointer"
              _hover={{ color: "white" }}
            >
              <InputLeftElement
                pointerEvents="none"
                cursor="pointer"
                w="150px"
                h="150px"
              >
                <Circle position="relative">
                  <Image
                    src={
                      previewPicture ||
                      "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
                    }
                    rounded="full"
                    w="120px"
                    h="120px"
                    objectFit="cover"
                  />
                </Circle>
              </InputLeftElement>

              <InputGroup
                opacity="0"
                name="picture"
                w="150px"
                h="150px"
                rounded="full"
                zIndex="99"
                margin="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                transition="opacity 0.3s"
                _hover={{ opacity: "0.9" }}
              >
                <InputRightElement
                  w="120px"
                  h="120px"
                  bg="black"
                  rounded="full"
                  position="absolute"
                  left="15px"
                  top="15px"
                >
                  <Text color="white" fontSize="3xl">
                    <CiEdit />
                  </Text>
                </InputRightElement>
                <Input
                  // bg="#000000ac"
                  opacity="0"
                  w="120px"
                  h="120px"
                  rounded="full"
                  border="none"
                  cursor="pointer"
                  zIndex="99"
                  type="file"
                  accept="image/*"
                  onChange={handlePicture}
                />
              </InputGroup>
            </InputGroup>

            <Input
              my="3"
              rounded="none"
              borderRight="none"
              borderLeft="none"
              borderTop="none"
              borderBottom="1px"
              focusBorderColor="#1D1D1D"
              value={inputData.name}
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <Input
              rounded="none"
              borderRight="none"
              borderLeft="none"
              borderTop="none"
              borderBottom="1px"
              focusBorderColor="#1D1D1D"
              value={inputData.username}
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <Input
              my="3"
              rounded="none"
              borderRight="none"
              borderLeft="none"
              borderTop="none"
              borderBottom="1px"
              focusBorderColor="#1D1D1D"
              value={inputData.bio}
              placeholder="Bio"
              name="bio"
              onChange={handleChange}
            />
            {/* </form> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              rounded="full"
              mr={5}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button colorScheme="green" rounded="full" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
