import React, { useContext, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { SearchContext } from '../../context/SearchContext';

function LikeButton({trackData, positionClass = 'top-2 left-2', sizeClass = 'h-6 w-6' }) {
    const {setLikedPlaylist, playingQuality, downloadQuality} = useContext(SearchContext)
    const [isLiked, setIsLiked] = useState(false)

    const handleClick = () => {
        liked(trackData)
    }

    const liked = (newItem) => {
		const newItemObj = {
			id: newItem.id,
			path: newItem.downloadUrl[playingQuality].url,
			downloadPath: newItem.downloadUrl[downloadQuality].url,
			name: newItem.name,
			thumbnail_50x50: newItem.image[1].url,
			thumbnail_500x500: newItem.image[2].url,
			artist: newItem.artists.primary[0].name,
			year: newItem.year,
			duration: newItem.duration,
        };
        setIsLiked(!isLiked)
		setLikedPlaylist((track) => [...track, newItemObj]);
	};

    return (
        <div
            onClick={handleClick}
            className={`${positionClass} ${sizeClass} absolute z-20 cursor-pointer`} >
            {
                isLiked ? <FaHeart className='w-full h-full' /> : <FaRegHeart className='w-full h-full' />
            }
        </div>
    )
}

export default LikeButton