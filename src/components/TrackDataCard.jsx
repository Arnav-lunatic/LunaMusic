import React from 'react'

const TrackDataCard = ({track, name, artist, year}) => {
    return (
        <div className='w-full'>
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