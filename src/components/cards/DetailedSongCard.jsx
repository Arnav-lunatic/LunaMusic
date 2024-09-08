import React from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import DownloadButtons from "../Buttons/DownloadButtons";
import PlayButtons from "../Buttons/PlayButtons";
import AddToButton from "../Buttons/AddToButton";
import LikeButton from "../Buttons/LikeButton";

function DetailedSongCard({ first_track_data }) {
    const { convertIntoMin, downloadQuality } = useContext(SearchContext);
    
	const ArtistLabel = ({ artists = [] }) => {
		return artists.map((eachArtist, index) => {
			return (
				<span key={index}>
					<button>{eachArtist.name}</button>
					{artists.length - 1 !== index ? ", " : ""}
				</span>
			);
		})
	};
	

	return (
		<div className="bg-black bg-opacity-40 backdrop-blur-lg text-white pt-4 px-4 rounded-lg shadow-lg m-auto">
			<LikeButton trackData={first_track_data[0]} positionClass="top-6 left-6" sizeClass="h-10 w-10"/>
			<div className="relative w-full">
				<img
					src={first_track_data[0]?.image[2].url}
					alt="Track thumbnail"
					className="rounded-lg w-full max-w-80 lg:max-w-lg"
				/>
				<div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md flex items-center cursor-pointer">
					{/* duration */}
					<span className="mr-1 font-semibold text-lg">
						{convertIntoMin(first_track_data[0]?.duration)}
					</span>
					<PlayButtons
						tooltipPosition={"right"}
						getTrackData={first_track_data[0]}
					/>
				</div>
			</div>
			<div className="mt-4">
				<div className="flex justify-between">
					<div>
						{/* title */}
						<h2 className="text-2xl font-bold truncate max-w-[75vw] lg:max-w-sm">
							{first_track_data[0]?.name}
						</h2>
						{/* artist */}
						<p className="text-gray-400  max-w-[75vw] lg:max-w-sm truncate">
							<ArtistLabel
								artists={first_track_data[0]?.artists.primary}
							/>
						</p>
					</div>
					<div>
						<DownloadButtons
							tooltipPosition={"right"}
							fileToDownload={
								first_track_data[0]?.downloadUrl[
									downloadQuality
								].url
							}
							fileTitle={first_track_data[0]?.name}
						/>
					</div>
				</div>

				<div className="mt-2 flex justify-between text-gray-500 text-sm">
					{/* play count */}
					<span>
						{first_track_data[0]?.playCount?.toLocaleString()}
					</span>
					{/* year */}
					<span>{first_track_data[0]?.year}</span>
				</div>
			</div>

			<AddToButton data={first_track_data[0]} />
		</div>
	);
}

export default DetailedSongCard;
