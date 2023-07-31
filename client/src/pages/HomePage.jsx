import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import Login from "../Components/Authentication/Login.jsx";
import SignUp from "../Components/Authentication/SignUp.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if(user){
            navigate('/issues')
        }
    }, [navigate]);
    return (
        <>
            <Container maxW = 'xl' centerContent fontFamily="Josefin Sans" >
                <Box
                    d="flex"
                    textAlign='center'
                    p={3}
                    bg = 'gray.800'
                    width = '100%'
                    m = '40px 0 15px 0'
                    borderRadius = 'lg'
                    borderWidth = '1px'
                    borderColor="#415a77"
                >
                    <Text fontSize = '4xl' fontFamily='Josefin Sans'  color="gray.200">
                        Merge It
                    </Text>
                </Box>
                <Box
                    p={4}
                    bg = 'gray.800'
                    width = '100%'
                    color="gray.200"
                    borderRadius = 'lg'
                    borderWidth = '1px'
                    borderColor="#415a77"
                >
                    <Tabs variant='soft-rounded' colorScheme="blue">
                        <TabList mb='1em'>
                            <Tab width='50%' color="gray.200">Login</Tab>
                            <Tab width='50%' color="gray.200">Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login/>
                            </TabPanel>
                            <TabPanel>
                                <SignUp/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </>
    )
}

export default HomePage