import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SongSuggestion from "./SongSuggestion";
import GithubInfo from "./cards/GithubInfo";


function Home() {

	return (
		<div className="pt-20 pb-24 max-w-6xl mx-2 lg:mx-auto">
			<GithubInfo />
			<Link to='https://basiclunamusic.vercel.app/'>
				<div className="flex gap-3 w-auto lg:w-full justify-center items-center text-3xl bg-black bg-opacity-50 backdrop-blur-lg p-4 rounded-xl mb-4 hover:scale-105 transition-all">
					<span>Basic Luna music</span>
					<FaArrowRight/>
				</div>
			</Link>

			<SongSuggestion/>
		</div>
	);
}

export default Home;
