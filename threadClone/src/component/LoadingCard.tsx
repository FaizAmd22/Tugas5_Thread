import {
  Stack,
  Box,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

export const LoadingThread = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" w="100%">
      <GridItem>
        <SkeletonCircle w="55px" h="55px" />
      </GridItem>
      <GridItem colSpan={11} display="flex" flexDirection="column" gap={5}>
        <Skeleton width="100%" h="20px" rounded="5" />
        <Skeleton width="100%" h="20px" rounded="5" />
        <Skeleton width="100%" h="20px" rounded="5" />
      </GridItem>
    </Grid>
  );
};

export const LoadingProfile = () => {
  return (
    <Stack>
      <Skeleton width="100%" h="340px" rounded="8" />

      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem
          w="52"
          h="52"
          rounded="full"
          bg="#1D1D1D"
          ml="5"
          mt="-100px"
          zIndex="99"
        >
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <SkeletonCircle w="85%" h="85%" />
          </Flex>
        </GridItem>

        <Spacer />
        <Spacer />

        <GridItem colSpan={1} mr="4">
          <Skeleton h="40px" rounded="20" />
        </GridItem>
      </Grid>

      <Skeleton width="50%" h="20px" rounded="5" />
      <Skeleton width="50%" h="20px" rounded="5" />
      <Skeleton width="50%" h="20px" rounded="5" />
    </Stack>
  );
};

export const LoadingSideProfile = () => {
  return (
    <Stack>
      <Skeleton width="100%" h="200px" rounded="8" />

      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem
          w="32"
          h="32"
          rounded="full"
          bg="#1D1D1D"
          ml="5"
          mt="-50px"
          zIndex="99"
        >
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <SkeletonCircle w="85%" h="85%" />
          </Flex>
        </GridItem>

        <Spacer />

        <GridItem colSpan={2} mr="4">
          <Skeleton h="40px" rounded="20" />
        </GridItem>
      </Grid>

      <Skeleton width="100%" h="20px" rounded="10" />
      <Skeleton width="100%" h="20px" rounded="10" />
      <Skeleton width="100%" h="20px" rounded="10" />
    </Stack>
  );
};

export const LoadingUserCard = () => {
  return (
    <Grid templateColumns="repeat(11, 1fr)" >
      <GridItem display="flex" alignItems="center">
        <SkeletonCircle w="45px" h="45px" />
      </GridItem>

      <GridItem colSpan="6" my="auto" pl="2">
        <Flex flexDirection="column" gap='3'>
          <Skeleton width="100%" h="15px" rounded="5" />
          <Skeleton width="100%" h="15px" rounded="5" />
        </Flex>
      </GridItem>

      <Spacer />

      <GridItem colSpan='3'>
        <Skeleton h="40px" rounded="20" />
      </GridItem>
    </Grid>
  );
};
