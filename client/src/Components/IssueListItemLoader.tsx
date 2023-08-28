
const IssueListItemLoader = () => {

    const loadingArray = Array.from({ length: 8 });
    return (
        <>
            <div className="bg-[#1A202C] text-[#E2E8F0] animate-pulse rounded-md py-4 px-4 my-4 w-11/12 mx-auto">
                <div className="flex justify-between pb-2">
                    <div className="flex w-full sm:block md:block">
                        <div className="w-1/6 flex md:flex md:justify-between md:w-full">
                            <p className="w-full md:flex py-2 px-10 flex flex-col justify-center bg-[#E2E8F0] rounded-xl"></p>
                        </div>
                        <div className="w-full flex justify-center"><h3 className="pl-3 md:pl-0 md:my-2 w-2/3  py-2 sm:w-full md:w-full rounded-xl bg-[#E2E8F0]"></h3></div>
                    </div>
                    <div className="w-60 ml-auto sm:hidden md:hidden">
                        <p className="cursor-pointer px-4 py-2 border rounded-md"> Loading...</p>
                    </div>
                </div>
                <div className="flex justify-between sm:block">
                    <div className="">
                        <div className="flex">
                            <p className="flex py-2 px-16 rounded-xl bg-[#E2E8F0]"></p>
                            <p className="ml-4 flex py-2 px-16 rounded-xl bg-[#E2E8F0]"></p>
                        </div>
                        <div className="py-1"></div>
                        <div className="flex">
                            <p className="flex py-2 px-16 rounded-xl bg-[#E2E8F0]"></p>
                            <p className="ml-4 flex py-2 px-16 rounded-xl bg-[#E2E8F0]"></p>
                        </div>
                </div>
                <div className="">
                <div className="flex sm:my-2">
                            <p className="flex py-2 px-12 rounded-xl bg-[#E2E8F0]"></p>
                        </div>
                        <div className="py-1 sm:py-0"></div>
                        <div className="flex">
                            <p className="flex py-2 px-12 rounded-xl bg-[#E2E8F0]"></p>
                        </div>
                </div>
            </div>
            <div className="flex pt-2 text-base overflow-auto">
                {loadingArray?.map((_, index: number) => <div key={index} className="py-4 px-10 rounded-lg bg-[#E2E8F0] mr-20">

                </div>
                )}
            </div>
        </div >
        </>
    );

};

export default IssueListItemLoader;