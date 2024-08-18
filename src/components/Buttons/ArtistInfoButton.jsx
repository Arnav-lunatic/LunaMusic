import React, { useEffect, useState } from "react";

function ArtistInfoButton({ artistId }) {
	const [artistData, setArtistData] = useState([]);

	useEffect(() => {
		fetch(`https://saavn.dev/api/artists/${artistId}`)
			.then((response) => response.json())
			.then((data) => {
				setArtistData(data);
			});
	}, []);

	return (
		<div>
				{artistData.success ? (
					<button
						className="flex items-center gap-2 bg-black bg-opacity-50 backdrop-blur-lg px-4 py-2 rounded-xl"
					>
					<img
							className="rounded-full"
							src={artistData?.data.image[0].url}
						/>
						<h1 className=" text-5xl font-damnBold">
							{artistData?.data.name}
						</h1>
					</button>
				) : (
					""
				)}
		</div>
	);
}

export default ArtistInfoButton;
