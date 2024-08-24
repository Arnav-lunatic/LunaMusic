import React, { useContext } from "react";
import { bg, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13 } from ".."
import { SearchContext } from "../../context/SearchContext";
import QualitySelector from "../QualitySelector";

function Setting() {
	const {
		setSavedPlaylist,
		playingQuality,
		setPlayingQuality,
		downloadQuality,
		setDownloadQuality,
		setBgImage,
	} = useContext(SearchContext);

	const NavigationButton = ({ text }) => {
		return (
			<div className="text-3xl font-bold px-4 py-2 cursor-pointer mb-10">
				<h1>{text}</h1>
			</div>
		);
	};

	const OptionHeading = ({ text }) => <h1 className="text-left text-lg md:text-xl font-semibold pl-2 md:pl-10 mb-4">{ text }</h1>
	const LargeHeading = ({ text }) => <h1 className="text-left text-2xl md:text-4xl font-bold mb-4 md:pl-4">{ text }</h1>

	const ClearPlaylist = ({ text, handleClick }) => {
		return (
			<div className="flex flex-col items-center p-4">
				<button
					onClick={handleClick}
					className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
				>
					{text}
				</button>
			</div>
		);
	};

	const handleClearPlaylist = () => {
		setSavedPlaylist([]);
	};
	const handleClearData = () => {
		localStorage.clear();
	}

	const bgList = [
		{ name: "Dark", bg: bg },
		{ name: "Neon", bg: bg2 },
		{ name: "Tech", bg: bg3 },
		{ name: "City", bg: bg4 },
		{ name: "Naruto", bg: bg5 },
		{ name: "Anime", bg: bg6 },
		{ name: "Blade Runner", bg: bg7 },
		{ name: "Classic", bg: bg8 },
		{ name: "Star Wars 1", bg: bg9 },
		{ name: "Galaxy", bg: bg10 },
		{ name: "Star Wars 2", bg: bg11 },
		{ name: "Doreamon", bg: bg12 },
		{ name: "Foggy		", bg: bg13 },
	];

	return (
		<div className="relative mt-10 mb-12 md:px-8 py-4 max-w-7xl m-auto text-center overflow-hidden h-[90dvh]">
			<h1 className="text-3xl lg:text-4xl font-bold m-2 md:m-4">Settings</h1>
			<div className="flex gap-1">
				{/* <div className="w-2/12 h-[75dvh] bg-black bg-opacity-50 backdrop-blur-lg rounded-l-xl py-6">
					<NavigationButton text={"Appearance"} />
					<NavigationButton text={"User Data"} />
					<NavigationButton text={"Preference"} />
					<NavigationButton text={"Shortcut"} />
				</div> */}
				{/* remove m-auto, change rounded-xl to rounded-r-xl */}
				<div className="w-[97vw] md:w-10/12 bg-black h-[74dvh] md:h-[75dvh] bg-opacity-50 backdrop-blur-lg rounded-xl p-4 md:p-6 overflow-y-scroll overflow-x-hidden m-auto">
					<div id="appearance" className="mb-12 overflow-x-hidden">
						<LargeHeading text={'Appearance'} />
						<OptionHeading text={"Select the Wallpaper -"} />

						<div className="flex gap-2 w-full overflow-x-auto ">
							{bgList.map((eachBg, index) => {
								return (
									<div
										key={index}
										className="relative w-60 h-36 cursor-pointer"
										style={{flex: '0 0 auto'}}
										onClick={() => {
											setBgImage(eachBg.bg);
										}}
									>
										<img
											className="w-full h-full bg-contain rounded-lg border"
											src={eachBg.bg}
										/>
										<h1 className="absolute bottom-[1px] left-[1px] right-[1px] rounded-b-lg text-lg font-semibold bg-black bg-opacity-40 backdrop-blur-lg">
											{eachBg.name}
										</h1>
									</div>
								);
							})}
						</div>
					</div>

					<div id="userdata" className="mb-10">
						<LargeHeading text={'User Data'} />
						<OptionHeading text={"Clear Data -"} />

						<div className="flex flex-col md:flex-row justify-evenly">
							<ClearPlaylist text={'Clear User Data'} handleClick={handleClearData} />
							<ClearPlaylist text={'Clear Saved Playlist'} handleClick={handleClearPlaylist} />
						</div>
						
					</div>

					<div id="preference">
						<LargeHeading text={'Preference'} />
						<OptionHeading text={"Data Usage -"} />
						<div className="flex flex-col md:flex-row justify-around">
							<QualitySelector
								title={"Playing Quality"}
								quality={playingQuality}
								setQuality={setPlayingQuality}
							/>
							<QualitySelector
								title={"Download Quality"}
								quality={downloadQuality}
								setQuality={setDownloadQuality}
							/>
						</div>
					</div>

					<div id="shortcut"></div>
				</div>
			</div>
		</div>
	);
}

export default Setting;
