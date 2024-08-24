import React, { useContext } from "react";
import PlaylistView from "./PlaylistView";
import { SearchContext } from "../../context/SearchContext";

function LikedMusicPage() {
	const { likedPlaylist, setLikedPlaylist } = useContext(SearchContext);

	return (
		<div className="my-20">
			<PlaylistView
				playlist={likedPlaylist}
				setPlaylist={setLikedPlaylist}
				playlistTitle={"Liked Tracks"}
				textNote={
					<div className="flex gap-2 justify-center text-sm md:text-lg">
						&#9432;
						<h1>Your music feeds are influenced by the songs you like</h1>
					</div>
				}
			/>
		</div>
	);
}

export default LikedMusicPage;
