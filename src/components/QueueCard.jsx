import React, { useContext} from "react";
import { SearchContext } from "../context/SearchContext";
import { TiDelete } from "react-icons/ti";

function QueueCard() {
	const { queue, setQueue } = useContext(SearchContext);

	const FirstQueueElem = ({ thumbnail_50x50, trackName, artist }) => {
		return (
			<div className="flex items-center w-full bg-zinc-400 bg-opacity-15 rounded-lg p-2 backdrop-blur-xl mb-4 shadow-sm shadow-gray-700">
				<div className="flex items-center gap-4 justify-start w-full">
					<img
						className="h-16 w-16 rounded-lg"
						src={thumbnail_50x50}
						alt="thumbnail 50x50"
					/>
					<div>
						<h1 className="text-lg font-semibold max-w-60 truncate lg:max-w-md xl:max-w-xl">
							{trackName}
						</h1>
						<h1 className="text-sm max-w-60 truncate md:max-w-md">
							{artist}
						</h1>
					</div>
				</div>

				
			</div>
		);
	};

	const OtherQueueElem = ({ thumbnail_50x50, trackName, artist, index }) => {
		return (
			<div className="flex items-center gap-4 justify-start w-full pb-4 cursor-pointer">
				<h1 className="absolute -left-2 text-4xl md:text-6xl drop-shadow-lg font-bold ">
					{index}
				</h1>
				<img
					className="ml-2 md:ml-6 h-16 w-16 rounded-lg"
					src={thumbnail_50x50}
					alt="thumbnail 50x50"
				/>
				<div>
					<h1 className="text-lg font-semibold max-w-60 truncate lg:max-w-md xl:max-w-xl">
						{trackName}
					</h1>
					<h1 className="text-sm max-w-60 truncate md:max-w-md">
						{artist}
					</h1>
				</div>
			</div>
		);
	};

	const handleClick = (index) => {
		const queueContainer = [...queue];
		const given_queue_elem = queue[index];
		queueContainer.splice(index, 1);
		queueContainer.unshift(given_queue_elem);
		setQueue(queueContainer);
	};

	const handleDelete = (index) => {
		const queueContainer = [...queue];
		queueContainer.splice(index, 1);
		setQueue(queueContainer);
	};

	return (
		<div className="w-full h-4/5 md:p-10">
			{queue.length === 1 ? (
				<h1 className="text-2xl font-bold text-center">
					Queue is Empty
				</h1>
			) : (
				<div>
					<FirstQueueElem
						thumbnail_50x50={queue[0].thumbnail_50x50}
						trackName={queue[0].name}
						artist={queue[0].artist}
					/>
				</div>
			)}
			<div className="h-[55vh] overflow-y-auto">
				{queue
					.filter((elem) => elem !== queue[0])
					.map((eachQueue, index) => {
						return (
							<div
								key={index}
								className="relative flex items-center justify-between scale-95"
							>
								{/* invisible button because on OtherQueueElem onClick isn't working on mouse click */}
								<button
									onClick={() => handleClick(index + 1)}
									className="absolute top-0 bottom-0 right-10 left-0 z-10"
								></button>

								<OtherQueueElem
									thumbnail_50x50={eachQueue.thumbnail_50x50}
									trackName={eachQueue.name}
									artist={eachQueue.artist}
									index={index + 2}
								/>

								<button
									onClick={() => handleDelete(index + 1)}
									className="w-8 h-8 cursor-pointer"
								>
									<TiDelete className="w-full h-full" />
								</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default QueueCard;
