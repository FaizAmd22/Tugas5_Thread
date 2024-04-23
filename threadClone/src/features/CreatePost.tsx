import {
  Box,
  Avatar,
  Input,
  Flex,
  Button,
  Center,
  Spacer,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Image,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../libs/axios";
import { IoCloseCircle } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { selectUser } from "../slices/userSlice";
import { useThreadsHooks } from "../hooks/threads";
import { useDetailThreadHooks } from "../hooks/detailThread";
import { setIsFetchDetail } from "../slices/detailThreadSlice";

interface IType  {
  id: number
  type: string
}

interface inputData {
  content: string | null
  image: any
}

const CreatePost = (type: IType) => {
  const user = useSelector(selectUser);
  const toast = useToast();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { fetchThreadAuth} = useThreadsHooks();
  const { fetchDetailAuth } = useDetailThreadHooks();

  // console.log("token :", token);
  console.log("types :", type);

  const [formData, setFormData] = useState<inputData>({
    content: type.type == "threads" ? null : "",
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const selectedImage = files[0];
      // console.log("set Image :", selectedImage);

      setFormData((prevData) => ({
        ...prevData,
        image: selectedImage,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (formData.content == "") {
      setFormData((prevData) => ({
        ...prevData,
        content: null,
      }));
    }
  };
  console.log("formDatra :", formData);

  const handleSubmit = async () => {
    const PostThreadPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        fetchThreadAuth();
        fetchDetailAuth();
        setFormData({
          content: "",
          image: null,
        });
        resolve(0);
      }, 700);
    });

    if ((formData.content == null || !formData.content) && formData.image == null) {
      return toast({
        position: 'top',
        title: "Data can't be empty!",
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
    }

    try {
      if (type.type == "threads") {
        const response = await API.post("/thread", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.promise(
          PostThreadPromise,
          {
            success: {
              title: "Thread Posted",
              position: "top",
              description: "Your thread has been posted successfully!",
            },
            error: {
              title: "Error",
              position: "top",
              description: "An error occurred while posting thread",
            },
            loading: {
              title: "Posting Thread",
              position: "top",
              description: "Please wait...",
            },
          },
        );
        setFormData({
          content: "",
          image: null,
        });
        // window.location.reload();
      } else {
        const response = await API.post(`/thread/${type.id}/reply`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.promise(
          PostThreadPromise,
          {
            success: {
              title: "Reply Posted",
              position: "top",
              description: "Your reply has been posted successfully!",
            },
            error: {
              title: "Error",
              position: "top",
              description: "An error occurred while posting reply",
            },
            loading: {
              title: "Posting Reply",
              position: "top",
              description: "Please wait...",
            },
          },
        );
        fetchThreadAuth();
        fetchDetailAuth();
        dispatch(setIsFetchDetail(true));
        console.log("response :", response);
        // window.location.reload()
      }
    } catch (error) {
      toast({
        position: 'top',
        title: "Something error while post!",
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
      console.log(error);
    }
  };

  return (
    <Box color="white" pb="2">
      <Grid templateColumns="repeat(13, 1fr)">
        <GridItem mr="2">
          <Avatar
            src={
              user.picture
                ? user.picture
                : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
            }
            name={user.name}
            w="50px"
            h="50px"
          />
        </GridItem>

        <GridItem colSpan={10}>
          <Input
            onChange={handleChange}
            value={formData.content}
            type="text"
            border="none"
            name="content"
            focusBorderColor="none"
            placeholder={
              type.type == "replies"
                ? "Type your reply!"
                : "What is happening?!"
            }
          />
        </GridItem>

        <Spacer />

        <Center>
          <Flex justifyContent="center">
            <InputGroup
              w="50px"
              h="100%"
              fontSize="3xl"
              color="green.500"
              _hover={{ color: "white" }}
            >
              <InputLeftElement pointerEvents="none" fontSize="3xl">
                <BiSolidImageAdd />
              </InputLeftElement>

              <Input
                opacity="0"
                type="file"
                name="image"
                onChange={handleChange}
              />
            </InputGroup>
          </Flex>

          <Button
            px="7"
            color="white"
            bg="green.500"
            borderRadius="full"
            _hover={{ color: "green.500", bg: "white" }}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Center>
      </Grid>

      <Grid templateColumns="repeat(13, 1fr)">
        <GridItem w="75px" />
        <GridItem colSpan={5}>
          {formData.image && (
            <>
              <IconButton
                icon={<IoCloseCircle />}
                ml="-20px"
                mb="-20px"
                bg="none"
                isRound={true}
                variant="solid"
                color="red.600"
                fontSize="28px"
                _hover={{ bg: "none", color: "white" }}
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    image: null,
                  }))
                }
              />

              <Image src={URL.createObjectURL(formData.image)} h="120px" />
            </>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreatePost;
