import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const issueContext = createContext();

const IssuesProvider = ({children}) => {
    const [user, setUser] = useState();
    const [selectedIssue, setSelectedIssue] = useState();
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <issueContext.Provider value={
            {
                user,
                setUser,
                selectedIssue,
                setSelectedIssue,
                issues,
                setIssues,
            }
        }
        >
            {children}
        </issueContext.Provider>
    )
}

export const IssuesState = () => {
    return useContext(issueContext);
}

export default IssuesProvider;