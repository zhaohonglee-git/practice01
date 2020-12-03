import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    // 这样无需绑定this,比较简洁。
    e.preventDefault()
    // 打印测试
    // console.log(this.state.text)
    // 此处的代码，用到了从子组件向父组件传值的实现方式，子->父（子组件调用父组件中的一个提前定义好的方法来实现）
    this.props.searchUsers(this.state.text)
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
