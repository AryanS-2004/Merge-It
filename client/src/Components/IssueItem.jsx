import React from "react";
import LanguageBadgeItem from "./LanguageBadge.jsx";

const IssueListItem = ({issue}) => {
    return (
        <>
            <div className="bg-[#1A202C] text-[#E2E8F0]  rounded-md py-4 px-4 my-4 w-11/12 mx-auto">
                <div className="flex justify-between text-xl pb-2">
                    <div className="flex w-full">
                        <p className="w-1/12">#{issue.number} </p>
                        <h3 className="pl-3 w-4\6">{issue.title}</h3>
                    </div>
                    <div className="w-1/6 ml-auto">
                        <a href={issue.link} target="_blank" className="cursor-pointer px-4 py-2 border rounded-md">Link to Issue</a>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div className="">
                        <p className="">Organization: <a href={issue.orgLink} className="cursor-pointer font-black">{issue.organization}</a> </p>
                        <p className="">Repository: <a href={issue.repoLink}  className="cursor-pointer font-black">{issue.repository}</a> </p>
                        {/*<h3 className="pl-3 w-4\6">{test.title}{test.title}{test.title}{test.title}{test.title}</h3>*/}
                    </div>
                    <div className="">
                        <p className="">Issue opened on: {issue.date} </p>
                        <p className="">Issue opened by: {issue.author} </p>
                    </div>
                </div>
                <div className="flex justify-between pt-2 text-base">
                    {issue.languages?.map((language) =>
                        <LanguageBadgeItem key={language}
                            language={language}/>
                    )}
                </div>
            </div>
        </>
    );

};

export default IssueListItem;