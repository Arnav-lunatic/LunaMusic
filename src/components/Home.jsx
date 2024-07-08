import React from "react";
import { Link } from "react-router-dom";
import savedPlaylistIcon from "/src/assets/saved.png"

function Home() {

	return (
		<div className="py-20 max-w-6xl m-auto">
			<Link to='/playlist/saved-music'>
				<div
					className="grid justify-items-center hover:bg-black w-fit hover:bg-opacity-30 px-4 py-2 rounded-lg bg-red">
					<img src={savedPlaylistIcon} />
					<p className="font-semibold">Saved Playlist</p>
				</div>
			</Link>

			{/* Remove it later */}
			<div className="absolute top-1/2 left-1/2 max-w-md opacity-35 -translate-x-1/2 -translate-y-1/2 grid gap-4	 text-center align-middle content-center -z-10">
				<h1 className="text-center text-3xl font-bold">
					More Features Coming soon
				</h1>
				<h1 className="text-xl font-semibold">
					Play or Download your favorite music{" "}
				</h1>
				<h1>
					This is a beta version and may contain bugs. I am actively
					working on improvements and will address any issues in
					future updates.
				</h1>
			</div>
		</div>
	);
}

export default Home;
