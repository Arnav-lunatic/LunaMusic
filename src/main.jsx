import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchResult, Home, SavedMusicPage, Setting } from "./components";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { Navigate } from 'react-router-dom'


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<Home />} />
			<Route path="/search" element={<SearchResult />} />
			<Route path="/playlist/saved-music" element={<SavedMusicPage />} />
			<Route path="/setting" element={<Setting />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
