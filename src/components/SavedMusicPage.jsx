import React, { useContext } from "react";
import { FaShuffle, FaPlay } from "react-icons/fa6";
import { SearchContext } from "../context/SearchContext";
import { MdDelete } from "react-icons/md";
import PlaylistThumbnail from "./PlaylistThumbnail";

function SavedMusicPage() {
	const { setQueue, setPause, savedPlaylist, setSavedPlaylist } = useContext(SearchContext);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const handlePlayAll = () => {
		setPause(true);
		setQueue(savedPlaylist);
	};

	const handleShuffle = () => {
		const shuffleSavedPlaylist = shuffleArray([...savedPlaylist])
		setQueue(shuffleSavedPlaylist)
		setPause(true);
	};

	const handleDelete = (index) => {
		const savedPlaylistContainer = [...savedPlaylist];
		savedPlaylistContainer.splice(index, 1);
		setSavedPlaylist(savedPlaylistContainer);
	}

	const PlaylistSongCard = () => {
		return (
			<>
				{savedPlaylist.map((eachTrack, index) => {
					return (
						<div
							key={index}
							className="flex justify-between items-center rounded-lg bg-zinc-800 bg-opacity-30 px-2 py-1 max-w-7xl my-3 mx-2 md:mx-auto"
						>
							<div className="flex items-center gap-4">
								<img
									className="w-16 h-16 md:w-20 md:h-20 rounded-md"
									src={eachTrack.thumbnail_50x50}
								/>
								<div className="grid max-w-36 md:max-w-full truncate">
									<h1 className="text-md md:text-2xl font-semibold md:font-bold">
										{eachTrack.name}
									</h1>
									<h2 className="text-sm md:text-lg md:font-semibold">
										{eachTrack.artist}
									</h2>
									<h3 className="text-xs md:text-md font-thin">
										{eachTrack.year}
									</h3>
								</div>
							</div>

							<button onClick={() => handleDelete(index)}>
								<MdDelete className="w-12 h-12 p-2 hover:bg-zinc-800 rounded-full" />
							</button>
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className="absolute top-20 bottom-20 left-1/2 w-[95vw] max-w-6xl -translate-x-1/2 overflow-y-auto rounded-t-xl">
			<div className=" flex items-start">
				<PlaylistThumbnail data={savedPlaylist} />
				<div className="grid ml-4 gap-8">
					<h1 className="text-5xl md:text-9xl font-bold">
						Saved Music
					</h1>

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
				</div>
			</div>

			<div>
				<PlaylistSongCard />
			</div>
		</div>
	);
}

export default SavedMusicPage;
