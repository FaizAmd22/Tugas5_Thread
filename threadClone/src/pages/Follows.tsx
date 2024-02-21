import { Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator, Box } from '@chakra-ui/react'
import datas from "../mocks/users.json"
import {useState, useEffect} from 'react'
import RecommendFollow from '../component/RecommendFollow'
import { UsersInterface } from '../interfaces/UsersInterface'

const Follows = () => {
    const [data, setData] = useState<UsersInterface[]>([])
    
    useEffect(() => {
        setData(datas)
    }, [])
    const { name, bio, followers, following, picture, username } = datas[0]

    console.log("data :", data)
    return ( 
        <Stack h={{ base: "78vh", md: '100vh' }} color='white' py={{base: '0', md: '4'}} px='4'>
            <Text fontSize='2xl' pt={{base: '0', md: '4'}} fontWeight='semibold'  >
                Follows
            </Text>

            <Tabs isFitted variant='unstyled'>
                <TabList>
                    <Tab>Followers</Tab>
                    <Tab>Followers</Tab>
                </TabList>
                <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="green.500"
                borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel h={{ base: '72vh', md: '85vh' }} sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            borderRadius: 'full',
                            backgroundColor: `none`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `green.500`,
                        }
                    }} overflow='auto'>
                        {data.map((data: UsersInterface, index: number) => {
                            return (
                                <Box color='white' key={index} py='3'>
                                    <RecommendFollow name={data.name} username={data.username} picture={data.picture} />
                                </Box>
                            )
                        })}
                    </TabPanel>

                    <TabPanel h={{ base: '72vh', md: '85vh' }} sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            borderRadius: 'full',
                            backgroundColor: `none`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `green.500`,
                        }
                    }} overflow='auto'>
                        {data.map((data: UsersInterface, index: number) => {
                            return (
                                <Box color='white' key={index} py='3'>
                                    <RecommendFollow name={data.name} username={data.username} picture={data.picture} />
                                </Box>
                            )
                        })}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
     );
}
 
export default Follows;