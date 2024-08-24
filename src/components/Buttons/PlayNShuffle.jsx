import React, { useContext } from "react";
import { FaShuffle, FaPlay } from "react-icons/fa6";
import { SearchContext } from "../../context/SearchContext";

function PlayNShuffle({playlist}) {
	const { setQueue, setPause, } = useContext(SearchContext)
	
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const handlePlayAll = () => {
		setQueue(playlist);
		setPause(true);					
	};

	const handleShuffle = () => {
		const shufflePlaylist = shuffleArray([...playlist])
		setQueue(shufflePlaylist)
		setPause(true);
	};

	return (
		<div className="ml-4 flex gap-4 md:gap-8 text-2xl font-bold ">
			<button
				onClick={handlePlayAll}
				className="flex items-center gap-2 border p-2 md:px-2 md:py-1 rounded-full md:rounded-lg bg-purple-900 hover:bg-purple-800 shadow-zinc-950 shadow-md"
			>
				<FaPlay />
				<h1 className="hidden md:inline-block">Play All</h1>
			</button>
			<button
				onClick={handleShuffle}
				className="flex items-center gap-2 border p-2 md:px-2 md:py-1 rounded-full md:rounded-lg bg-purple-900 hover:bg-purple-800 shadow-zinc-950 shadow-md"
			>
				<FaShuffle />
				<h1 className="hidden md:inline-block">Shuffle</h1>
			</button>
		</div>
	);
}

export default PlayNShuffle;
