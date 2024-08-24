import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";

const PlaylistSongCard = ({ playlist, setPlaylist }) => {

    
    const handleDelete = (index) => {
		const playlistContainer = [...playlist];
		playlistContainer.splice(index, 1);
		setPlaylist(playlistContainer);
    }

    return (
        <>
            {playlist.map((eachTrack, index) => {
                return (
                    <div
                        key={index}
                        className="flex justify-between items-center rounded-lg bg-zinc-900 bg-opacity-20 px-2 py-1 max-w-7xl my-3 mx-2 md:mx-auto"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="w-16 h-16 md:w-20 md:h-20 rounded-md"
                                src={eachTrack.thumbnail_50x50}
                            />
                            <div className="grid max-w-36 md:max-w-full truncate">
                                <h1 className="text-md md:text-2xl font-semibold md:font-bold">
                                    {eachTrack.name}
                                </h1>
                                <h2 className="text-sm md:text-lg md:font-semibold">
                                    {eachTrack.artist}
                                </h2>
                                <h3 className="text-xs md:text-md font-thin">
                                    {eachTrack.year}
                                </h3>
                            </div>
                        </div>

                        <button onClick={() => handleDelete(index)}>
                            <MdDelete className="w-12 h-12 p-2 hover:bg-zinc-800 rounded-full" />
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default PlaylistSongCard