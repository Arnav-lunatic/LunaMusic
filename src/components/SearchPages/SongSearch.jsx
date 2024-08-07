import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import ReactLoading from "react-loading";
import SongCard from "../SongCard";
import DownloadButtons from "../Buttons/DownloadButtons";
import PlayButtons from "../Buttons/PlayButtons";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";

function SongSearch() {
	// Data From API
	// search - json data that api provides
	// convertIntoMin is function that convert sec to min ( 202sec to 03:22)
	const {
		searchValue,
		searchParams,
		convertIntoMin,
		downloadQuality,
		add_to_queue,
		add_to_save
	} = useContext(SearchContext);

	const [searchData, setSearchData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const search = (getSearch) => {
		setIsLoading(true);
		fetch(`https://saavn.dev/api/search/songs?query=${getSearch}`)
			.then((response) => response.json())
			.then((data) => {
				setSearchData(data);
				setIsLoading(false);	
			});
	};

	useEffect(() => {
		search(searchValue);
	}, [searchParams]);

	const first_track_data = searchData.success ? searchData?.data.results : ''

	const ArtistLabel = ({ artists = 'none' }) => {
		return artists.map((eachArtist, index) => {
			return (
				<span key={index}>
					<button>{eachArtist.name}</button>
					{artists.length - 1 !== index ? ", " : ""}
				</span>
			);
		});
	};

	return (
		<>
			{isLoading ? (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2	-translate-y-1/2">
					<ReactLoading
						type="bars"
						color="#9233EA"
						height={100}
						width={100}
					/>
				</div>
			) : (searchData?.success ? 
				(<div className="flex p-2 lg:flex-row flex-col gap-2 h-[70dvh] lg:overflow">
					<div className="flex items-center w-full lg:w-1/2">
						<div className="bg-black bg-opacity-40 backdrop-blur-lg text-white p-4 rounded-lg shadow-lg m-auto">
							<div className="relative w-full">
								<img
									src={first_track_data[0]?.image[2].url}
									alt="Track thumbnail"
									className="rounded-lg w-full min-w-48 min-h-48"
								/>
								<div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white p-1 rounded-md flex items-center cursor-pointer">
									{/* duration */}
									<span className="mr-1 font-semibold text-lg">
										{convertIntoMin(
											first_track_data[0]?.duration
										)}
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
										<h2 className="text-2xl font-bold truncate max-w-[75vw] lg:max-w-sm lg:min-w-sm">
											{first_track_data[0]?.name}	
										</h2>
										{/* artist */}
										<p className="text-gray-400">
											<ArtistLabel
												artists={
													first_track_data[0]?.artists
														.primary
												}
											/>
										</p>
									</div>
									<div>
										<DownloadButtons
											tooltipPosition={"right"}
											fileToDownload={
												first_track_data[0]
													?.downloadUrl[
													downloadQuality
												].url
											}
											fileTitle={
												first_track_data[0]?.name
											}
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
							<div className="flex font-semibold items-center text-sm md:text-lg">
								<button
									onClick={() =>
										add_to_save(first_track_data[0])
									}
									className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md"
								>
									<FaRegSave className="h-5 w-5" />
									<p>Add to Save</p>
								</button>
								<div className="font-extralight text-xl md:text-3xl">
									|
								</div>
								<button
									className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md border-zinc-600"
									onClick={() =>
										add_to_queue(first_track_data[0])
									}
								>
									<PiQueueBold className="h-6 w-6" />
									Add to Queue
								</button>
							</div>
						</div>
					</div>

					<div className="grid gap-2 pb-24 lg:p-0 lg:w-1/2 lg:overflow-y-auto">
						{/* 
						It Render a list of all other sound track except first
						1) Filter the first sound track
						2) render all other sound tracks
						3) All the Track data passed to component through props
						*/}
						{searchData?.data.results
							.filter(
								(other_track_data) =>
									first_track_data.indexOf(
										other_track_data
									) !== 0
							)
							.map((other_track_data) => {
								return (
									<SongCard
										track_data={other_track_data}
										key={other_track_data.id}
										add_to_queue={add_to_queue}
										add_to_save={add_to_save}
									/>
								);
							})}
					</div>
				</div>) : ''
			)}
		</>
	);
}

export default SongSearch;
