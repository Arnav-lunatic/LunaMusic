import React, { useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { FaPlay } from "react-icons/fa";

function PlayButtons({
	tooltipPosition,
	getTrackData,
}) {
	const {setCurrentTrack, setPause, setQueue, setQueueCount } =
		useContext(SearchContext);

	// When any play any particular track, this will set the track data in playBar
	const song_to_play = getTrackData?.downloadUrl[4].url
	
	const playMusic = () => {
		setPause(true);
		setQueueCount(0)
		setCurrentTrack({
			id: getTrackData.id,
			path: song_to_play ,
			name: getTrackData.name,
			thumbnail_50x50: getTrackData.image[0].url,
			thumbnail_500x500: getTrackData.image[2].url,
			artist: getTrackData.artists.primary[0].name,
			year: getTrackData.year,
			duration: getTrackData.duration,
		});
		setQueue([{
			id: getTrackData.id,
			path: song_to_play ,
			name: getTrackData.name,
			thumbnail_50x50: getTrackData.image[0].url,
			thumbnail_500x500: getTrackData.image[2].url,
			artist: getTrackData.artists.primary[0].name,
			year: getTrackData.year,
			duration: getTrackData.duration,
		}])
	};

	return (
		<button
			onClick={playMusic}
			data-tooltip-id="my-tooltip"
			data-tooltip-content="Play"
			data-tooltip-place={tooltipPosition}
			data-tooltip-delay-show="700"
			className="w-10 h-10 bg-white rounded-full"
		>
			<div className="flex items-center justify-center bg-purple-700 w-8 h-8 rounded-full m-auto">
				<FaPlay className="w-6 h-6 pl-1" />
			</div>
		</button>
	);
}

export default PlayButtons;
