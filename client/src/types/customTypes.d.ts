type UserLoginSignupResponseData = {
    _id: any,
    name: string,
    email: string,
    token: string
}

type Issue = {
    organization: string;
    repository: string;
    title: string;
    number: string;
    date: string;
    dateNum: number;
    author: string;
    link: string;
    languages: string[];
    orgLink: string;
    repoLink: string;
}


type IssueStateProps = {
    user: UserLoginSignupResponseData
}


interface IssuesContextType {
    user?: UserLoginSignupResponseData;
}