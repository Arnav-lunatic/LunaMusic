import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import DisplayTracks from "../DisplayTracks";
import { IoArrowBack } from "react-icons/io5";


function SongSearch() {
	// Data From API
	// search - json data that api provides
	// convertIntoMin is function that convert sec to min ( 202sec to 03:22)
	const {
		searchValue,
		searchParams,
	} = useContext(SearchContext);

	const [searchData, setSearchData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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

	return (
			<DisplayTracks isLoading={isLoading} searchData={searchData} data={searchData.success ? searchData.data.results : ''} />
	);
}

export default SongSearch;
