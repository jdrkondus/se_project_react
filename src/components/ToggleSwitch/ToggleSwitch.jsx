import "./ToggleSwitch.css";

import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const contextValue = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle-switch" htmlFor="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch_checkbox"
        onChange={contextValue.handleTempUnitChange}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__value toggle-switch__value_left">F</span>
      <span className="toggle-switch__value toggle-switch__value_right">C</span>
    </label>
  );
}

export default ToggleSwitch;
