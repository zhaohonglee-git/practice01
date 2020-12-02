import React, { Component } from 'react'

export default class Search extends Component {
  state = {
    text: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    // 这样无需绑定this,比较简洁。
    e.preventDefault()
    console.log(this.state.text)
  }


  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input type="text" name='text' placeholder='Search user...' value={this.state.text} onChange={this.onChange} />
          <input type="submit" value='Search' className='btn btn-dark btn-block' />
        </form>
      </div>
    )
  }
}
