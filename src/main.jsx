import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchResult, Home, SavedMusicPage, Setting, ArtistPage } from "./components";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<Home />} />
			<Route path="/search/songs" element={<SearchResult whichPage={'songs'} />} />
			<Route path="/search/albums" element={<SearchResult whichPage={'albums'} />} />
			<Route path="/search/artists" element={<SearchResult whichPage={'artists'} />} />
			<Route path="/search/playlists" element={<SearchResult whichPage={'playlists'} />} />
			<Route path="/artist" element={<ArtistPage/>} />
			<Route path="/playlist/saved-music" element={<SavedMusicPage />} />
			<Route path="/setting" element={<Setting />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
