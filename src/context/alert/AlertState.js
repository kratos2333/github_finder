import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  // global state for anything with github api
  const initialState = {
    alerts: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    // Set to null after 3 secs and then the Alert component will stop rendering
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  // The provider we are going to wrap up the entire application
  // And pass any we want to make them available to the entire app in the value
  // {props.children} is the whole application in app.js with in <Router>
  // Note that the value is the attribute
  // ******** we need to put stuff in the value if we want component can access ****
  return (
    <AlertContext.Provider
      value={{
        alert: state.alerts,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
