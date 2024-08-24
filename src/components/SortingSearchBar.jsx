import React, { useState } from "react";

const SortingSearchBar = ({playlist, setSortedPlaylist}) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value)
	};

	const handleSearch = (value) => {
		const result = playlist.filter((track) => {
			return track && track.name && track.name.toLowerCase().includes(value)
		})
		setSortedPlaylist(result)
	};

	return (
		<div className="flex justify-center p-4">
			<input
				type="text"
				value={searchQuery}
				onChange={handleInputChange}
				placeholder="Search..."
				className="w-full max-w-md lg:max-w-3xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 bg-black bg-opacity-50 shadow-md"
			/>
		</div>
	);
};

export default SortingSearchBar;
