import React from "react";
import PropTypes from "prop-types";


/**
 * A component which allows the user to see and edit the focus/break max times.
 * @param {Object} props - The properties passed on to this component.
 * @param {function} props.changeMax - A function that changes the max time.
 * @param {function} props.getTime - A function that gives a time in mm:ss.
 * @returns {JSX} - A <div> element containing timer info and buttons.
 */

function FocusButton( {changeMax, getTime} ) {
	/**
	 * Handles changing the max of focus.
	 * @param {Event} - Button event.
	 */
	function handleFocusIncreaseChange(event) {
		switch(event.target.dataset.testid) {
			case "increase-focus": changeMax("focus", 60*5); break;
			default: console.log("Something went wrong! @handleFocusIncreaseChange"); break;
		}
	}

  function handleFocusDecreaseChange(event){
        switch(event.target.dataset.testid) {
            case "decrease-focus": changeMax("focus", 60*-5); break;
            default: console.log("Something went wrong! @handleFocusDecreaseChange"); break;
        }
    }
	


	return (
			<div className="col">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid={`duration-focus`}>
					{`Focus Duration: ${getTime(`focusMax`)}`}
					</span>

					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`decrease-focus`}
							onClick={handleFocusDecreaseChange}
						>
							<span className="oi oi-minus" />
						</button>
	
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`increase-focus`}
							onClick={handleFocusIncreaseChange}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
	);
}

FocusButton.propTypes = {
	changeMax: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired
};

export default FocusButton;