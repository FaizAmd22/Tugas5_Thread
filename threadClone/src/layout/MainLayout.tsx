import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from "react-router-dom"
import Navbar from '../component/Navbar'
import SideProfile from '../component/SideProfile'


function MainLayout() {
  return (
    <>
      <Grid templateColumns='repeat(10, 1fr)' h='100vh'>
        <GridItem colSpan={2} bg='#1D1D1D'>
          <Navbar />
        </GridItem>

        <GridItem colSpan={5} bg='#1D1D1D' borderRight='2px' borderLeft='2px' borderColor='gray.400'>
          <Outlet />
        </GridItem>

        <GridItem colSpan={3} bg='#1D1D1D'>
          <SideProfile />
        </GridItem>
      </Grid>
    </>
  )
}

export default MainLayout
