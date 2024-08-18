import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import DisplayTracks from "./DisplayTracks";

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

	const artistName = useRef(location.state?.currentArtistName)
	const artistImg = useRef(location.state?.currentArtistImg)

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
					onClick={() => navigate(`/search/artists?v=${artistName.current}`)}
					className="bg-black bg-opacity-40 backdrop-blur-lg rounded-full"
				>
					<IoArrowBack className="w-12 h-12 cursor-pointer transition-all duration-500 hover:-translate-x-4" />
				</div>
				<div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-black bg-opacity-40 backdrop-blur-lg">
					<img
						className="rounded-full w-12 h-12"
						src={artistImg.current}
					/>
					<h1>{artistName.current}</h1>
				</div>
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
