import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from "axios";

export default class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    // console.log('123')
    // 请求数据
    this.setState({
      loading: true
    })
    const res = await axios.get('https://api.github.com/users')
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
        <h1>
          <Navbar title={test}></Navbar>
        </h1>
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}
