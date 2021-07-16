import React from "react";
import PropTypes from "prop-types";


/**
 * A component which allows the user to see and edit the focus/break max times.
 * @param {Object} props - The properties passed on to this component.
 * @param {function} props.changeMax - A function that changes the max time.
 * @param {function} props.getTime - A function that gives a time in mm:ss.
 * @returns {JSX} - A <div> element containing timer info and buttons.
 */

function BreakButton( {changeMax, getTime} ) {
	/**
	 * Handles changing the max of break.
	 * @param {Event} - Button event.
	 */

	function handleBreakIncreaseChange(event){
	switch(event.target.dataset.testid) {
		case "increase-break": changeMax("break", 60*1); break;
		default: console.log("Something went wrong! @handleBreakIncreaseChange"); break;
	}
}
 
	function handleBreakDecreaseChange(event){
        switch(event.target.dataset.testid) {
            case "decrease-break": changeMax("break", 60*-1); break;
            default: console.log("Something went wrong! @handleBreakDecreaseChange"); break;
        }
    }


	return (
			<div className="col">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid={`duration-break`}>
						{`Break Duration: ${getTime(`breakMax`)}`}
					</span>

					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`decrease-break`}
							onClick={handleBreakDecreaseChange}
						>
							<span className="oi oi-minus" />
						</button>
	
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`increase-break`}
							onClick={handleBreakIncreaseChange}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
	);
}

BreakButton.propTypes = {
	changeMax: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired
};

export default BreakButton;