import { Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator, Box } from '@chakra-ui/react'
import datas from "../mocks/users.json"
import {useState, useEffect} from 'react'
import { UsersInterface } from '../interfaces/UsersInterface'
import CardUser from '../component/CardUser'
import { API } from '../libs/axios'

const Follows = () => {
    // const [data, setData] = useState<UsersInterface[]>([])
    const userId = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    const [following, setFollowing] = useState<UsersInterface>([])
    const [follower, setFollower] = useState<UsersInterface>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.get(`/follow/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log("response :", response.data);
            
            setFollower(response.data.follower)
            setFollowing(response.data.following)
        }

        fetchData()
        // setData(datas)
    }, [])

    // console.log("data :", data)
    return ( 
        <Stack
            h={{ base: "78vh", md: '100vh' }}
            color='white'
            py={{ base: '0', md: '4' }}
            px='4'
        >
            <Text
                fontSize='2xl'
                pt={{ base: '0', md: '4' }}
                fontWeight='semibold'
            >
                Follows
            </Text>

            <Tabs isFitted variant='unstyled'>
                <TabList>
                    <Tab>Followers</Tab>
                    <Tab>Following</Tab>
                </TabList>

                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="green.500"
                    borderRadius="1px"
                />

                <TabPanels>
                    <TabPanel
                        h={{ base: '72vh', md: '85vh' }}
                        overflow='auto'
                        sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            borderRadius: 'full',
                            backgroundColor: `none`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `green.500`,
                            }
                        }}
                    >
                        {follower.map((data: UsersInterface, index: number) => {
                            return (
                                <Box color='white' key={index} py='3'>
                                    <CardUser
                                        name={data.name}
                                        picture={data.picture}
                                        username={data.username}
                                    />
                                </Box>
                            )
                        })}
                    </TabPanel>

                    <TabPanel
                        h={{ base: '72vh', md: '85vh' }}
                        overflow='auto'
                        sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            borderRadius: 'full',
                            backgroundColor: `none`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `green.500`,
                            }
                        }}
                    >
                        {following.map((data: UsersInterface, index: number) => {
                            return (
                                <Box color='white' key={index} py='3'>
                                    <CardUser
                                        name={data.name}
                                        username={data.username}
                                        picture={data.picture}
                                    />
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