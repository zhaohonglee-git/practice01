import './App.css'
import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User.jsx'
import Search from './components/users/Search.jsx'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from "axios";

import AlertState from './context/alert/alertState'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])

  // 页面初始加载的时候显示该页面，当进行搜索的时候用搜索结果替换
  // async componentDidMount() {
  //   // console.log('123')
  //   // 请求数据
  //   // 测试是否可以获取环境变量
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

  //   this.setState({
  //     loading: true
  //   })
  //   // 启用git OAuth Apps 将ID和SECRET按照一下格式请求
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   // console.log(res.data)
  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   })
  // }

  // 子->父的实现方式，这个是父组件为了传值而设立的方法
  const searchUsers = async text => {
    // console.log(text, '********')
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    // console.log(res.data, '**********')
    setUsers(res.data.items)
    setLoading(false)
  }

  const getUser = async login => {
    // console.log(login, '********')
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data, '***getUser**')
    setUser(res.data)
    setLoading(false)
  }

  // 获取用户的仓库信息
  const getUserRepos = async login => {
    // console.log(login, '********')
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const test = 'Github FinderV1.0.0'

  return (
    <AlertState>
      <Router>
        <div className='App'>
          <Navbar title={test}></Navbar>
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search showClear={users.length > 0 ? true : false} clearUsers={clearUsers} searchUsers={searchUsers} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </AlertState>
  )
}

export default App