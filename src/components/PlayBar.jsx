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
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineQueueMusic,
	MdMusicNote,
} from "react-icons/md";
import QueueCard from "./QueueCard";
import SleepTimerElem from "./SleepTimerElem";
import TrackDataCard from "./TrackDataCard";
import { PiTimerBold } from "react-icons/pi";

const PlayBar = () => {
	const [playTime, setPlayTime] = useState(0);
	const [sleepTimer, setSleepTimer] = useState("Not Set");
	const {
		currentTrack,
		setCurrentTrack,
		pause,
		setPause,
		audioRef,
		progressBarRef,
		convertIntoMin,
		queue,
		setQueue
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

	// queue autoplay next track

	const handlePause = () => {
		setPause(() => !pause);
	};

	const play_next_track = () => {
		if (queue.length === 1) {
			setPause((e) => !e)			
			return
		}
		let queueContainer = [...queue];
		let queue_without_first_elem = queueContainer.shift();
		queueContainer.push(queue_without_first_elem);
		setQueue(queueContainer);
	};

	const play_prev_track = () => {
		let queueContainer = [...queue];
		let queue_without_first_elem = queueContainer.pop();
		queueContainer.unshift(queue_without_first_elem);
		setQueue(queueContainer);
	};

	useEffect(() => {
		queue.length === 0 ? "" : setCurrentTrack(queue[0]);
	}, [queue]);

	// fullscreen
	const [isFullscreen, setIsFullscreen] = useState(false);
	const handleFullScreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	const [displayQueue, setDisplayQueue] = useState(false);
	const [displayTrackData, setDisplayTrackData] = useState(true);

	const handle_view_queue = () => {
		setDisplayQueue(true);
		setDisplayTrackData(false);
	};

	const handle_view_trackData = () => {
		setDisplayQueue(false);
		setDisplayTrackData(true);
	};

	const [show_sleep_timer_menu, setShow_sleep_timer_menu] = useState(false);

	const handle_view_sleep_timer = () => {
		setShow_sleep_timer_menu(!show_sleep_timer_menu);
	};

	if (isFullscreen) {
		document.getElementById('root').style.overflow = 'hidden'
	} else {
		document.getElementById('root').style.overflow = 'auto'
	}
	

	return (
		<div
			className={`fixed rounded-xl duration-500 transition-all bottom-0 left-0 w-full z-50
				${isFullscreen ? "h-full bg-black bg-opacity-40 backdrop-blur-lg" : "h-4"}`}
		>
			{isFullscreen && (
				<div className=" w-screen h-full justify-around">
					<div className="w-full pt-4 pl-2 pr-2">
						<button
							onClick={handleFullScreen}
							className={`w-8 h-8 hover:bg-white hover:backdrop-blur-lg hover:bg-opacity-30 rounded-full transition-all`}
						>
							<IoClose className="w-full h-full" />
						</button>
					</div>

					<div className="flex gap-2 w-full h-full justify-around pb-36 md:pb-0">
						<div className="relative w-full md:w-1/2 max-w-xl p-4 md:p-10">
							<div className="h-5/6">
								<div
									className={`absolute top-3 left-4 right-4 transition-all duration-500 ${
										displayTrackData
											? "translate-x-0 opacity-100"
											: "translate-x-full opacity-0"
									}`}
								>
									<TrackDataCard />
								</div>

								<div
									className={`absolute top-3 left-4 right-4 transition-all duration-500 ${
										displayQueue
											? "translate-x-0 opacity-100"
											: "-translate-x-full opacity-0"
									}`}
								>
									<QueueCard />
								</div>
							</div>

							<div className="md:hidden flex items-center justify-evenly m-auto w-28 mt-2 bg-zinc-400 bg-opacity-15 rounded-full p-2 backdrop-blur-xl">
								<MdOutlineQueueMusic
									onClick={handle_view_queue}
									className={`w-8 h-8 rounded-full p-1 ${
										displayQueue ? "bg-zinc-700" : ""
									}`}
								/>
								<MdMusicNote
									onClick={handle_view_trackData}
									className={`w-8 h-8 rounded-full p-1 ${
										displayTrackData ? "bg-zinc-700" : ""
									}`}
								/>
							</div>
						</div>

						<div className="w-1/2 hidden md:inline-block">
							<QueueCard />
						</div>
					</div>
				</div>
			)}

			{/* bottom bar */}
			<div
				className={`fixed right-1 left-1 md:right-4 md:left-4 rounded-lg
					${
						isFullscreen
							? "bottom-0"
							: "bg-black bg-opacity-40 backdrop-blur-lg bottom-1"
					}`}
			>
				<button
					onClick={handleFullScreen}
					className={`absolute left-2 w-8 h-8 hover:bg-white hover:backdrop-blur-lg hover:bg-opacity-30 rounded-full transition-all duration-300 ${
						isFullscreen ? "rotate-180 top-5" : "top-2"
					}`}
				>
					<MdOutlineKeyboardArrowUp className="w-full h-full" />
				</button>

				<div
					className={`${
						isFullscreen ? "flex gap-2 items-center" : ""
					}`}
				>
					{isFullscreen && <span>{convertIntoMin(playTime)}</span>}
					<input
						type="range"
						defaultValue="0"
						ref={progressBarRef}
						className={`bg-white bg-opacity-10 ${
							isFullscreen
								? "w-full h-2 rounded-full"
								: "absolute h-1 left-1 right-1 top-0 rounded-t-3xl"
						} `}
						onChange={() => {
							audioRef.current.currentTime =
								progressBarRef.current.value;
						}}
					/>
					{isFullscreen && (
						<span>{convertIntoMin(currentTrack?.duration)}</span>
					)}
				</div>

				<div
					className={`flex h-20 items-center pr-2 pl-2 md:pr-4 md:pl-4 ${
						isFullscreen
							? "justify-around md:justify-between"
							: "justify-between"
					}`}
				>
					<div
						className={`md:w-1/3 pl-8 transition-opacity duration-300 ${
							isFullscreen
								? "hidden md:inline-block md:opacity-0"
								: "inline-block"
						}`}
					>
						<div className={`flex gap-1`}>
							<img
								onClick={handleFullScreen}
								className="w-12 h-12 md:mr-4 md:w-16 md:h-16 rounded-lg"
								src={currentTrack?.thumbnail_50x50}
								alt="img"
							/>
							<div className="flex flex-col w-full">
								<span className="text-sm max-w-48 lg:max-w-lg md:text-lg truncate font-semibold">
									{currentTrack?.name}
								</span>
								<span className="text-xs w-48 md:text-sm truncate">
									{currentTrack?.artist}
								</span>
								<span className="text-xs hidden md:inline-block">
									{currentTrack?.year}
								</span>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2">
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
						<button onClick={play_prev_track} className="text-2xl">
							<IoPlaySkipBack />
						</button>

						<button onClick={handlePause} className="text-2xl">
							{pause ? <FaPause /> : <FaPlay />}
						</button>

						<button onClick={play_next_track} className="text-2xl">
							<IoPlaySkipForward />
						</button>
						{/* <button className="text-2xl">
							<IoShuffle />
						</button> */}
					</div>

					{/* For larger screens */}
					<div
						className={`hidden md:flex justify-end items-center md:w-1/3`}
					>
						<button
							onClick={handle_view_sleep_timer}
							className="flex justify-center gap-1 cursor-pointer"
						>
							<PiTimerBold className="w-6 h-6 " />
							<span className="font-bold">{sleepTimer}</span>
						</button>
						{show_sleep_timer_menu && !isFullscreen ? (
							<SleepTimerElem setSleepTimer={setSleepTimer} show_sleep_timer_menu={show_sleep_timer_menu} setShow_sleep_timer_menu={setShow_sleep_timer_menu} />
						) : (
							""
						)}
					</div>

					{/* sleep timer button smaller screen */}
					{isFullscreen && (
						<>
							<button
								onClick={handle_view_sleep_timer}
								className="flex gap-1 absolute right-2 md:hidden"
							>
								<PiTimerBold className="w-6 h-6 " />
								<span className="font-bold">{sleepTimer}</span>
							</button>
							{show_sleep_timer_menu && isFullscreen ? (
								<SleepTimerElem setSleepTimer={setSleepTimer} show_sleep_timer_menu={show_sleep_timer_menu} setShow_sleep_timer_menu={setShow_sleep_timer_menu} />
							) : (
								""
								)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlayBar;
