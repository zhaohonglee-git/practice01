import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search.jsx'
import axios from "axios";

export default class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    // console.log('123')
    // 请求数据
    // 测试是否可以获取环境变量
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

    this.setState({
      loading: true
    })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({
      users: res.data,
      loading: false
    })
  }


  render() {
    const test = 'Github FinderV1.0.0'
    return (
      <div className='App'>
        <Navbar title={test}></Navbar>
        <div className='container'>
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}
