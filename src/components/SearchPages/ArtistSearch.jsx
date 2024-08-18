import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

function ArtistSongsSearch() {
	const { searchValue, searchParams, setSearchParams } =
		useContext(SearchContext);

	const [searchData, setSearchData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getArtistSongs = (artistIdVal) => {
		setSearchParams({ id: artistIdVal });
	};

	useEffect(() => {
		setSearchParams({ v: searchValue });
	}, []);

	const search = (getSearch) => {
		setIsLoading(true);
		fetch(`https://saavn.dev/api/search/artists?query=${getSearch}`)
			.then((response) => response.json())
			.then((data) => {
				setSearchData(data);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		search(searchValue);
	}, [searchParams]);

	const ArtistCard = ({ artistImg500x500, artistName, artistIdVal }) => {
		return (
			<Link
				to={{
					pathname: `/artist`,
					search: `?id=${artistIdVal}`,
				}}
				onClick={() => getArtistSongs(artistIdVal)}
				className="bg-black rounded-md p-4 bg-opacity-40 backdrop-blur-lg hover:scale-105 transition-all max-w-80 m-auto"
			>
				<img
					className="rounded-md"
					src={artistImg500x500}
					alt="Artist Image"
				/>
				<div className="text-2xl font-bold text-center h-16 m-auto overflow-hidden text-ellipsis line-clamp-2">
					{artistName}
				</div>
			</Link>
		);
	};

	return (
		<div className="max-w-7xl m-auto px-8 py-2">
			{isLoading ? (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2	-translate-y-1/2">
					<ReactLoading
						type="bars"
						color="#9233EA"
						height={100}
						width={100}
					/>
				</div>
			) : searchData?.success ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-auto">
					{searchData?.data.results.map((eachArtist, index) => {
						return (
							<ArtistCard
								key={index}	
								artistImg500x500={eachArtist?.image[2].url}
								artistName={eachArtist?.name}
								artistIdVal={eachArtist?.id}
							/>
						);
					})}
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default ArtistSongsSearch;
