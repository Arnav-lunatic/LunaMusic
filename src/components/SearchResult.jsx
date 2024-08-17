import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import SongSearch from "./SearchPages/SongSearch";
import { useNavigate } from "react-router-dom";
import ArtistSearch from "./SearchPages/ArtistSearch";

function SearchResult({ whichPage }) {
	const { searchParams } = useContext(SearchContext);
	const getSongs = whichPage === "songs";
	const getAlbums = whichPage === "albums";
	const getArtists = whichPage === "artists"
	const getPlaylists = whichPage === "playlists";

	const navigate = useNavigate();

	return (
		<div className="pt-20 pb-28">
			<div className="relative flex items-center gap-[20px] lg:gap-[40px] h-8 w-min m-auto bg-black bg-opacity-40 backdrop-blur-lg rounded-full text-sm lg:text-md font-semibold shadow-sm shadow-zinc-800 mb-4">
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						navigate(`/search/songs?${searchParams}`);

					}}
				>
					Songs
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						navigate(`/search/albums?${searchParams}`);
					}}
				>
					Albums
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						navigate(`/search/artists?${searchParams}`);
					}}
				>
					Artists
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full "
					onClick={() => {
						navigate(`/search/playlists?${searchParams}`);
					}}
				>
					Playlists
				</button>
				<div
					className={`absolute top-0 w-[80px] lg:w-[110px] h-full bg-black bg-opacity-40 rounded-full -z-10 transition-all duration-500 ${
						getSongs ? "left-0" : ""
					} ${getAlbums ? "left-[100px] lg:left-[150px]" : ""} ${
						getArtists ? "left-[200px] lg:left-[300px]" : ""
					} ${getPlaylists ? "left-[300px] lg:left-[450px]" : ""}`}
				></div>
			</div>

			{getSongs ? <SongSearch /> : ''}
			{getAlbums ? <h1 className="text-center font-extrabold text-5xl">Coming soon</h1> : ""}
			{getArtists ? <ArtistSearch/> : ""}
			{getPlaylists ? <h1 className="text-center font-extrabold text-5xl">Coming soon		</h1> : ''}
		</div>
	);
}

export default SearchResult;
