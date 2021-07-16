import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusButton from "./FocusButton";
import StartStop from "./StartStop";
import Timer from "./Timer";
import Progress from "./Progress";
import BreakButton from "./BreakButton";

/**
 * A component representing a Pomodoro timer.
 * @returns {JSX} A <div> element containing all other components.
 */

function Pomodoro() {
  const initDuration = {
		focusMax: 60 * 25, //25min focus intial set time.
		focusLeft: 60 * 25, 
		focusFloor: 60 * 5, //5min focus minimum time allowed
		focusRoof: 60 * 60, //60min focus maximum time allowed

		breakMax: 60 * 5, //5min break inital set time
		breakLeft: 60 * 5,
		breakFloor: 60 * 1, // 1min break minimum time allowed
		breakRoof: 60 * 15, // 15min break maximum time allowed

		isTimerRunning: false,
		focus: true,
		sessionStarted: false,
	};
  const [duration, setDuration] = useState({...initDuration});

  // useInterval is called every second when the timer is on
	useInterval(
    () => {
			if(duration.focusLeft <= 0 || duration.breakLeft <= 0) {
				const alarm = new Audio(`https://onlineclock.net/audio/options/default.mp3`).play();
				console.log(alarm);
				switchModes();
			}
			else {
				if(duration.focus)
					timePassed("focusLeft");
				else
					timePassed("breakLeft");	
			}
    },
    duration.isTimerRunning ? 1000 : null
  );

	/**
	 * If a second has passed, appropriately decrease second on timer.
	 * @param {string} mode - Either "focusLeft" or "breakLeft".
	 */
	function timePassed(mode) {
		setDuration(() => {
			return {
				...duration,
				[mode]: duration[mode] - 1,
			};
		});
	}

	/**
	 * Once focus/break ends, switch modes and reset timers.
	 */
	function switchModes() {
		setDuration(() => {
			return {
				...duration, 
				focusLeft: duration.focusMax,
				breakLeft: duration.breakMax,
				focus: !duration.focus,
			};
		});
	}

	/**
	 * Adds an extra "0" to single-digit numbers.
	 * @param {number} num - The number to pad.
	 * @returns {number} - The padded number, if padded at all.
	 */
	function pad(num) {
		return num < 10 ? "0" + num : num;
	}

	/**
	 * Gives a time formatted in mm:ss.
	 * @param {string} mode Four possibilities: focusMax, focusLeft, breakMax, breakLeft 
	 */
	function getTime(mode) {
		return `${ pad(Math.floor(duration[mode] / 60)) }:${ pad(duration[mode] % 60) }`;
	}

	/**
	 * Gives a key of the timer object.
	 * @param {string} key The key of the timer object.
	 */
	function get(key) {
		return duration[key];
	}

	/**
	 * Increments/decrements max of focus/break.
	 * @param {string} mode - Either "focus" or "break".
	 * @param {number} change - Amount to change max by.
	 */
	function changeMax(mode, change) {
		const newTime = change < 0
			? Math.max(duration[mode + "Floor"], duration[mode + "Max"] + change)
			: Math.min(duration[mode + "Roof"], duration[mode + "Max"] + change);

		setDuration(() => {
			return {
				...duration,
				[mode + "Max"]: newTime,
				[mode + "Left"]: newTime,
			};
		});
	}

	/**
	 * Plays/pauses the timer.
	 */
  function playPause() {
    setDuration(() => {
			return {
				...duration, 
				isTimerRunning: !duration.isTimerRunning,
				sessionStarted: true,
			};
		});
  }

	/**
	 * Stops the timer, resetting it.
	 */
	function stop() {
		setDuration(() => {
			return {
				...duration,
				isTimerRunning: false,
				sessionStarted: false,
				focusLeft: duration.focusMax,
				breakLeft: duration.breakMax,
				focus: true,
			};
		});
	}

  return (
    <div className="pomodoro">
			<div className="row">
				<div className="col">
					<FocusButton
						changeMax={changeMax}
						getTime={getTime}
					/>
				</div>
				<div className="col">
					<div className="float-right">
						<BreakButton
							changeMax={changeMax}
							getTime={getTime}
						/>
					</div>
				</div>
			</div>

      <StartStop 
				playPause={playPause}
				get={get}
				stop={stop}
			/>

			<Timer 
				getTime={getTime}
				get={get}
			/>

			<Progress
				get={get}
			/>
    </div>
  );
}

export default Pomodoro;
