import React, { useRef, useState, useEffect, useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoSave } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { PiQueueBold } from "react-icons/pi";
import { FaDownload } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { SearchContext } from "../../context/SearchContext";
import useDownloader from "react-use-downloader";

function TrackCard({ trackData, trackList, setTrackList ,index }) {
	const { setLikedPlaylist, setPause, setCurrentTrack, setSavedPlaylist, setQueue } = useContext(SearchContext);
	const {download} = useDownloader()

	const [menuVisibility, setMenuVisibility] = useState(false);

	const handleMenuVisibility = () => {
		setMenuVisibility(!menuVisibility);
	};

	const optionsRef = useRef();
	const optionButtonRef = useRef();
	useEffect(() => {
		const handler = (event) => {
			if (
				menuVisibility &&
				optionsRef.current &&
				!optionsRef.current.contains(event.target) &&
				optionButtonRef.current &&
				!optionButtonRef.current.contains(event.target)
			) {
				setMenuVisibility(false);
			}
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
    }, [menuVisibility]);

	// Like
    const liked = (newItem) => {
		setLikedPlaylist((track) => [...track, newItem]);
	};

	const handleLike = () => {
		liked(trackData)
		setMenuVisibility(false);
    }

	// Play
	const playTrack = (trackData) => {
		setCurrentTrack(trackData)
		setPause(true)
	}

	const handlePlay = () => {
		playTrack(trackData)
		setMenuVisibility(false);
	}

	// Save
	const saveTrack = (trackData) => {
		setSavedPlaylist((track) => [...track, trackData]);
	}

	const handleSave = () => {
		saveTrack(trackData)
		setMenuVisibility(false);
	}

	// Queue
	const queueTrack = (trackData) => {
		setQueue((queue) => [...queue, trackData])
	}

	const handleQueue = () => {
		queueTrack(trackData)
		setMenuVisibility(false);
	}

	// Download
	const downloadTrack = (trackData) => {
		download(trackData.downloadPath, trackData.name + '.mp3')
		console.log(trackData.downloadPath, trackData.name + '.mp3');
		
	}

	const handleDownload = () => {
		downloadTrack(trackData)
		setMenuVisibility(false);
	}

	// Delete
	const deleteTrack = (index) => {
		const trackContainer = [...trackList];
		trackContainer.splice(index, 1);
		setTrackList(trackContainer);
	}
	
	const handleDelete = () => {
		deleteTrack(index)
		setMenuVisibility(false);
	}
	const options = [
		{ icon: <FaPlay />, text: "Play", fn: handlePlay},
		{ icon: <FaHeart />, text: "Like",  fn: handleLike},
		{ icon: <IoSave />, text: "Save",  fn: handleSave},
		{ icon: <PiQueueBold />, text: "Add to Queue",  fn: handleQueue}, 
		{ icon: <FaDownload />, text: "Download",  fn:handleDownload},
		{ icon: <MdDelete />, text: "Remove", fn: handleDelete},
	];

	return (
		<div
			ref={optionsRef}
			className="relative flex items-center p-2 rounded-xl gap-2 w-full mb-4 bg-zinc-800 bg-opacity-40"
		>
			<button className="absolute left-0 top-0 bottom-0 right-12" onClick={handlePlay}></button>
			<img
				className="w-16 lg:w-20 rounded-lg "
				src={trackData.thumbnail_50x50}
				alt="img"
			/>
			<div className="flex-grow w-4">
				<h1 className="text-sm w-11/12 md:text-xl font-bold truncate">
					{trackData.name}
				</h1>
				<h2 className="text-gray-400 w-11/12 truncate text-sm">
					{trackData.artist}
				</h2>
				<p className="text-gray-500 w-11/12 truncate text-sm">
					{trackData.year}
				</p>
			</div>
			<button className={`p-1 rounded-full hover:bg-zinc-700 ${menuVisibility ? 'bg-zinc-700' : ''}`} ref={optionButtonRef} onClick={handleMenuVisibility}>
				<HiDotsVertical className="h-8 w-8" />
			</button>
			<div
				className={`absolute right-4 top-16 text-lg md:text-xl font-semibold grid gap-1 bg-zinc-800 p-2 rounded-lg z-20 ${menuVisibility ? "visible" : "hidden "
				}`}
            >
                {
                    options.map((option, index) => {
                        return (
                            <button key={index} className="flex gap-2 items-center hover:bg-zinc-900 px-4 py-2 rounded-lg" onClick={option.fn}>
                                {option.icon}
                                {option.text}
                            </button>
                        )
                    })
                }
				
			</div>
		</div>
	);
}

export default TrackCard;
