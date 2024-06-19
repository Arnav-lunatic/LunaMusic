import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoShuffle } from "react-icons/io5";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { RxLoop } from "react-icons/rx";
import { SearchContext } from "../context/SearchContext";

const PlayBar = () => {
	const [volume, setVolume] = useState(50);
	const [playTime, setPlayTime] = useState(0);
	const {
		currentTrack,
		trackData,
		pause,
		setPause,
		audioRef,
		progressBarRef,
		convertIntoMin,
	} = useContext(SearchContext);

	// requestAnimationFrame is often used within lifecycle methods or hooks like useEffect to manage animations or perform tasks that need to happen just before a repaint.
	// We will use this to update play time

	const playAnimationRef = useRef();



	const repeat = useCallback(() => {
		const currentTime = audioRef.current.currentTime;
		setPlayTime(currentTime);
		progressBarRef.current.value = currentTime
		progressBarRef.current.style.setProperty(
			"--range-progress",
			`${(progressBarRef.current.value / trackData.duration) * 100}%`
		);

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [audioRef, trackData.duration, progressBarRef, setPlayTime]);

	useEffect(() => {
		if (pause) {
			audioRef.current.play();
			playAnimationRef.current = requestAnimationFrame(repeat);
		} else {
			audioRef.current.pause();
			cancelAnimationFrame(playAnimationRef.current);
		}
	}, [pause, audioRef, repeat]);

	const onLoadMetaData = () => {
		progressBarRef.current.max = trackData.duration
	}

	return (
		<div className="fixed bottom-1 right-1 left-1 md:right-4 md:left-4 grid rounded-xl bg-black bg-opacity-40 backdrop-blur-lg">
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

			<div className=" flex h-20 items-center justify-between pr-2 pl-2 md:pr-4 md:pl-4">
				<div className="flex w-1/4 md:w-1/3">
					<img
						className="w-12 h-12 md:mr-4 md:w-16 md:h-16 rounded-lg"
						src={trackData.thumbnail}
						alt="img"
					/>
					<div className="flex flex-col w-full">
						<span className="text-lg hidden md:block md:w-10/12 md:truncate font-semibold">
							{trackData.name}
						</span>
						<span className="text-sm hidden md:block">
							{trackData.artist}
						</span>
						<span className="text-xs hidden md:block">
							{trackData.year}
						</span>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<audio src={currentTrack} ref={audioRef} autoPlay onLoadedData={onLoadMetaData}/>

					{/* <button className="text-2xl">
							<RxLoop />
						</button> 
					<button className="text-2xl">
						<IoPlaySkipBack />
					</button>
					*/}
					<button
						onClick={() => setPause(!pause)}
						className="text-2xl"
					>
						{pause ? <FaPause /> : <FaPlay />}
					</button>
					{/*
					<button className="text-2xl">
						<IoPlaySkipForward />
					</button>
					<button className="text-2xl">
						<IoShuffle />
					</button> */}
				</div>

				{/* playTime */}
				<div className="hidden md:block text-lg text-right w-1/3">
					{convertIntoMin(playTime)} /{convertIntoMin(trackData.duration)}
				</div>
				<div className="block md:hidden text-lg text-right w-1/4">
					<div>{convertIntoMin(playTime)}</div>
					<div>{convertIntoMin(trackData.duration)}</div>
				</div>
			</div>
		</div>
	);
};

export default PlayBar;

{
	/* <div className="relative flex items-center w-24">
          <FaVolumeUp className="absolute left-0 ml-2 text-gray-500" />
          <input
            type="range"text
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-400 rounded-lg overflow-hidden no-thumb"
            style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          />
          <span className="absolute right-0 mr-2 text-gray-500 text-xs">{volume}%</span>
        </div> */
}
