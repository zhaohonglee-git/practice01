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

  render() {
    const test = 'Github FinderV1.0.0'
    return (
      <div className='App'>
        <Navbar title={test}></Navbar>
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}
