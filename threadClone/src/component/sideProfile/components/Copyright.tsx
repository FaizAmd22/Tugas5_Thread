import { Box, Text, Flex, Center, Link, Image } from "@chakra-ui/react";
import icon from "../../../assets/icon.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

const Copyright = () => {
  return (
    <Box p="4" rounded="lg" color="white" bg="#262626" fontSize="12px">
        <Flex mb="2">
          <Center>
            <Text>
              <Flex gap={1}>
                Developed by
                <Text fontWeight="bold">Faizhal Ahmad</Text>
              </Flex>

              <Box pt="1">
                <Flex gap="3">
                  <Link
                    target="_blank"
                    href="https://github.com/"
                    fontSize="lg"
                    _hover={{ color: "green.500" }}
                  >
                    <FaGithub />
                  </Link>

                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/"
                    fontSize="lg"
                    _hover={{ color: "green.500" }}
                  >
                    <FaLinkedin />
                  </Link>

                  <Link
                    target="_blank"
                    href="https://www.facebook.com"
                    fontSize="lg"
                    _hover={{ color: "green.500" }}
                  >
                    <FaFacebook />
                  </Link>

                  <Link
                    target="_blank"
                    href="http://instagram.com/"
                    fontSize="lg"
                    _hover={{ color: "green.500" }}
                  >
                    <PiInstagramLogoFill />
                  </Link>
                </Flex>
              </Box>
            </Text>
          </Center>
        </Flex>

        <Text colSpan="5" color="gray.500">
          <Flex gap="2">
            Powered by Dumbways Indonesia
            <Image src={icon} w="20px" />
          </Flex>
          #1CodingBootcamp
        </Text>
      </Box>
  )
}

export default Copyright