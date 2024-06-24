import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from "react";
import { FaPause, FaPlay, FaRegSave, FaVolumeUp } from "react-icons/fa";
import {
	IoShuffle,
	IoClose,
	IoPlaySkipBack,
	IoPlaySkipForward,
} from "react-icons/io5";
import { RxLoop } from "react-icons/rx";
import { SearchContext } from "../context/SearchContext";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaS } from "react-icons/fa6";

const PlayBar = () => {
	const [playTime, setPlayTime] = useState(0);
	const {
		currentTrack,
		setCurrentTrack,
		pause,
		setPause,
		audioRef,
		progressBarRef,
		convertIntoMin,
		queue,
		queueCount,
		setQueueCount,
	} = useContext(SearchContext);

	// requestAnimationFrame is often used within lifecycle methods or hooks like useEffect to manage animations or perform tasks that need to happen just before a repaint.
	// We will use this to update play time

	const playAnimationRef = useRef();

	const progressBarAnimation = useCallback(() => {
		const currentTime = audioRef.current.currentTime;
		setPlayTime(currentTime);
		progressBarRef.current.value = currentTime;
		progressBarRef.current.style.setProperty(
			"--range-progress",
			`${(progressBarRef.current.value / currentTrack.duration) * 100}%`
		);

		playAnimationRef.current = requestAnimationFrame(progressBarAnimation);
	}, [audioRef, currentTrack?.duration, progressBarRef, setPlayTime]);

	useEffect(() => {
		// pause give true value, when track is playing, we need to reverse it.
		if (pause) {
			audioRef.current.play();
			playAnimationRef.current =
				requestAnimationFrame(progressBarAnimation);
		} else {
			audioRef.current.pause();
			cancelAnimationFrame(playAnimationRef.current);
		}
	}, [pause, audioRef, progressBarAnimation]);

	const onLoadMetaData = () => {
		progressBarRef.current.max = currentTrack?.duration;
	};

	// fullscreen
	const [isFullscreen, setIsFullscreen] = useState(false);
	const handleFullScreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	const QueueCard = ({ thumbnail_50x50, trackName, artist }) => {
		return (
			<div className="flex items-start w-full pb-4">
				<div className="flex items-center gap-4 justify-start w-full">
					<img
						className="h-16 w-16 rounded-lg"
						src={thumbnail_50x50}
						alt="thumbnail_50x50"
					/>
					<div>
						<h1 className="text-lg font-semibold max-w-60 truncate">{trackName}</h1>
						<h1 className="text-sm max-w-60 truncate">{artist}</h1>
					</div>
				</div>
				{/* <button className="flex gap-1 rounded-lg p-2 hover:bg-white hover:bg-opacity-10 transition-all ">
					<FaRegSave className="w-6 h-6" />
				</button> */}
			</div>
		);
	};

	// queue autoplay next track

	const handlePause = () => {
		setPause(() => !pause);
	};

	const play_next_track = () => {
		if (queueCount === queue.length - 1) {
			setQueueCount(0);
		} else {
			setQueueCount(() => queueCount + 1);
		}
	};

	const handle_prev_track = () =>
		queueCount === 0
			? setQueueCount(queue.length - 1)
			: setQueueCount(() => queueCount - 1);

	const handle_next_track = () =>
		queueCount === queue.length - 1
			? setQueueCount(0)
			: setQueueCount(() => queueCount + 1);

	useEffect(() => {
		queue.length === 0 ? "" : setCurrentTrack(queue[queueCount]);
	}, [queueCount]);

	// volume
	const [volume, setVolume] = useState(50);
	const handleVolumeChange = () => {};

	return (
		<div
			className={`fixed bottom-2 right-2 left-2 rounded-xl
				${!isFullscreen ? "" : "bg-black bg-opacity-40 backdrop-blur-lg"}
				${isFullscreen ? "top-1" : ""}`}
		>
			{isFullscreen && (
				<div className="flex flex-col md:flex-row gap-2 w-full h-full justify-around mt-10 pb-32 md:pb-0">
					<button
						onClick={handleFullScreen}
						className={`absolute top-4 left-4 w-8 h-8 hover:bg-white hover:backdrop-blur-lg hover:bg-opacity-30 rounded-full transition-all`}
					>
						<IoClose className="w-full h-full" />
					</button>

					{/* Current track display on large screen */}
					<div className="relative m-auto hidden lg:inline-block w-1/2 max-w-xl p-10 pt-0">
						<img
							className="rounded-t-lg w-full lg:inline-block"
							src={currentTrack?.thumbnail_500x500}
							alt="Thumbnail"
						/>
						<div className="flex items-center justify-between bg-zinc-400 bg-opacity-15 rounded-b-lg p-2 backdrop-blur-xl shadow-md">
							<div>
								<h1 className="text-xl font-bold">
									{currentTrack?.name}
								</h1>
								<h1 className="text-sm font-semibold">
									{currentTrack?.artist}
								</h1>
							</div>
							{/* <button className="flex gap-1 mr-2 hover:bg-zinc-500 p-1 rounded-md">
								<FaRegSave className="w-6 h-6" />
								<h1 className="text-lg font-bold">Add to Save</h1>
							</button> */}
						</div>
					</div>
					{/* Current track display on small screen */}
					<div className="flex w-full lg:hidden p-4">
						<img
							className="rounded-l-lg w-20 h-20"
							src={currentTrack?.thumbnail_50x50}
							alt="Thumbnail"
						/>
						<div className="flex items-center w-96 justify-between bg-zinc-400 bg-opacity-15 rounded-r-lg p-2 backdrop-blur-xl shadow-md">
							<div className="">
								<h1 className="text-lg font-bold max-w-60 truncate">
									{currentTrack?.name}
								</h1>
								<h1 className="text-sm font-semibold max-w-60 truncate">
									{currentTrack?.artist}
								</h1>
							</div>
							{/* <button className="flex gap-1 mr-2 hover:bg-zinc-500 p-1 rounded-md">
								<FaRegSave className="w-6 h-6" />
								<h1 className="text-lg font-bold">Add to Save</h1>
							</button> */}
						</div>
					</div>

					<div className="w-full h-4/5 md:w-1/2 p-2 md:p-10 overflow-y-auto">
						{/* component in same file	 */}
						{queue.length !== 0 ? (
							queue.map((eachQueue) => {
								return (
									<QueueCard
										key={eachQueue.id}
										thumbnail_50x50={
											eachQueue.thumbnail_50x50
										}
										trackName={eachQueue.name}
										artist={eachQueue.artist}
									/>
								);
							})
						) : (
							<h1 className="text-2xl font-bold text-center">
								Queue is Empty
							</h1>
						)}
					</div>
				</div>
			)}

			<div
				className={`fixed bottom-0 right-1 left-1 md:right-4 md:left-4 grid rounded-xl 
					${isFullscreen ? "" : "bg-black bg-opacity-40 backdrop-blur-lg bottom-1"}`}
			>
				<button
					onClick={handleFullScreen}
					className={`hidden md:inline-block absolute top-2 left-2 w-8 h-8 hover:bg-white hover:backdrop-blur-lg hover:bg-opacity-30 rounded-full transition-all ${
						isFullscreen ? "rotate-180" : ""
					}`}
				>
					<MdOutlineKeyboardArrowUp className="w-full h-full" />
				</button>
				<div>
					<input
						type="range"
						defaultValue="0"
						ref={progressBarRef}
						className=" absolute left-1 right-1 top-0 "
						onChange={() => {
							audioRef.current.currentTime =
								progressBarRef.current.value;
						}}
					/>
				</div>

				<div
					onClick={handleFullScreen}
					className=" flex h-20 items-center justify-between pr-2 pl-2 md:pr-4 md:pl-4 cursor-pointer"
				>
					<div className="flex w-1/4 md:w-1/3 pl-0 md:pl-7">
						<img
							className="w-12 h-12 md:mr-4 md:w-16 md:h-16 rounded-lg"
							src={currentTrack?.thumbnail_50x50}
							alt="img"
						/>
						<div className="flex flex-col w-full">
							<span className="text-lg hidden md:block md:w-10/12 md:truncate font-semibold">
								{currentTrack?.name}
							</span>
							<span className="text-sm hidden md:block">
								{currentTrack?.artist}
							</span>
							<span className="text-xs hidden md:block">
								{currentTrack?.year}
							</span>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						{/* AUDIO ELEMENT */}
						<audio
							src={currentTrack?.path}
							ref={audioRef}
							onEnded={play_next_track}
							autoPlay
							onLoadedData={onLoadMetaData}
						/>

						{/* <button className="text-2xl">
							<RxLoop />
						</button> */}
						<button
							onClick={handle_prev_track}
							className="text-2xl"
						>
							<IoPlaySkipBack />
						</button>

						<button onClick={handlePause} className="text-2xl">
							{pause ? <FaPause /> : <FaPlay />}
						</button>

						<button
							onClick={handle_next_track}
							className="text-2xl"
						>
							<IoPlaySkipForward />
						</button>
						{/* <button className="text-2xl">
							<IoShuffle />
						</button> */}
					</div>

					{/* playTime */}
					<div className="w-1/3">
						<div className="hidden md:block text-lg text-right">
							{convertIntoMin(playTime)} /
							{convertIntoMin(currentTrack?.duration)}
						</div>
						<div className="block md:hidden text-xs text-right">
							<div>{convertIntoMin(playTime)}</div>
							<div>{convertIntoMin(currentTrack?.duration)}</div>
						</div>

						<div className="relative flex items-center w-24">
							{/* <FaVolumeUp className="absolute left-0 ml-2 text-gray-500" />
							<input
								type="range"
								text
								value={volume}
								onChange={handleVolumeChange}
								className="w-full h-1 bg-gray-400 rounded-lg overflow-hidden no-thumb"
								style={{
									paddingLeft: "1.5rem",
									paddingRight: "1.5rem",
								}}
							/>
							<span className="absolute right-0 mr-2 text-gray-500 text-xs">
								{volume}%
							</span> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayBar;

{
	/*  */
}
