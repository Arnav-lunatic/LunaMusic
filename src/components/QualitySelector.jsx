import React from "react";

const QualitySelector = ({title, quality, setQuality}) => {

	const handleSelectChange = (event) => {
		setQuality(Number(event.target.value))
	};
	return (
		<div className="flex flex-col md:flex-row md:gap-2 items-center p-4">
			<label
				className="mb-2 md:mb-0 text-md md:text-lg font-medium"
				htmlFor="download-quality"
			>
				{title}
			</label>
			<select
				// id="download-quality"
				className="px-2 py-1 bg-zinc-800 rounded-md shadow-sm focus:outline-none"
				value={quality}
				onChange={handleSelectChange}
			>
				<option value="" disabled>
					Select quality
				</option>
				<option value="0">Low (12kbps)</option>
				<option value="1">Low (48kbps)</option>
				<option value="2">Medium (96kbps)</option>
				<option value="3">High (160kbps)</option>
				<option value="4">Very High (320kbps)</option>
			</select>
		</div>
	);
};

export default QualitySelector;
