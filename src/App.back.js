import './App.css'

import React, { Component } from 'react'

export default class App extends Component {
  outerFunc = () => '外部函数'

  render() {
    const name = 'zhaohonglee'
    const innerFunc = () => {
      return '296222105'
    }


    const loading = false

    // if (loading) {
    //   return <h4>Loading...</h4>
    // }

    const showName = true


    return (
      < div className='App' >
        <h1>Hello {name}</h1>
        <h2>{name.toUpperCase()}</h2>
        <h3>{innerFunc()}</h3>
        <h3>{this.outerFunc()}</h3>
        {loading ? <h4>Loading....</h4> : <h1>Hello {name}</h1>}
        <span>JSX中只能有一个根标签</span>
        <h1>******</h1>
        <h1>{showName && name}</h1>


      </div>
      // React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello App'))
      // <React.Fragment className='App'>
      //   <h1>Hello React</h1>
      //   <p>React.Fragment</p>
      // </React.Fragment>
    )
  }
}
