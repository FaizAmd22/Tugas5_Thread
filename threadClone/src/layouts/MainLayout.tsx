import { Grid, GridItem, Text } from '@chakra-ui/react'
import { Outlet } from "react-router-dom"
import MobileNavbar from '../component/navbar/MobileNavbar'
import Navbar from '../component/navbar/Navbar'
import SideProfile from '../component/sideProfile/SideProfile'


function MainLayout() {
  return (
    <>
      <Grid templateColumns='repeat(10, 1fr)' h='100vh'>
        <GridItem colSpan={{ base: "10", md: "3", lg: '2' }} zIndex='99' bg='#1D1D1D'>
          <Navbar />
        </GridItem>

        <GridItem colSpan={{ base: "10", md: "7", lg: "5" }} bg='#1D1D1D' borderRight={{base: 'none', md: '2px'}} borderLeft={{base: 'none', md: '2px'}} borderColor='gray.400'>
          <Outlet />
        </GridItem>

          <GridItem colSpan={3} display={{ base: "none", lg: "block" }} bg='#1D1D1D'>
              <SideProfile />
          </GridItem>

        <GridItem bg='black' color='white' h='5vh' colSpan={10} display={{base: 'block', md: 'none'}}>
          <MobileNavbar />
        </GridItem>
      </Grid>
    </>
  )
}

export default MainLayout
