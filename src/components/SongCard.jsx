import React from "react";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";

const SongCard = ({
	imageUrl,
	duration,
	title,
	artist,
	playCount,
	year,
	songToPlay,
	getTrackData,
	fileToDownload,
	fileTitle,
}) => {
	return (
		<div className="grid gap-4 bg-black bg-opacity-40 backdrop-blur-lg text-white p-4 rounded-lg shadow-lg xl:max-w-3xl">
			<div className=" flex items-center">
				<div className="relative">
					<img
						src={imageUrl}
						alt="Song Art"
						className="rounded-lg h-16 w-16"
					/>
					<div className="absolute bottom-1 right-1 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md text-xs">
						{duration}
					</div>
				</div>
				<div className="ml-4 flex-grow">
					<h2 className="text-sm max-w-36 lg:max-w-56 xl:max-w-sm md:text-lg font-bold truncate">
						{title}
					</h2>
					<p className="text-gray-400 max-w-36 md:max-w-xs truncate">
						{artist}
					</p>
				</div>
				<div className="hidden md:flex flex-col items-end ml-4">
					<span className="text-gray-500 text-sm">{playCount}</span>
					<span className="text-gray-500 text-sm">{year}</span>
				</div>

				<div className="flex gap-2 items-center">
					<DownloadButtons
						tooltipPosition={"bottom"}
						fileToDownload={fileToDownload}
						fileTitle={fileTitle}
					/>
					<PlayButtons
						tooltipPosition={"bottom"}
						songToPlay={songToPlay}
						getTrackData={getTrackData}
					/>
				</div>
			</div>

			{/* <div className="flex font-semibold">
				<button className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md">
					<FaRegSave className="h-5 w-5" />
					<p>Add to Save</p>
				</button>
				<div className="font-extralight text-3xl">|</div>
				<button className="flex gap-2 justify-center items-center w-1/2 text-center hover:bg-zinc-800 p-2 rounded-md border-zinc-600">
					<PiQueueBold className="h-6 w-6"/>
					Add to Queue
				</button>
			</div> */}
		</div>
	);
};

export default SongCard;
