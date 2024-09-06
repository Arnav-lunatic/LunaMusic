import React, { useContext } from "react";
import DownloadButtons from "../Buttons/DownloadButtons";
import PlayButtons from "../Buttons/PlayButtons";
import AddToButton from "../Buttons/AddToButton";
import { SearchContext } from "../../context/SearchContext";
import LikeButton from "../Buttons/LikeButton";

const SongCard = ({
	track_data
}) => {
	const {convertIntoMin, playingQuality, downloadQuality,} = useContext(SearchContext)
	const playCount = track_data?.playCount !== null ? track_data?.playCount.toLocaleString() : ""

	return (
		<div className="grid gap-4 max-h-48 bg-black bg-opacity-40 backdrop-blur-lg text-white pt-4 px-4 rounded-lg shadow-lg w-full max-w-sm lg:max-w-3xl">
			<LikeButton trackData={track_data} />
			<div className=" flex items-center">
				<div className="relative">
					<img
						src={track_data?.image[1].url}
						className="rounded-lg w-20"
					/>
					<div className="absolute bottom-1 right-1 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md text-xs">
						{convertIntoMin(track_data?.duration)}
					</div>
				</div>
				<div className="ml-4 flex-grow">
					<h2 className="text-sm w-36 lg:w-96 md:text-lg font-bold truncate">
						{track_data?.name}
					</h2>
					<p className="text-gray-400 max-w-36 md:max-w-xs truncate">
						{track_data?.artists.primary[0].name}
					</p>
				</div>
				<div className="hidden md:flex flex-col items-end ml-4">
					<span className="text-gray-500 text-sm">{playCount}</span>
					<span className="text-gray-500 text-sm">{track_data?.year}</span>
				</div>

				<div className="flex gap-2 items-center">
					<DownloadButtons
						tooltipPosition={"bottom"}
						fileToDownload={track_data?.downloadUrl[downloadQuality].url}
						fileTitle={track_data?.name}
					/>
					<PlayButtons
						tooltipPosition={"bottom"}
						songToPlay={track_data?.downloadUrl[playingQuality].url}
						getTrackData={track_data}
					/>
				</div>
			</div>

			<AddToButton data={track_data}/>
		</div>
	);
};

export default SongCard;
