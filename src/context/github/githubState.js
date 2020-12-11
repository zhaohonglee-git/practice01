import React, {
  useReducer
} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS
} from '../types'

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
  // 使用本地环境变量
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  // 生产环境变量
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // search users
  const searchUsers = async text => {
    // console.log(text, '********')
    setLoading()
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    // console.log(res.data, '**********')

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  // get user
  const getUser = async login => {
    // console.log(login, '********')
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    console.log(res.data, '***getUser**')
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // get repos
  // 获取用户的仓库信息
  const getUserRepos = async login => {
    // console.log(login, '********')
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // clear users
  const clearUsers = () => dispatch({
    type: CLEAR_USERS
  })


  // set loading
  const setLoading = () => dispatch({
    type: SET_LOADING
  })

  return (
    <GithubContext.Provider value={
      {
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }
    } >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState