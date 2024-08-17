import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import DownloadButtons from "./Buttons/DownloadButtons";
import { FaRegSave } from "react-icons/fa";

const TrackDataCard = () => {
	const { audioRef, setSavedPlaylist, currentTrack } =
		useContext(SearchContext);

	// volume
	const [volume, setVolume] = useState(100);
	const [volume_percent_visibility, setVolume_percent_visibility] =
		useState(false);

	const handleVolumeChange = (e) => {
		setVolume(e.target.value);
		audioRef.current.volume = volume / 100;
    };

	const add_to_save = (newItem) => {
		setSavedPlaylist((queue) => [...queue, newItem]);
	};

	return (
		<div className="relative w-full">
			{/* Volume */}
			<input
				type="range"
				min="0"
				max="100"
				value={volume}
				onChange={handleVolumeChange}
				onFocus={() => setVolume_percent_visibility(true)}
				onBlur={() => setVolume_percent_visibility(false)}
				onTouchStart={() => setVolume_percent_visibility(true)}
				onTouchEnd={() => setVolume_percent_visibility(false)}
				id="volume"
				className="absolute top-44 lg:top-64 -right-24 lg:-right-40 transform rotate-[-90deg] appearance-none w-60 lg:w-96 h-8 bg-black bg-opacity-40 backdrop-blur-lg cursor-pointer opacity-60 hover:opacity-100 hover:bg-opacity-60 transition-all duration-500 ease-in-out rounded-lg shadow-lg"
			/>

			<h1
				className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold transition-all duration-1000 bg-black px-2 py-1 rounded-lg ${
					volume_percent_visibility ? "opacity-80" : "opacity-0"
				}`}
			>
				{volume}%
			</h1>

			<img
				className="rounded-t-lg w-full lg:inline-block"
				src={currentTrack?.thumbnail_500x500}
				alt="Thumbnail"
			/>

			<div className="flex items-center justify-between bg-zinc-400 bg-opacity-15 rounded-b-lg p-2 backdrop-blur-lg">
				<div>
					<h1 className="text-xl font-bold">{currentTrack?.name}</h1>
					<h1 className="text-sm font-semibold">{currentTrack?.artist}</h1>
					<h2 className="text-xs">{currentTrack?.year}</h2>
				</div>
				<div>
					<DownloadButtons
						fileToDownload={currentTrack?.downloadPath}
						fileTitle={currentTrack?.name}
					/>
				</div>
				<button
					onClick={() => add_to_save(currentTrack)}
					className="absolute -top-12 right-0 flex items-center gap-1 mr-2 px-2 py-1 text-white bg-black bg-opacity-50 hover:bg-zinc-700 hover:bg-opacity-60 p-1 rounded-md z-10 transition-all border-2 border-zinc-500"
				>
					<FaRegSave className="w-6 h-6" />
					<h1 className="text-lg font-bold">Add to Save</h1>
				</button>
			</div>
		</div>
	);
};

export default TrackDataCard;
