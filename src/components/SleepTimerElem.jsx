import React, { useContext, useEffect, useRef } from "react";
import { SearchContext } from "../context/SearchContext";

function SleepTimerElem({setSleepTimer, show_sleep_timer_menu, setShow_sleep_timer_menu}) {

    const {setPause, audioRef} = useContext(SearchContext)
    

	const SleepTimerButton = ({ text }) => {
		return (
			<>
                <button
                    className="py-2 px-4"
                >{typeof(text)==='number'? `${text} Minutes`:text}</button>
			</>
		);
    };

            const sleepTimerRef = useRef()
            
            useEffect(() => {
                const handler = (event) => {
                    if (show_sleep_timer_menu && sleepTimerRef.current && !sleepTimerRef.current.contains(event.target)) {
                        setShow_sleep_timer_menu(false);
                    }
                };
                document.addEventListener("mousedown", handler);
                document.addEventListener("touchstart", handler);
                return () => {
                    // Cleanup the event listener
                    document.removeEventListener("mousedown", handler);
                    document.removeEventListener("touchstart", handler);
                };
            }, [show_sleep_timer_menu]);

    const buttonContent = ['Off', 10, 20, 30, 45, /*"Custom"*/];

    /*
    const delay = 1000 * 60 * 5; // 5 minutes
    const timer = setTimeout(() => console.log("Hi"), delay);
    const timerEnd = new Date().getTime() + delay;
    // Get ms left to timeout
    const msToEnd = timerEnd - new Date().getTime();
    */ 
    
    const handleClick = (time) => {
        const totalTime = time * 60 * 1000
        setTimeout(() => {
            setPause(false)
            setSleepTimer('Not Set')
        }, totalTime);
        setSleepTimer(time + ' Minutes')
    }

    

    // Animation


    return (
        <div className="grid gap-2 absolute bottom-24 right-0 bg-zinc-900 rounded-lg p-2 min-w-36 md:text-lg">
            <div ref={sleepTimerRef}>
                {buttonContent.map((content) => {
                    return (
                        <div className="relative" key={content}>
                            <button
                                className="absolute top-0 bottom-0 left-0 right-0 "
                                onClick={() => handleClick(content)}></button>
                            <SleepTimerButton text={content} />
                        </div>
                    )
                })}
            </div>
		</div>
	);
}

export default SleepTimerElem;
