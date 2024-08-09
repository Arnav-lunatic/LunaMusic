import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { SearchContext } from "../context/SearchContext";
import { FaRegSave } from "react-icons/fa";
import { PiQueueBold } from "react-icons/pi";

function SongSuggestion() {
	const { downloadQuality, add_to_save, add_to_queue } =
		useContext(SearchContext);
	const [suggestionData, setSuggestionData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getSongSuggestion = () => {
		setIsLoading(true);
		fetch(`https://saavn.dev/api/songs/yDeAS8Eh/suggestions`)
			.then((response) => response.json())
			.then((data) => {
				setIsLoading(false);
				setSuggestionData(data);
			});
	};

	useEffect(() => {
		getSongSuggestion();
	}, []);

	const SongCard = ({ data }) => {
		return (
			<div className="relative m-auto cursor-pointer hover:scale-105 transition-all rounded-lg bg-black bg-opacity-50 backdrop-blur-lg">
				<div className="absolute flex gap-2 p-2 bottom-24 right-0">
					<div>
						<DownloadButtons
							fileToDownload={
								data.downloadUrl[downloadQuality]?.url
							}
							fileTitle={data.name}
						/>
					</div>

					<PlayButtons getTrackData={data} />
				</div>

				<img className="w-96 rounded-lg" src={data.image[2].url} />

				<h1 className="text-2xl font-bold text-center p-4 w-96 truncate">
					{data.name}
				</h1>

				<div className="flex font-semibold items-center text-sm md:text-md p-2">

					<button
						onClick={() => add_to_save(data)}
						className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md"
					>
						<FaRegSave className="h-5 w-5" />
						<p>Add to Save</p>
					</button>

					<div className="font-extralight text-xl md:text-3xl">|</div>

					<button
						className="flex gap-2 justify-center items-center w-1/2 hover:bg-zinc-800 p-2 rounded-md border-zinc-600"
						onClick={() => add_to_queue(data)}
					>
						<PiQueueBold className="h-6 w-6" />
						Add to Queue
					</button>

				</div>
			</div>
		);
	};

	return (
		<div>
			{isLoading ? (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2	-translate-y-1/2">
					<ReactLoading
						type="bars"
						color="#9233EA"
						height={100}
						width={100}
					/>
				</div>
			) : suggestionData.success ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6 m-auto">
					{suggestionData.data.map((eachData, index) => {
						return <SongCard key={index} data={eachData} />;
					})}
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default SongSuggestion;
