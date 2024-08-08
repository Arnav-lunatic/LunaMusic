import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SongSuggestion from "./SongSuggestion";


function Home() {

	return (
		<div className="py-20 max-w-6xl m-auto">
			<Link to='/playlist/saved-music'>
				<div className="flex gap-3 justify-center items-center text-3xl bg-black bg-opacity-50 backdrop-blur-lg p-4 rounded-xl mx-4 mb-10">
					<span>Basic Luna music</span>
					<FaArrowRight/>
				</div>
			</Link>

			<SongSuggestion/>

			{/* Remove it later */}
			{/* <div className="absolute top-1/2 left-1/2 max-w-md opacity-85 -translate-x-1/2 -translate-y-1/2 grid gap-4	 text-center align-middle content-center -z-10">
				<h1 className="text-center text-3xl font-bold">
					More Features Coming soon
				</h1>
				<h1 className="text-xl font-semibold">
					Play or Download your favorite music{" "}
				</h1>
				<h1>
					This is a beta version and may contain bugs. I am actively
					working on improvements and will address any issues in
					future updates.
				</h1>
			</div> */}
		</div>
	);
}

export default Home;
