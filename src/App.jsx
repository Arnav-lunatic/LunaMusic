import { useRef, useState } from "react";
import { NavBar, PlayBar } from "./components";
import { Outlet } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";
import { Tooltip } from "react-tooltip";

function App() {
	const [searchData, setSearchData] = useState([]);
	const [currentTrack, setCurrentTrack] = useState("/src/assets/default.wav");
	const [trackData, setTrackData] = useState({
		name: "No track found",
		thumbnail: "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		artist: "No artist found",
		year: 2024,
		duration: 0,
	});
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
				trackData,
				setTrackData,
				pause,
				setPause,
				audioRef,
				convertIntoMin,
				progressBarRef,
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
