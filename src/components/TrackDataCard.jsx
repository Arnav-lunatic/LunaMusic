import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext';
import { FaVolumeHigh } from "react-icons/fa6";

const TrackDataCard = ({ track, name, artist, year }) => {

    const {audioRef} = useContext(SearchContext)

    // volume
    const [volume, setVolume] = useState(100);
    const [volume_percent_visibility, setVolume_percent_visibility] = useState(false)

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = volume/100
    };
    
    

    return (
        <div className='w-full'>

            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                onFocus={() => setVolume_percent_visibility(true)}
                onBlur={() => setVolume_percent_visibility(false)}
                onTouchStart={() => setVolume_percent_visibility(true)}
                onTouchEnd={() => setVolume_percent_visibility(false)}
                id='volume'
                className="absolute top-44 md:top-64 -right-24 md:-right-40 transform rotate-[-90deg] appearance-none w-60 md:w-96 h-8 bg-black bg-opacity-40 backdrop-blur-lg cursor-pointer opacity-60 hover:opacity-100 hover:bg-opacity-60 transition-all duration-500 ease-in-out rounded-lg shadow-lg"
            />

            <h1
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold transition-all duration-1000 bg-black px-2 py-1 rounded-lg ${volume_percent_visibility ? 'opacity-80' : 'opacity-0'}`}
            >
                {volume}%
            </h1>

            <img
                className="rounded-t-lg w-full lg:inline-block"
                src={track}
                alt="Thumbnail"
            />
            <div className="flex items-center justify-between bg-zinc-400 bg-opacity-15 rounded-b-lg p-2 backdrop-blur-xl">
                <div>
                    <h1 className="text-xl font-bold">
                        {name}
                    </h1>
                    <h1 className="text-sm font-semibold">
                        {artist}
                    </h1>
                    <h2 className="text-xs max-w-60 truncate">
                        {year}
                    </h2>
                </div>
                {/* <button className="flex gap-1 mr-2 hover:bg-zinc-500 p-1 rounded-md">
                                    <FaRegSave className="w-6 h-6" />
                                    <h1 className="text-lg font-bold">Add to Save</h1>
                                </button> */}
            </div>
        </div>
    );
};

export default TrackDataCard