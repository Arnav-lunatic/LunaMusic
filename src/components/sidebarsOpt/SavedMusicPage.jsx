import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import PlaylistView from "./PlaylistView";


function SavedMusicPage() {
	const { savedPlaylist, setSavedPlaylist } = useContext(SearchContext);	

	return (
		<>
			<PlaylistView playlist={savedPlaylist} setPlaylist={setSavedPlaylist} playlistTitle={ 'Saved Tracks' } />
		</>
	)
}

export default SavedMusicPage;
