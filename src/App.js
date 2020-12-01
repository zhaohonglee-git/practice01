import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem'

export default class App extends Component {


  render() {
    const test = 'Github FinderV1.0.0'
    return (
      <div className='App'>
        <h1>
          <Navbar title={test}></Navbar>
        </h1>
        <UserItem /> 
      </div>
    )
  }
}
