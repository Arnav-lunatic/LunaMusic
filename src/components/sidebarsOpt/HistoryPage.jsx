import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../context/SearchContext'
import TrackCard from '../cards/TrackCard'
import { FaHistory } from "react-icons/fa";


function HistoryPage() {
    const { currentTrack ,trackHistory, setTrackHistory } = useContext(SearchContext)
    
    useEffect(() => {
        currentTrack.name === "No track found" ? '' : setTrackHistory([currentTrack, ...trackHistory])
        if (trackHistory.length === 15) {
            setTrackHistory(trackHistory.pop())
        }
    }, [currentTrack])

    const clearHistory = () => {
        setTrackHistory([])
    }

    return (
        <div className='absolute top-20 bottom-24 left-1/2 w-[95vw] max-w-6xl -translate-x-1/2 overflow-y-auto rounded-xl bg-black bg-opacity-40 backdrop-blur-lg p-2 md:p-6'>
            <h1 className="text-3xl lg:text-4xl font-bold text-center">History</h1>
            <div onClick={clearHistory} className='flex justify-end items-center gap-2 text-lg cursor-pointer'><FaHistory/> Clear History</div>
            <div>
                {
                    trackHistory ? trackHistory.map((eachHistory, index) => {
                        return (
                            <TrackCard key={index} trackData={eachHistory} trackList={trackHistory} setTrackList={setTrackHistory} index={index} />
                        )
                    }) : ''
                }
            </div>
        </div>
    )
}

export default HistoryPage