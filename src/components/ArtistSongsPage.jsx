import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import DisplayTracks from './DisplayTracks';

function ArtistSongPage() {
    const [artistSongData, setArtistSongData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    // Get a query parameter
    const location = useLocation();
    const artistId = new URLSearchParams(location.search).get('id');

    const { currentArtistName, currentArtistImg } = location.state;

    const searchArtistSongData = (artistId) => {
        setIsLoading(true)
        fetch(`https://saavn.dev/api/artists/${artistId}/songs`)
            .then((response) => response.json())
            .then((data) => {
                setArtistSongData(data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        searchArtistSongData(artistId)
    }, [artistId])

    return (
        <div className='h-[80dvh] mt-20'>
            <div className='flex items-center text-3xl font-bold justify-between px-1 xl:px-20 '>
                <div
                    onClick={() => navigate(-1)}
                    className='bg-black bg-opacity-40 backdrop-blur-lg rounded-full'>
                    <IoArrowBack className='w-12 h-12 cursor-pointer transition-all duration-500 hover:-translate-x-4' />
                </div>
                <div className='flex items-center gap-2 py-2 px-4 rounded-lg bg-black bg-opacity-40 backdrop-blur-lg'>
                    <img className='rounded-full w-12 h-12' src={currentArtistImg} alt="" />
                    <h1>{currentArtistName}</h1>
                </div>
            </div>
            <DisplayTracks isLoading={isLoading} searchData={artistSongData} data={ artistSongData.success ? artistSongData?.data.songs : ''} />
        </div>
    )
}

export default ArtistSongPage