import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import SongCard from "./SongCard";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";

function SearchResult() {
	// Data From API
	const { searchData, convertIntoMin } = useContext(SearchContext);

	const playMusic = () => {
		setCurrentTrack(songToPlay);
		setPause(true);
		setTrackData({
			name: getTrackData.name,
			thumbnail: getTrackData.image[0].url,
			artist: getTrackData.artists.primary[0].name,
			year: getTrackData.year,
			duration: convertIntoMin(getTrackData.duration),
		});
	};

	return (
		<>
			{searchData.success && (
				<div className="flex p-2 pt-20 pb-28 lg:flex-row flex-col gap-2 h-screen lg:overflow">
					<div className="flex items-center w-full lg:w-1/2">
						<div className="bg-black bg-opacity-40 backdrop-blur-lg text-white p-4 rounded-lg shadow-lg m-auto md:7/12">
							<div className="relative w-full">
								<img
									src={
										searchData.data.results[0]?.image[2].url
									}
									alt="Song Art"
									className="rounded-lg w-full min-w-48"
								/>
								<div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md flex items-center cursor-pointer">
									{/* duration */}
									<span className="mr-1 font-semibold text-lg">
										{convertIntoMin(
											searchData.data.results[0]?.duration
										)}
									</span>
									<PlayButtons
										tooltipPosition={"right"}
										songToPlay={
											searchData.data.results[0]?.downloadUrl[4].url
										}
										getTrackData={
											searchData.data.results[0]
										}
									/>
								</div>
							</div>
							<div className="mt-4">
								<div className="flex justify-between">
									<div>
										{/* title */}
										<h2 className="text-2xl font-bold">
											{searchData.data.results[0]?.name}
										</h2>
										{/* artist */}
										<p className="text-gray-400">
											{
												searchData.data.results[0]?.artists.primary[0].name
											}
										</p>
									</div>
									<div>
										<DownloadButtons
											tooltipPosition={"right"}
											fileToDownload={searchData.data.results[0]?.downloadUrl[4].url}
											fileTitle={searchData.data.results[0]?.name}
										/>
									</div>
								</div>

								<div className="mt-2 flex justify-between text-gray-500 text-sm">
									{/* play count */}
									<span>
										{searchData.data.results[0]?.playCount.toLocaleString()}
									</span>
									{/* year */}
									<span>
										{searchData.data.results[0]?.year}
									</span>
								</div>
							</div>
							{/* <div className="flex font-semibold">
								<button className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md">
									<FaRegSave className="h-5 w-5" />
									<p>Add to Save</p>
								</button>
								<div className="font-extralight text-3xl">
									|
								</div>
								<button className="flex gap-2 justify-center items-center w-1/2 text-center hover:bg-zinc-800 p-2 rounded-md border-zinc-600">
									<PiQueueBold className="h-6 w-6" />
									Add to Queue
								</button>
							</div> */}
						</div>
					</div>

					<div className="grid gap-2 pb-24 lg:p-0 lg:w-1/2 lg:overflow-y-auto">
						{/* 
						It Render a list of all other sound track except first
						1) Filter the first sound track
						2) render all other sound tracks
						3) All the Track data passed to component through props
						*/}
						{searchData.data.results
							.filter((val) => val !== 0)
							.map((val) => {
								return (
									<SongCard
										key={val.id}
										imageUrl={val.image[0].url}
										duration={convertIntoMin(val.duration)}
										title={val.name}
										artist={val.artists.primary[0].name}
										playCount={
											val.playCount !== null
												? val.playCount.toLocaleString()
												: ""
										}
										year={val.year}
										songToPlay={val.downloadUrl[4].url}
										getTrackData={val}
										fileToDownload={val.downloadUrl[4].url}
										fileTitle={val.name}
									/>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
}

export default SearchResult;
