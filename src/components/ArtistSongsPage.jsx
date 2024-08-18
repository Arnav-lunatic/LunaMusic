import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import DisplayTracks from "./DisplayTracks";
import ArtistInfoButton from "./Buttons/ArtistInfoButton";

function ArtistSongPage() {
	const [artistSongData, setArtistSongData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination Vars
	const [artistTracksPageParams, setArtistTracksPageParams] = useSearchParams()
	const [tracksPageNum, setTracksPageNum] = useState(artistTracksPageParams.get("page") || 1)

	const navigate = useNavigate();

	// Get a query parameter
	const location = useLocation();
	const artistId = new URLSearchParams(location.search).get("id");

	const searchArtistSongData = (artistId, pageNum) => {
		setIsLoading(true);
		fetch(`https://saavn.dev/api/artists/${artistId}/songs?page=${pageNum}`)
			.then((response) => response.json())
			.then((data) => {
				setArtistSongData(data);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		searchArtistSongData(artistId, (artistTracksPageParams.get("page") || tracksPageNum));
    }, [artistId, artistTracksPageParams]);

	useEffect(() => {
		setArtistTracksPageParams({id: artistId ,page: tracksPageNum})
	}, [tracksPageNum])

	return (
		<div className="h-[85dvh] mt-[70px]">
			<div className="flex items-center text-3xl font-bold justify-between px-1 my-1 xl:px-20 ">
				<div
					onClick={() => navigate('/search/artists')}
					className="bg-black bg-opacity-40 backdrop-blur-lg rounded-full"
				>
					<IoArrowBack className="w-12 h-12 cursor-pointer transition-all duration-500 hover:-translate-x-4" />
				</div>
				
				<ArtistInfoButton artistId={artistId} />
			</div>
			<DisplayTracks
				isLoading={isLoading}
				searchData={artistSongData}
                data={artistSongData.success ? artistSongData?.data.songs : ""}
                pageNum={Number(tracksPageNum)}
                setPageNum={setTracksPageNum}
                linkTo={`/artist?id=${artistId}&page=${tracksPageNum}`}
			/>
		</div>
	);
}

export default ArtistSongPage;
