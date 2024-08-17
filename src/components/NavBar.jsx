import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";


function NavBar() {
	const { show_sidebar_menu, setShow_sidebar_menu, sideBarButtonRef, setSearchParams, searchValue, setSearchValue, searchParams } = useContext(SearchContext)
	const navigate = useNavigate()

	const handleSearchButtonClick = () => {
		if (searchValue) {
			setSearchParams({v: searchValue})
		}
	};

	const handleChange = (event) => {
		setSearchValue(event.target.value)
	}

	useEffect(() => {
		handleSearchButtonClick()
	}, []);

	const handle_sidebar_menu = () => {
		setShow_sidebar_menu((val) => !val)
	} 

	return (
		<div className="fixed m-auto top-1 right-1 left-1 md:right-4 md:left-4 flex justify-between pr-1 pl-2 md:pr-4 md:pl-4 rounded-xl bg-black bg-opacity-40 backdrop-blur-lg z-50">
			<button
				ref={sideBarButtonRef}
				className="flex flex-col gap-[7px] justify-center"
				onClick={handle_sidebar_menu}>
				<div className={`w-[40px] h-[7px] bg-white rounded-lg origin-left transition-all duration-500 ${show_sidebar_menu? 'rotate-45' : 'rotate-0'}`}></div>
				<div className={`w-[40px] h-[7px] bg-white rounded-lg origin-left transition-all duration-500 ${show_sidebar_menu? 'opacity-0' : 'opacity-100'}`}></div>
				<div className={`w-[40px] h-[7px] bg-white rounded-lg origin-left transition-all duration-500 ${show_sidebar_menu? '-rotate-45' : 'rotate-0'}`}></div>
			</button>
			
			<div className="flex items-center m-2">
				<input
					type="text"
					placeholder="Search"
					value={searchValue}
					onChange={handleChange}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							navigate(`/search/songs?v=${searchParams.get('v')}`)
							handleSearchButtonClick();
						}
					}}
					className="p-2 w-screen bg-zinc-800 max-w-64 rounded-l-lg text-lg font-semibold bg-opacity-50 md:max-w-2xl"
				/>

				<Link to={`/search/songs?v=${searchParams.get('v')}`} className="flex items-center ">
					<button
						data-tooltip-id="my-tooltip"
						data-tooltip-content="Search"
						data-tooltip-place="bottom"
						data-tooltip-delay-show="700"
						onClick={handleSearchButtonClick}
						className=" bg-zinc-950 rounded-r-lg bg-opacity-40"
					>
						<svg
							className="h-10 pr-3 pl-3 pt-1 pb-1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="#ffffff"
								d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
							/>
						</svg>
					</button>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
