// 组件调用另外一个组件并实现父子组件属性传值。提交git
import React, { useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

const Users = () => {
  const githubContext = useContext(GithubContext)
  const { loading, users } = githubContext

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}



// 可以在jax中自定义样式，但是需要改为
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
}

export default Users
