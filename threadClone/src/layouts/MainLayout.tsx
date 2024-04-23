import { Grid, GridItem, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MobileNavbar from "../component/navbar/components/MobileNavbar";
import Navbar from "../component/navbar/index";
import SideProfile from "../component/sideProfile/index";

function MainLayout() {
  return (
    <>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" overflow='hidden'>
        <GridItem
          zIndex="99"
          bg="#1D1D1D"
          colSpan={{ base: "10", md: "3", lg: "2" }}
        >
          <Navbar />
        </GridItem>

        <GridItem
          bg="#1D1D1D"
          borderColor="gray.400"
          borderLeft={{ base: "none", md: "2px" }}
          borderRight={{ base: "none", md: "2px" }}
          colSpan={{ base: "10", md: "7", lg: "5" }}
        >
          <Outlet />
        </GridItem>

        <GridItem
          colSpan={3}
          bg="#1D1D1D"
          display={{ base: "none", lg: "block" }}
        >
          <SideProfile />
        </GridItem>

        <GridItem
          colSpan={10}
          h="5vh"
          bg="black"
          color="white"
          display={{ base: "block", md: "none" }}
        >
          <MobileNavbar />
        </GridItem>
      </Grid>
    </>
  );
}

export default MainLayout;
