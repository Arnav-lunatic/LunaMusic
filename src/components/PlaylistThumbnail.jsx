import React from "react";

function PlaylistThumbnail({ data }) {
    let imageList = data.filter((elem, index) => index < 4);
    imageList = imageList.reverse()

	return (
		<div>
			<div className="relative w-44 h-44 md:w-64 md:h-64">
                {imageList.map((elem, index) => {
                    return (
                        <img key={index} className={`absolute w-40 h-40 md:w-60 md:h-60 top-${index} right-${index} rounded-lg`} src={elem.thumbnail_500x500} />
                    )
				})}
			</div>
		</div>
	);
}

export default PlaylistThumbnail;
