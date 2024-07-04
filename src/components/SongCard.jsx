import React, { useContext } from "react";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";
import { SearchContext } from "../context/SearchContext";

const SongCard = ({
	track_data,
	add_to_queue,
}) => {
	const {convertIntoMin} = useContext(SearchContext)
	const playCount = track_data.playCount !== null ? track_data.playCount.toLocaleString() : ""

	return (
		<div className="grid gap-4 max-h-48 bg-black bg-opacity-40 backdrop-blur-lg text-white p-4 rounded-lg shadow-lg xl:max-w-2xl">
			<div className=" flex items-center">
				<div className="relative">
					<img
						src={track_data.image[0].url}
						alt="Song Art"
						className="rounded-lg h-16 w-16"
					/>
					<div className="absolute bottom-1 right-1 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md text-xs">
						{convertIntoMin(track_data.duration)}
					</div>
				</div>
				<div className="ml-4 flex-grow">
					<h2 className="text-sm max-w-36 lg:max-w-56 xl:max-w-sm md:text-lg font-bold truncate">
						{track_data.name}
					</h2>
					<p className="text-gray-400 max-w-36 md:max-w-xs truncate">
						{track_data.artists.primary[0].name}
					</p>
				</div>
				<div className="hidden md:flex flex-col items-end ml-4">
					<span className="text-gray-500 text-sm">{playCount}</span>
					<span className="text-gray-500 text-sm">{track_data.year}</span>
				</div>

				<div className="flex gap-2 items-center">
					<DownloadButtons
						tooltipPosition={"bottom"}
						fileToDownload={track_data.downloadUrl[4].url}
						fileTitle={track_data.name}
					/>
					<PlayButtons
						tooltipPosition={"bottom"}
						songToPlay={track_data.downloadUrl[4].url}
						getTrackData={track_data}
					/>
				</div>
			</div>

			<div className="flex font-semibold items-center text-sm md:text-lg">
				<button className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md">
					<FaRegSave className="h-5 w-5" />
					<p>
						Coming Soon
						{/* Add to Save */}
					</p>
				</button>
				<div className="font-extralight text-xl md:text-3xl">|</div>
				<button
					className="flex gap-2 justify-center items-center w-1/2 text-center hover:bg-zinc-800 p-2 rounded-md border-zinc-600"
					onClick={() => add_to_queue(track_data)}
				>
					<PiQueueBold className="h-6 w-6"/>
					Add to Queue
				</button>
			</div>
		</div>
	);
};

export default SongCard;
