import { Text, Box, Stack, Image, Grid, GridItem, Spacer, Button, Center, Flex } from '@chakra-ui/react'
import * as React from 'react';
import { useParams } from 'react-router-dom';

const DetailThread = () => {
    let { id } = useParams()
    
    console.log("id", id)

    return ( 
        <Box>
            <Text color='white'>Helloooo</Text>
        </Box>
    );
}
 
export default DetailThread;