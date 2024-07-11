import React, { useContext, useRef, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSettings, IoSave, IoArrowBack } from "react-icons/io5";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

function SidebarMenu() {
	const { show_sidebar_menu, setShow_sidebar_menu, sideBarButtonRef } =
		useContext(SearchContext);
	const navigate = useNavigate();

	const MenuButton = ({ text, icon, clickEvent }) => {
		return (
			<div
				onClick={clickEvent}
				className=" flex justify-between items-center gap-4 w-full text-3xl font-bold cursor-pointer mt-6 hover:bg-zinc-700 p-2 rounded-lg"
			>
				{icon}
				<p>{text}</p>
			</div>
		);
	};

	// Below useEffect hook close the sideBar on click outside the sidebar
	const sideBarRef = useRef();
	useEffect(() => {
		const handler = (event) => {
			if (
				show_sidebar_menu &&
				sideBarRef.current &&
				!sideBarRef.current.contains(event.target) &&
				sideBarButtonRef.current &&
				!sideBarButtonRef.current.contains(event.target)
			) {
				setShow_sidebar_menu(false);
			}
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [show_sidebar_menu]);

	return (
		<div
			ref={sideBarRef}
			className={`flex flex-col items-center px-4 absolute top-20 bottom-24 rounded-xl bg-black bg-opacity-40 backdrop-blur-lg w-[90vw] max-w-72 transition-all duration-500 z-50 ${
				show_sidebar_menu ? "left-4" : "-left-96"
			}`}
		>
			<MenuButton
				text={"Back"}
				icon={<IoArrowBack />}
                clickEvent={() => {
                    setShow_sidebar_menu(false);
					navigate(-1);
				}}
			/>
			<div className="w-full h-[1px] mt-2 bg-white"></div>
			<MenuButton
				text={"Home"}
				icon={<GoHomeFill />}
                clickEvent={() => {
                    setShow_sidebar_menu(false);
					navigate("/");
				}}
			/>
			<MenuButton
				text={"Saves"}
				icon={<IoSave />}
                clickEvent={() => {
                    setShow_sidebar_menu(false);
					navigate("/playlist/saved-music");
				}}
			/>
			<MenuButton
				text={"Settings"}
				icon={<IoSettings />}
                clickEvent={() => {
                    setShow_sidebar_menu(false);
					navigate("/setting");
				}}
			/>
		</div>
	);
}

export default SidebarMenu;
