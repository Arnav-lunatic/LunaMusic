import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import DownloadButtons from "./Buttons/DownloadButtons";
import PlayButtons from "./Buttons/PlayButtons";
import { SearchContext } from "../context/SearchContext";

function SongSuggestion() {
	const {downloadQuality} = useContext(SearchContext)
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

    const SongCard = ({data}) => {
        return (
            <div className="relative m-auto cursor-pointer">
				<img
					className="w-96 rounded-t-lg"
					src={data.image[2].url} />
				<div className="absolute flex gap-2 p-2 bottom-16 right-0">
					<div>
						<DownloadButtons
							fileToDownload={data.downloadUrl[downloadQuality]?.url}
							fileTitle={data.name}
						/>
					</div>
					
					<PlayButtons
						getTrackData={ data }
					/>
				</div>
				<h1
					className="text-2xl font-bold text-center p-4 line-clamp-2 max-w-96 bg-black bg-opacity-50 backdrop-blur-lg rounded-b-lg"
				>{data.name}</h1>
            </div>
        )
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
			) : (
					suggestionData.success ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-auto">
                        {suggestionData.data.map( (eachData, index) => {
                            return <SongCard key={index} data={eachData}/>
                        }
							)}
						</div>
                    )
                        : ''
			)}
		</div>
	);
}

export default SongSuggestion;
