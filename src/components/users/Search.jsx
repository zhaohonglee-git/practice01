import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AlertContext from '../../context/alert/alertContext'

const Search = ({ showClear, clearUsers, searchUsers }) => {
  const alertContext = useContext(AlertContext)
  const [text, setText] = useState('')
  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    // 这样无需绑定this,比较简洁。
    e.preventDefault()
    // 打印测试
    // console.log(this.state.text)
    // 此处的代码，用到了从子组件向父组件传值的实现方式，子->父（子组件调用父组件中的一个提前定义好的方法来实现）

    if (text === '') {
      alertContext.showAlert('Please enter something', 'light')
    } else {
      searchUsers(text);
      setText('');
    }
  }

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input type="text" name='text' placeholder='Search user...' value={text} onChange={onChange} />
        <input type="submit" value='Search' className='btn btn-dark btn-block' />
      </form>
      {showClear && <button className='btn btn-dark btn-block' onClick={clearUsers} >Clear</button>}
    </div>
  )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
}

export default Search