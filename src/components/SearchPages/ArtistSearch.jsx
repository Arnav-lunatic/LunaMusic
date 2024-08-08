import React, { useState ,useEffect, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Link, useSearchParams } from 'react-router-dom'
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

function ArtistSearch() {
	const { searchValue, searchParams, setSearchParams } = useContext(SearchContext);

	const navigate = useNavigate()

	const [searchData, setSearchData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	console.log(searchParams.get('id'));	
	const getArtistSongs = (artistIdVal) => {
		console.log(searchParams.get('v'));
		console.log(searchParams);
		setSearchParams({ id: artistIdVal })
	}

    const ArtistCard = ({artistImg, artistName, artistIdVal}) => {
		return (
			<Link
				to={`/artist?id=${artistIdVal}`}
				onClick={() => getArtistSongs(artistIdVal)}
				className="bg-black rounded-md p-4 bg-opacity-40 backdrop-blur-lg hover:scale-105 transition-all max-w-80 m-auto">
				<img
					className="rounded-md"
					src={artistImg} alt="Artist Image" />
				<div className="text-2xl font-bold text-center h-16 m-auto">{artistName}</div>
            </Link>
        )
    }
	

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
                            return <ArtistCard key={index} artistImg={eachArtist.image[2].url} artistName={eachArtist.name} artistIdVal={eachArtist.id} />
                        })}
                    </div>
			) : (
				""
			)}
		</div>
	);
}

export default ArtistSearch;
