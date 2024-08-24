import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { SearchContext } from "../context/SearchContext";
import AddToButton from "./Buttons/AddToButton";
import PagesButton from "./Buttons/PagesButton";
import LikeButton from "./Buttons/LikeButton";

function SongSuggestion() {
	const { downloadQuality, likedPlaylist} = useContext(SearchContext);
	const [suggestionData, setSuggestionData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let randomNum = getRandomNum(0, likedPlaylist.length)


	useEffect(() => {
		randomNum = getRandomNum(0, likedPlaylist.length-1)
	}, [likedPlaylist])
	

	const getSongSuggestion = () => {
		setIsLoading(true);
		fetch(`https://saavn.dev/api/songs/${likedPlaylist.length !== 0 ? likedPlaylist[randomNum].id : 'yDeAS8Eh'}/suggestions?page`)
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
			<div className="relative m-auto transition-all rounded-lg bg-black bg-opacity-50 backdrop-blur-lg mx-2">
				<LikeButton trackData={data} />
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

				<img className="w-full rounded-t-lg" src={data.image[2].url} />

				<h1 className="text-2xl font-bold text-center p-4 w-full truncate">
					{data.name}
				</h1>

				<AddToButton data={data}/>
			</div>
		);
	};

	return (
		<div>
			<div className="flex gap-2 justify-center text-sm md:text-lg pb-4">
				&#9432;
				<h1>Your music feeds are influenced by the songs you like</h1>
			</div>
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
