import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../context/SearchContext'

function HistoryPage() {
    const { currentTrack ,trackHistory, setTrackHistory } = useContext(SearchContext)
    
    useEffect(() => {
        currentTrack.name === "No track found" ? '' : setTrackHistory([currentTrack, ...trackHistory])
        if (trackHistory.length === 15) {
            setTrackHistory(trackHistory.pop())
        }
    }, [currentTrack])
    
    useEffect(() => {
        console.log(trackHistory);
    }, [trackHistory])
    

    return (
        <div className='absolute top-20 bottom-24 left-1/2 w-[95vw] max-w-6xl -translate-x-1/2 overflow-y-auto rounded-xl bg-black bg-opacity-40 backdrop-blur-lg p-2 md:p-6'>
            <h1 className="text-3xl lg:text-4xl font-bold text-center">History</h1>
            <div>
                {
                    trackHistory ? trackHistory.map((eachHistory, index) => {
                        return (
                            <div key={index} className='flex gap-2 w-full mb-4'>
                                <img className='w-16 lg:w-20 rounded-lg ' src={eachHistory.thumbnail_50x50} alt="img" />
                                <div className='w-full'>
                                    <h1 className='text-sm w-9/12 lg:w-11/12 md:text-xl font-bold truncate'>{eachHistory.name}</h1>
                                    <h2 className='text-gray-400 w-36 lg:w-11/12 truncate'>{eachHistory.artist}</h2>
                                    <p className="text-gray-500 text-sm">{ eachHistory.year }</p>
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
        </div>
    )
}

export default HistoryPage