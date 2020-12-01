import React, { Component } from 'react'

export class UserItem extends Component {

  constructor(){
    super()
    // console.log('123')
    this.state={
      login:'zhaohonglee',
      id:1,
    }
  }

  render() {
    return (
      <div>
        userItem
      </div>
    )
  }
}

export default UserItem
