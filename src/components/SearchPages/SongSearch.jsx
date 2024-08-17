import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import DisplayTracks from "../DisplayTracks";

function SongSearch() {
	// Data From API
	// search - json data that api provides
	// convertIntoMin is function that convert sec to min ( 202sec to 03:22)
	const { searchValue, searchParams, tracksPageNum, setTracksPageNum, tracksPageParams, setTracksPageParams } = useContext(SearchContext);

	const [searchData, setSearchData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const search = (getSearch, pageNum) => {
		setIsLoading(true);
		fetch(
			`https://saavn.dev/api/search/songs?query=${getSearch}&page=${pageNum}`
		)
			.then((response) => response.json())
			.then((data) => {
				setSearchData(data);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		search(searchValue, (tracksPageParams.get("page") || tracksPageNum));
	}, [searchParams, tracksPageParams]);

	useEffect(() => {
		setTracksPageParams({v:searchValue, page: tracksPageNum})
	}, [tracksPageNum])
	
	return (
		<>
			<DisplayTracks
				isLoading={isLoading}
				searchData={searchData}
				data={searchData.success ? searchData.data.results : ""}
				pageNum={Number(tracksPageNum)}
				setPageNum={setTracksPageNum}
				linkTo={`/search/songs?v=${searchValue}&page=${tracksPageNum}`}
			/>
		</>
	);
}

export default SongSearch;
