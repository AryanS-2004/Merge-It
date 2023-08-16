import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface IssuesProviderProps {
    children: ReactNode;
}


const issueContext = createContext<IssuesContextType | undefined>(undefined);

const IssuesProvider = ({ children }: IssuesProviderProps) => {
    const [user, setUser] = useState<UserLoginSignupResponseData>();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo : UserLoginSignupResponseData = JSON.parse(userInfoString);
            setUser(userInfo);
        } else {
            navigate('/');
        }
    }, [navigate]);
    return (
        <issueContext.Provider value={
            {
                user,
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