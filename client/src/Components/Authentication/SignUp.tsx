import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUp() {

    const [show, setShow] = useState<boolean>(false);

    const [name, setName] = useState<string>("");

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [Loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show);
    };


    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/`,
                {name, email, password},
                config
            )
            const data : UserLoginSignupResponseData = response.data;
            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/issues');
        } catch (error : any) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);

        }
    }

    return (
        <>
            <VStack spacing='5px' >
                <FormControl id='first-name' isRequired borderColor="#415a77">
                    <FormLabel>Name</FormLabel>
                    <Input
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                    ></Input>
                </FormControl>
                <FormControl id='email' isRequired borderColor="#415a77">
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </FormControl>
                <FormControl id='password' isRequired borderColor="#415a77">
                    <FormLabel>Password</FormLabel>
                    <InputGroup borderColor="#415a77">
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? "Hide" : "show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl >
                <FormControl id='ConfirmPassword' isRequired >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup borderColor="#415a77">
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Enter your password again"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Input>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? "Hide" : "show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    width='100%'
                    bgColor="#284b63"
                    style={{marginTop: 15}}
                    onClick={submitHandler}
                    isLoading={Loading}
                >Sign Up</Button>
            </VStack>
        </>
    );
}

export default SignUp;