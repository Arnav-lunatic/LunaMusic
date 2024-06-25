import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function QueueCard() {
	const { queue } = useContext(SearchContext);

	const FirstQueueElem = ({ thumbnail_50x50, trackName, artist }) => {
		return (
			<div className="flex items-start w-full bg-zinc-400 bg-opacity-15 rounded-lg p-2 backdrop-blur-xl mb-4 shadow-sm shadow-gray-700">
				<div className="flex items-center gap-4 justify-start w-full">
					<img
						className="h-16 w-16 rounded-lg"
						src={thumbnail_50x50}
						alt="thumbnail 50x50"
					/>
					<div>
						<h1 className="text-lg font-semibold max-w-60 truncate md:max-w-full">
							{trackName}
						</h1>
						<h1 className="text-sm max-w-60 truncate md:max-w-full">
							{artist}
						</h1>
					</div>
				</div>
				{/* <button className="flex gap-1 rounded-lg p-2 hover:bg-white hover:bg-opacity-10 transition-all ">
                    <FaRegSave className="w-6 h-6" />
                </button> */}
			</div>
		);
	};

	const OtherQueueElem = ({ thumbnail_50x50, trackName, artist }) => {
		return (
			<div className="flex items-start w-full pb-4 scale-95">
				<div className="flex items-center gap-4 justify-start w-full">
					<img
						className="h-16 w-16 rounded-lg"
						src={thumbnail_50x50}
						alt="thumbnail 50x50"
					/>
					<div>
						<h1 className="text-lg font-semibold max-w-60 truncate md:max-w-full">
							{trackName}
						</h1>
						<h1 className="text-sm max-w-60 truncate md:max-w-full">
							{artist}
						</h1>
					</div>
				</div>
				{/* <button className="flex gap-1 rounded-lg p-2 hover:bg-white hover:bg-opacity-10 transition-all ">
                    <FaRegSave className="w-6 h-6" />
                </button> */}
			</div>
		);
	};
	return (
		<div className="w-full h-4/5 md:p-10">
			{/* component in same file	 */}
			{queue.length !== 0 ? (
				<FirstQueueElem
					thumbnail_50x50={queue[0].thumbnail_50x50}
					trackName={queue[0].name}
					artist={queue[0].artist}
				/>
			) : (
				<h1 className="text-2xl font-bold text-center">
					Queue is Empty
				</h1>
			)}
			<div className="h-96 overflow-y-auto">
				{queue
					.filter((elem) => elem !== queue[0])
					.map((eachQueue) => {
						return (
							<OtherQueueElem
								key={eachQueue.id}
								thumbnail_50x50={eachQueue.thumbnail_50x50}
								trackName={eachQueue.name}
								artist={eachQueue.artist}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default QueueCard;
