import React, { useState, useEffect } from 'react'
import PlaylistThumbnail from "../PlaylistThumbnail";
import PlayNShuffle from "../Buttons/PlayNShuffle";
import SortingSearchBar from '../SortingSearchBar';
import PlaylistSongCard from '../cards/PlaylistSongCard';
import TrackCard from '../cards/TrackCard';

function PlaylistView({ playlist, setPlaylist, playlistTitle, textNote = '' }) {

	const [sortedPlaylist, setSortedPlaylist] = useState(playlist)

	useEffect(() => {
		setSortedPlaylist(playlist)
	}, [playlist])

	return (
		<div className="absolute top-20 bottom-24 left-1/2 w-[95vw] max-w-6xl -translate-x-1/2 overflow-y-auto rounded-xl bg-black bg-opacity-40 backdrop-blur-lg p-2 md:p-6">
			<div className=" flex items-start">
				<PlaylistThumbnail data={playlist} />
				<div className="grid gap-8">
					<h1 className="text-5xl md:text-9xl font-bold">
						{playlistTitle}
					</h1>

					<PlayNShuffle playlist={playlist} />
					
				</div>
            </div>
            
            <SortingSearchBar playlist={playlist} setSortedPlaylist={setSortedPlaylist} />

            {textNote}

			<div>
				{
					sortedPlaylist.map((eachTrack, index) => {
						return <TrackCard key={index} trackData={eachTrack} trackList={sortedPlaylist} setTrackList={setPlaylist} index={index}  />
					})
				}
			</div>
		</div>
	);
}

export default PlaylistView