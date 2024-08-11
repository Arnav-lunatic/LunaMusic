import React from "react";
import ReactLoading from "react-loading";
import SongCard from "./cards/SongCard";
import DetailedSongCard from "./cards/DetailedSongCard"

function DisplayTracks({ isLoading, searchData, data }) {
    
    const first_track_data = data
    
	return (
		<div>
			{isLoading ? (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<ReactLoading
						type="bars"
						color="#9233EA"
						height={100}
						width={100}
					/>
				</div>
			) : searchData?.success ? (
				<div className="flex p-2 lg:flex-row flex-col gap-2 h-[70dvh] lg:overflow">
					<div className="flex items-center w-full lg:w-1/2">
						<DetailedSongCard first_track_data={first_track_data} />
					</div>

					<div className="grid gap-2 pb-24 lg:p-0 lg:w-1/2 lg:overflow-y-auto">
						{/* 
						It Render a list of all other sound track except first
						1) Filter the first sound track
						2) render all other sound tracks
						3) All the Track data passed to component through props
						*/}
						{data.
							filter(
								(other_track_data) =>
									first_track_data.indexOf(
										other_track_data
									) !== 0
							)
							.map((other_track_data) => {
								return (
									<SongCard
										track_data={other_track_data}
										key={other_track_data.id}
									/>
								);
							})}
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default DisplayTracks;
