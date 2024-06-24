import { useRef, useState } from "react";
import { NavBar, PlayBar } from "./components";
import { Outlet } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";
import { Tooltip } from "react-tooltip";

function App() {
	const [searchData, setSearchData] = useState([]);
	const [currentTrack, setCurrentTrack] = useState({
		path: "/src/assets/default.wav",
		id: 1,
		name: "No track found",
		thumbnail_50x50: "/src/assets/default_thumbnail_50x50.jpg",
		thumbnail_500x500: "/src/assets/default_thumbnail_500x500.jpg",
		artist: "No artist found",
		year: 2024,
		duration: 0,
	});
	const [queue, setQueue] = useState([])
	const [queueCount, setQueueCount] = useState(0)

	const [pause, setPause] = useState(false);
	const audioRef = useRef();
	const progressBarRef = useRef()

	// API provides playCount in sec, this function will convert it mins i.e. ex- 03:09
	const convertIntoMin = (sec) => {
		return `${(sec / 60 < 10) ? "0" + Math.floor(sec / 60) : Math.floor(sec / 60)}:${
			(sec % 60 < 10) ? "0" + Math.floor(sec % 60) : Math.floor(sec % 60)
		}`;
	};

	return (
		<SearchContext.Provider
			value={{
				searchData,
				currentTrack,
				setCurrentTrack,
				pause,
				setPause,
				audioRef,
				convertIntoMin,
				progressBarRef,
				queue,
				setQueue,
				queueCount,
				setQueueCount
			}}
		>
			<NavBar sendValue={(searchData) => setSearchData(searchData)} />
			<Outlet />
			<PlayBar/>
			<Tooltip
				id="my-tooltip"
				style={{
					backgroundColor: "#ffffff",
					color: "#222222",
					padding: "4px 6px",
				}}
			/>
		</SearchContext.Provider>
	);
}

export default App;
