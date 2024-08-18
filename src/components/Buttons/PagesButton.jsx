import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function PagesButton({ pageNum, setPageNum, linkTo }) {
	const navigate = useNavigate();

	const handleNext = () => {
		setPageNum((pageNum) => Number(pageNum) + 1);
	};

	const handlePrev = () => {
		setPageNum((pageNum) => (pageNum <= 1 ? (pageNum = 1) : pageNum - 1));
    };
    
    const handleMultiNext = () => {
        setPageNum((pageNum) => pageNum + 4);
    }

    const handlePrevToFirst = () => {
        setPageNum(1)
    }

    useEffect(() => {
        navigate(linkTo)
    }, [pageNum])
    

	return (
		<div className="flex justify-between w-full max-w-sm lg:max-w-3xl text-xl bg-black bg-opacity-50 backdrop-blur-lg rounded-md mt-1 px-2 py-1 mx-auto lg:mx-0">
			<button onClick={handlePrev} className="flex items-center">
				<IoIosArrowBack /> Previous
            </button>
            
            <div className="flex gap-4">
                {pageNum == 1 ? '' : <button onClick={handlePrevToFirst}>01 ...</button>}
                
                <h1
                    className="font-extrabold text-2xl cursor-default">
                    { (pageNum < 10 ? '0' : '') + pageNum}
                </h1>

                <button
                onClick={handleMultiNext}
                >... {(pageNum + 4 < 10 ? '0' : '') + (pageNum + 4)}</button>
			</div>

			<button onClick={handleNext} className="flex items-center">
				Next <IoIosArrowForward />
			</button>
		</div>
	);
}

export default PagesButton;
