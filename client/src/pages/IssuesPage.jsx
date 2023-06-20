import {IssuesState} from "../Context/IssuesProvider.jsx";
import {Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon, DeleteIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import LanguageBadgeItem from "../Components/LanguageBadge.jsx";
import IssueListItem from "../Components/IssueItem.jsx";

const IssuesPage = () => {
    const {user} = IssuesState();
    const [issues, setIssues] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [repoLink1, setRepoLink1] = useState("");
    const [repoLink2, setRepoLink2] = useState("");
    const [fetchAgain, setFetchAgain] = useState(false);


    const navigate = useNavigate();
    const toast = useToast();


    const Languages = [
        "Batchfile",
        "C",
        "C#",
        "C++",
        "CMake",
        "CSS",
        "CSV",
        "Dart",
        "DockerFile",
        "EJS",
        "Go",
        "HTML",
        "Java",
        "JavaScript",
        "JSON",
        "Julia",
        "Jupyter Notebook",
        "Kotlin",
        "MakeFile",
        "MATLAB",
        "Nginx",
        "Objective-C",
        "Objective-C++",
        "Pascal",
        "PHP",
        "PowerShell",
        "Prisma",
        "Procfile",
        "Python",
        "R",
        "Ruby",
        "Rust",
        "Scala",
        "Shell",
        "Solidity",
        "Swift",
        "TypeScript",
        "Verilog",
        "Vim Script",
        "Vue",
        "XML",
        "YAML",
    ];


    const validateRepoLink = () => {
        const linkPattern = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
        if (!linkPattern.test(repoLink)) {
            toast({
                title: `Please enter correct link`,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return false;
        }
        return true;
    };
    const checkRepositoryExistence = async () => {
        try {
            const splittedRepoLink = repoLink.split('/');
            const owner = splittedRepoLink[splittedRepoLink.length - 2];
            const repo = splittedRepoLink[splittedRepoLink.length - 1];
            const config = {
                headers: {
                    Authorization: `${process.env.GITHUB_PAT}`
                }
            }
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, config);
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    const fetchIssues = async () => {
        try {
            toast({
                title: "Loading!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            const config = {
                headers: {
                    authorization:`Bearer ${user.token}`,
                    "Content-type": "application/json"
                }
            }

            const getIssues = await axios.get("http://localhost:3000/api/issues", config);
            if(selectedLanguage!==""){
                getIssues.data = getIssues.data.filter((issue) => issue.languages.includes(selectedLanguage))
                if(getIssues.data.length===0){
                    toast({
                        title: `No issues for the language : ${selectedLanguage} !`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom'
                    })
                }
                setIssues(getIssues.data)
                if(getIssues.data.length!==0){
                    toast({
                        title: "Success!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom'
                    })
                }
            }else{
                setIssues(getIssues.data);
                toast({
                    title: "Success!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
            }

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }
    useEffect(() => {
        if(user){
            fetchIssues();
        }
    },[user,selectedLanguage, fetchAgain]);


    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }

    const addRepo = async () => {

        if(repoLink1===''){
            return;
        }
        try{
            const config ={
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }

            const response = await axios.put("http://localhost:3000/api/repos/addRepo", {
                link: repoLink1 +"/issues"
            }, config);
            setRepoLink1("");
            setFetchAgain(!fetchAgain);
            console.log(user);
            toast({
                title: "Repository added!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }catch(err){
            toast({
                title: "Error Occured!",
                description: err.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    const removeRepo = async () => {
        if(repoLink2===''){
            return;
        }
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                data: {
                    link: repoLink2 + "/issues",
                },
            };
            const response = await axios.delete("http://localhost:3000/api/repos/removeRepo", config);
            setRepoLink2("");
            setFetchAgain(!fetchAgain);
            console.log(user);
            toast({
                title: "Repository removed!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })

        }catch(err){
            toast({
                title: "Error Occured!",
                description: err.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    if (user) {
        return (
            <>
                <div style={{height: "100vh", fontFamily: "Josefin Sans"}}>
                    <div className="flex bg-[#1A202C] text-[#E2E8F0] text-center  rounded-md py-4  justify-between">
                        <div className="pl-8 font-['Sacramento'] text-4xl font-black">
                            Merge It
                        </div>
                        <div className="pr-8">
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} backgroundColor="#284b63">
                                    <Avatar size="sm" cursor="pointer" name={user.name}/>
                                </MenuButton>
                                <MenuList color="#1A202C">
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                    <div className="flex justify-between w-11/12 mx-auto mb- 2 pt-4">
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Language
                            </MenuButton>
                            <MenuList className="max-h-64 overflow-y-auto">
                                {Languages.map((language)=> <MenuItem key={language} onClick={() => setSelectedLanguage(language)}>
                                        {language}</MenuItem>
                                    )}
                            </MenuList>
                        </Menu>
                        <div>
                            <input
                                style={{fontFamily: "Josefin Sans",}}
                                type="text"
                                value={repoLink1}
                                placeholder="Add Repository Link"
                                onChange={(e) => setRepoLink1(e.target.value)}
                                className="rounded-lg p-2 border-t  mr-0 border-b border-l text-gray-900 border-gray-200 bg-white"
                            />
                                <AddIcon onClick={addRepo} boxSize={8} color = "gray.200" ml={2}/>
                        </div>
                        <div>
                            <input
                                style={{fontFamily: "Josefin Sans",}}
                                type="text"
                                value={repoLink2}
                                placeholder="Add Repository Link"
                                onChange={(e) => setRepoLink2(e.target.value)}
                                className="rounded-lg p-2 border-t  mr-0 border-b border-l text-gray-900 border-gray-200 bg-white"
                            />
                            <DeleteIcon onClick={removeRepo} boxSize={8} color = "gray.200" ml={2}/>
                        </div>
                    </div>
                    <div className="max-h-full overflow-y-auto pb-4" style={{ scrollbarColor: "#FFF transparent" }}>
                        {
                            issues?.map( (issue)=> <IssueListItem
                                key={issue.title}
                                issue = {issue}
                            />)
                        }
                    </div>


                </div>

            </>
        )
    }

}

export default IssuesPage;