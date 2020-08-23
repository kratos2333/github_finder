import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  // global state for anything with github api
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Create some action methods taken from app.js
  // Search Users
  // Do search the user here
  const searchUsers = async (userName) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${userName}&client_id=$
          {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
          {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // setUsers(res.data.items);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  // Search Single github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=$
          {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
          {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  // Set Loading to dispatch the object the reducer for SET_LOADING there is no payload
  const setLoading = () => dispatch({ type: SET_LOADING });

  // The provider we are going to wrap up the entire application
  // And pass any we want to make them available to the entire app in the value
  // {props.children} is the whole application in app.js with in <Router>
  // Note that the value is the attribute
  // ******** we need to put stuff in the value if we want component can access ****
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
