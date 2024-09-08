import { useRef, useState, useEffect } from "react";
import { NavBar, PlayBar, SidebarMenu } from "./components";
import { Outlet } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";
import { Tooltip } from "react-tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
	default_thumbnail_50x50,
	default_thumbnail_500x500,
	defaultTrackPath,
	bg,
} from "./components";
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

	useEffect(() => {
		currentTrack
			? ""
			: setCurrentTrack({
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
	}, [currentTrack]);

	// search value
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get("v") || "");

	// Queue
	const storedQueue = JSON.parse(localStorage.getItem("queue"));
	const [queue, setQueue] = useState(storedQueue ? storedQueue : []);

	// Saved Playlist
	const storedSavedPlaylist = JSON.parse(
		localStorage.getItem("savedPlaylist")
	);
	const [savedPlaylist, setSavedPlaylist] = useState(
		storedSavedPlaylist ? storedSavedPlaylist : []
	);

	// Liked Playlist
	const storedLikedPlaylist = JSON.parse(
		localStorage.getItem("likedPlaylist")
	);
	const [likedPlaylist, setLikedPlaylist] = useState(
		storedLikedPlaylist ? storedLikedPlaylist : []
	);

	// History
	const storedTrackHistory = JSON.parse(localStorage.getItem("trackHistory"));
	const [trackHistory, setTrackHistory] = useState(
		storedTrackHistory ? storedTrackHistory : []
	);

	// Quality Selector
	const storedPlayingQuality = localStorage.getItem("playingQuality");
	const storedDownloadQuality = localStorage.getItem("downloadQuality");
	const [playingQuality, setPlayingQuality] = useState(
		storedPlayingQuality ? storedPlayingQuality : 4
	);
	const [downloadQuality, setDownloadQuality] = useState(
		storedDownloadQuality ? storedDownloadQuality : 4
	);

	// Background
	const storedBgImage = localStorage.getItem("bgImage");
	const [bgImage, setBgImage] = useState(storedBgImage ? storedBgImage : bg);
	document.documentElement.style.setProperty("--bodyBg", `url(${bgImage})`);

	// Local Storage
	useEffect(() => {
		localStorage.setItem("queue", JSON.stringify(queue));
		localStorage.setItem("savedPlaylist", JSON.stringify(savedPlaylist));
		localStorage.setItem("likedPlaylist", JSON.stringify(likedPlaylist));
		localStorage.setItem("playingQuality", playingQuality);
		localStorage.setItem("trackHistory", JSON.stringify(trackHistory));
		localStorage.setItem("downloadQuality", downloadQuality);
		localStorage.setItem("bgImage", bgImage);
	}, [
		queue,
		savedPlaylist,
		likedPlaylist,
		playingQuality,
		downloadQuality,
		trackHistory,
		bgImage,
	]);

	const [pause, setPause] = useState(false);
	const audioRef = useRef();
	const progressBarRef = useRef();
	const sideBarButtonRef = useRef();

	const [show_sidebar_menu, setShow_sidebar_menu] = useState(false);

	// API provides playCount in sec, this function will convert it mins i.e. ex- 03:09
	const convertIntoMin = (sec) => {
		return `${
			sec / 60 < 10 ? "0" + Math.floor(sec / 60) : Math.floor(sec / 60)
		}:${sec % 60 < 10 ? "0" + Math.floor(sec % 60) : Math.floor(sec % 60)}`;
	};

	// media session in navigation
	if ("mediaSession" in navigator && currentTrack) {
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
				likedPlaylist,
				setLikedPlaylist,
				trackHistory,
				setTrackHistory,
				show_sidebar_menu,
				setShow_sidebar_menu,
				sideBarButtonRef,
				setBgImage,
				playingQuality,
				setPlayingQuality,
				downloadQuality,
				setDownloadQuality,
			}}
		>
			<NavBar />
			<SidebarMenu />
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
