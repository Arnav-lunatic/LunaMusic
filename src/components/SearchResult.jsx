import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import ReactLoading from "react-loading";
import SongSearch from "./SearchPages/SongSearch";

function SearchResult() {
	const { isLoading } = useContext(SearchContext);
	const [getSongs, setGetSongs] = useState(true);
	const [getAlbums, setGetAlbums] = useState(false);
	const [getArtists, setGetArtists] = useState(false);
	const [getPlaylists, setGetPlaylists] = useState(false);

	return (
		<div className="pt-20 pb-28">
			<div className="relative flex items-center gap-[20px] lg:gap-[40px] h-8 w-min m-auto bg-black bg-opacity-40 backdrop-blur-lg rounded-full text-sm lg:text-md font-semibold shadow-sm shadow-zinc-800 mb-4	">
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						setGetSongs(true);
						setGetAlbums(false);
						setGetArtists(false);
						setGetPlaylists(false);
					}}
				>
					Songs
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						setGetSongs(false);
						setGetAlbums(true);
						setGetArtists(false);
						setGetPlaylists(false);
					}}
				>
					Albums
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full"
					onClick={() => {
						setGetSongs(false);
						setGetAlbums(false);
						setGetArtists(true);
						setGetPlaylists(false);
					}}
				>
					Artists
				</button>
				<button
					className="cursor-pointer w-[80px] lg:w-[110px] md:px-8 px-4 py-2 rounded-full "
					onClick={() => {
						setGetSongs(false);
						setGetAlbums(false);
						setGetArtists(false);
						setGetPlaylists(true);
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
			{isLoading ? (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2	-translate-y-1/2">
					<ReactLoading
						type="bars"
						color="#9233EA"
						height={100}
						width={100}
					/>
				</div>
			) : getSongs ? (<SongSearch />) : "" ||
				getAlbums ? (<h1 className="text-center font-extrabold text-5xl">Coming soon</h1>) : "" ||
				getArtists ? (<h1 className="text-center font-extrabold text-5xl">Coming soon</h1>) : "" ||
				getPlaylists ? (<h1 className="text-center font-extrabold text-5xl">Coming soon</h1>) : ""
			}
		</div>
	);
}

export default SearchResult;
