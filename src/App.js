import './App.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search.jsx'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from "axios";

export default class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null
  }

  // 页面初始加载的时候显示该页面，当进行搜索的时候用搜索结果替换
  async componentDidMount() {
    // console.log('123')
    // 请求数据
    // 测试是否可以获取环境变量
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

    this.setState({
      loading: true
    })
    // 启用git OAuth Apps 将ID和SECRET按照一下格式请求
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    // console.log(res.data)
    this.setState({
      users: res.data,
      loading: false
    })
  }

  // 子->父的实现方式，这个是父组件为了传值而设立的方法
  searchUsers = async text => {
    console.log(text, '********')

    this.setState({
      loading: true
    })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    // console.log(res.data, '**********')
    this.setState({
      users: res.data.items,
      loading: false
    })
  }

  clearUsers = () => this.setState({
    users: [],
    loading: false
  }
  )

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg: msg, type: type }
    })
    setTimeout(() => {
      this.setState({
        alert: null
      })
    }, 2000)
  }

  render() {
    const test = 'Github FinderV1.0.0'
    const { users, loading, alert } = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar title={test}></Navbar>
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={this.setAlert} showClear={users.length > 0 ? true : false} clearUsers={this.clearUsers} searchUsers={this.searchUsers} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
