import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";	

function AddToButton({data}) {
	const {queue, setQueue, setCurrentTrack, setSavedPlaylist, playingQuality, downloadQuality} = useContext(SearchContext)
	// Add to Queue Function
	const add_to_queue = (newItem) => {
		const newItemObj = {
			id: newItem.id,
			path: newItem.downloadUrl[playingQuality].url,
			downloadPath: newItem.downloadUrl[downloadQuality].url,
			name: newItem.name,
			thumbnail_50x50: newItem.image[1].url,
			thumbnail_500x500: newItem.image[2].url,
			artist: newItem.artists.primary[0].name,
			year: newItem.year,
			duration: newItem.duration,
		};
		setQueue((queue) => [...queue, newItemObj]);
		queue.length === 0 ? setCurrentTrack(newItemObj) : "";
	};

	// Add to Save Function
	const add_to_save = (newItem) => {
		const newItemObj = {
			id: newItem.id,
			path: newItem.downloadUrl[playingQuality].url,
			downloadPath: newItem.downloadUrl[downloadQuality].url,
			name: newItem.name,
			thumbnail_50x50: newItem.image[1].url,
			thumbnail_500x500: newItem.image[2].url,
			artist: newItem.artists.primary[0].name,
			year: newItem.year,
			duration: newItem.duration,
		};
		setSavedPlaylist((track) => [...track, newItemObj]);
	};
	return (
		<div className="flex font-semibold items-center text-sm md:text-md p-2">
			<button
				onClick={() => add_to_save(data)}
				className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 hover:bg-opacity-50 p-2 rounded-md"
			>
				<FaRegSave className="h-5 w-5" />
				<p>Add to Save</p>
			</button>

			<div className="font-extralight text-xl md:text-3xl">|</div>

			<button
				className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 hover:bg-opacity-50 p-2 rounded-md border-zinc-600"
				onClick={() => add_to_queue(data)}
			>
				<PiQueueBold className="h-6 w-6" />
				Add to Queue
			</button>
		</div>
	);
}

export default AddToButton;
