import React, { useEffect, useState } from "react";
import { FaDownload, FaStop, FaCheck } from "react-icons/fa6";
import useDownloader from "react-use-downloader";

function DownloadButtons({
	tooltipPosition = "bottom",
	fileToDownload,
	fileTitle,
}) {
	const { percentage, download, cancel, isInProgress } = useDownloader();

	const [downloaded, setDownloaded] = useState(false);

	const handleDownloading = () => {
		setDownloaded(false);
		isInProgress ? cancel() : download(fileToDownload, fileTitle + ".mp3");
	};

	useEffect(() => {
		if (percentage == "100") {
			setDownloaded(true);
		}
	}, [percentage]);

	return (
		<button
			// tooltip
			data-tooltip-id="my-tooltip"
			data-tooltip-content="Download"
			data-tooltip-place={tooltipPosition}
			data-tooltip-delay-show="700"
			className="relative ml-4 w-10 h-10 text-white z-10"
			onClick={handleDownloading}
		>
			{downloaded ? (
				<FaCheck className="w-8 h-8 m-auto bg-purple-700 p-1 rounded-full" />
			) : isInProgress ? (
				<FaStop className="w-8 h-8 m-auto bg-purple-700 p-1 rounded-full" />
			) : (
				<FaDownload className="w-8 h-8 m-auto bg-purple-700 p-1 rounded-full" />
			)}

			<div
				className="absolute w-full h-full bg-white top-0 left-0 -z-10 rounded-full"
				style={{
					backgroundImage: `conic-gradient(#9233ea ${
						3.6 * percentage
					}deg, white 0deg)`,
				}}
			></div>
		</button>
	);
}

export default DownloadButtons;
