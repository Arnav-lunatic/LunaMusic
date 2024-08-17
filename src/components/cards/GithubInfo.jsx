import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
function GithubInfo() {
	const [showInfo, setShowInfo] = useState(true);

	const closeInfo = () => {
		setShowInfo(false);
	};

	return (
		<>
			{showInfo ? (
				<div className="relative flex flex-col lg:flex-row gap-4 bg-black bg-opacity-45 backdrop-blur-lg px-2 rounded-xl pt-8 lg:pt-2 py-2 mb-4 lg:m-4">
					<IoIosClose
						onClick={closeInfo}
						className="absolute left-0 top-0 w-12 h-12 rounded-full z-20 cursor-pointer"
					/>

					<Link
						target="_blank"
						to={"https://github.com/Arnav-lunatic/LunaMusic"}
						className="flex-1 flex gap-2 flex-col items-center justify-center text-center hover:scale-105 transition-all"
					>
						<div className="flex justify-center items-center gap-2 text-3xl lg:text-5xl font-bold">
							<FaGithub />
							<h1>Github</h1>
							<MdArrowOutward />
						</div>

						<h1 className="opacity-50">
							github.com/Arnav-lunatic/LunaMusic
						</h1>

						<h1 className="text-xl w-full lg:w-2/3">
							I would appreciate it if you could give this project
							a star on github
						</h1>
					</Link>

					<div className="grid justify-items-center gap-4 text-center flex-1 border-2 border-zinc-400 rounded-b-lg lg:rounded-none lg:rounded-r-lg py-4">
						<h1 className="text-2xl lg:text-3xl font-bold w-full lg:w-4/5">
							More Features Coming soon
						</h1>
						<h1 className="text-lg lg:text-xl font-semibold w-full lg:w-2/3">
							Play or Download your favorite music{" "}
						</h1>
						<h1 className="w-full lg:w-2/3">
							This is a beta version and may contain bugs. I am
							actively working on improvements and will address
							any issues in future updates.
						</h1>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}

export default GithubInfo;
