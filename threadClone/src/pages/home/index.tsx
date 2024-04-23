import { Text, Stack, Radio, RadioGroup } from "@chakra-ui/react";
import CreatePost from "../../features/CreatePost";
import Threads from "./components/Threads";
import { useState } from "react";

const Home = () => {
  const token = sessionStorage.getItem("token");
  const [value, setValue] = useState("1");

  return (
    <Stack p="4" pb="0" color="white" h={{ base: "82vh", md: "100vh" }}>
      <Text
        py="4"
        fontSize="2xl"
        fontWeight="semibold"
        display={{ base: "none", md: "block" }}
      >
        Home
      </Text>

      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </Stack>
      </RadioGroup>

      {token && <CreatePost type="threads" />}

      <Threads />
    </Stack>
  );
};

export default Home;
