import { useRef, useState, useEffect } from "react";
import { NavBar, PlayBar, SidebarMenu } from "./components";
import { Outlet } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";
import { Tooltip } from "react-tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { default_thumbnail_50x50, default_thumbnail_500x500, defaultTrackPath, bg } from "./components";
import { useSearchParams } from "react-router-dom";


function App() {
	const [currentTrack, setCurrentTrack] = useState({
		path: defaultTrackPath,
		downloadPath: defaultTrackPath,
		id: 1,
		name: "No track found",
		thumbnail_50x50: default_thumbnail_50x50,
		thumbnail_500x500: default_thumbnail_500x500,
		artist: "No artist found",
		year: 2024,
		duration: 0,
	});

	// search value
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchValue, setSearchValue] = useState(searchParams.get("v") || '')

	const storedQueue = JSON.parse(localStorage.getItem("queue"));
	const [queue, setQueue] = useState(storedQueue ? storedQueue : []);

	const storedSavedPlaylist = JSON.parse(localStorage.getItem("savedPlaylist"));
	const [savedPlaylist, setSavedPlaylist] = useState(storedSavedPlaylist ? storedSavedPlaylist : []);

	// Quality Selector
	const storedPlayingQuality = localStorage.getItem("playingQuality")
	const storedDownloadQuality = localStorage.getItem("downloadQuality")
	const [playingQuality, setPlayingQuality] = useState(storedPlayingQuality? storedPlayingQuality : 4);
	const [downloadQuality, setDownloadQuality] = useState(storedDownloadQuality? storedDownloadQuality : 4);

	// Background 
	const storedBgImage = localStorage.getItem("bgImage")
	const [bgImage, setBgImage] = useState(storedBgImage ? storedBgImage : bg)
	document.documentElement.style.setProperty('--bodyBg', `url(${bgImage})`)

	// Local Storage
	useEffect(() => {
		localStorage.setItem("queue", JSON.stringify(queue));
		localStorage.setItem("savedPlaylist", JSON.stringify(savedPlaylist));
		localStorage.setItem("playingQuality", playingQuality)
		localStorage.setItem("downloadQuality", downloadQuality)
		localStorage.setItem("bgImage", bgImage)
	}, [queue, savedPlaylist, playingQuality, downloadQuality, bgImage]);

	

	const [pause, setPause] = useState(false);
	const audioRef = useRef();
	const progressBarRef = useRef();
    const sideBarButtonRef = useRef()

	const [show_sidebar_menu, setShow_sidebar_menu] = useState(false)

	// Add to Queue Function
	const add_to_queue = (newItem) => {
		const newItemObj = {
			id: newItem.id,
			path: newItem.downloadUrl[playingQuality].url,
			downloadPath: newItem.downloadUrl[downloadQuality].url,
			name: newItem.name,
			thumbnail_50x50: newItem.image[1].url,
			thumbnail_500x500: newItem.image[2].url,
			artist: newItem.artists.primary[0].name,
			year: newItem.year,
			duration: newItem.duration,
		};
		setQueue((queue) => [...queue, newItemObj]);
		queue.length === 0 ? setCurrentTrack(newItemObj) : "";
	};

	// Add to Save Function
	const add_to_save = (newItem) => {
		const newItemObj = {
			id: newItem.id,
			path: newItem.downloadUrl[playingQuality].url,
			downloadPath: newItem.downloadUrl[downloadQuality].url,
			name: newItem.name,
			thumbnail_50x50: newItem.image[1].url,
			thumbnail_500x500: newItem.image[2].url,
			artist: newItem.artists.primary[0].name,
			year: newItem.year,
			duration: newItem.duration,
		};
		setSavedPlaylist((queue) => [...queue, newItemObj]);
	};

	// API provides playCount in sec, this function will convert it mins i.e. ex- 03:09
	const convertIntoMin = (sec) => {
		return `${
			sec / 60 < 10 ? "0" + Math.floor(sec / 60) : Math.floor(sec / 60)
		}:${sec % 60 < 10 ? "0" + Math.floor(sec % 60) : Math.floor(sec % 60)}`;
	};

	// media session in navigation

	if ("mediaSession" in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: currentTrack.name,
			artist: currentTrack.artist,
			album: "Luna Music",
			artwork: [
				{
					src: currentTrack.thumbnail_50x50,
					sizes: "50x50",
					type: "image/png",
				},
				{
					src: currentTrack.thumbnail_500x500,
					sizes: "500x500",
					type: "image/png",
				},
			],
		});

		navigator.mediaSession.setActionHandler("play", () => setPause(true));
		navigator.mediaSession.setActionHandler("pause", () => setPause(false));

		navigator.mediaSession.setActionHandler("previoustrack", () => {
			let queueContainer = [...queue];
			let queue_without_first_elem = queueContainer.pop();
			queueContainer.unshift(queue_without_first_elem);
			setQueue(queueContainer);
		});
		navigator.mediaSession.setActionHandler("nexttrack", () => {
			let queueContainer = [...queue];
			let queue_without_first_elem = queueContainer.shift();
			queueContainer.push(queue_without_first_elem);
			setQueue(queueContainer);
		});
	}

	return (
		<SearchContext.Provider
			value={{
				currentTrack,
				setCurrentTrack,
				pause,
				setPause,
				audioRef,
				convertIntoMin,
				progressBarRef,
				searchValue,
				setSearchValue,	
				searchParams,
				setSearchParams,					
				queue,
				setQueue,
				savedPlaylist,
				setSavedPlaylist,
				show_sidebar_menu,
				setShow_sidebar_menu,
				sideBarButtonRef,
				setBgImage,
				playingQuality,
				setPlayingQuality,
				downloadQuality,
				setDownloadQuality,
				add_to_save,
				add_to_queue,
			}}
		>
			<NavBar />
			< SidebarMenu />
			<Outlet />
			<PlayBar />

			<Analytics />
			<SpeedInsights />
			<Tooltip
				id="my-tooltip"
				className="invisible md:visible"
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
