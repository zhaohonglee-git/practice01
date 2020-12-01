import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Navbar extends Component {

  // 设置默认属性值
  static defaultProps = {
    title: 'Github Finder',
    icon: 'fa fa-github'
  }

  // 定义属性类型
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1><i className={this.props.icon}></i> {this.props.title}</h1>
      </nav>
    )
  }
}

export default Navbar
