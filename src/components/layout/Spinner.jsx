import React, { Fragment } from 'react'
import loading from './loading.gif'

const Spinner = () => {
  return (
    <Fragment>
      <img src={loading} alt="loading..." style={{ display: 'block', width: '200px', margin: 'auto' }} />
    </Fragment>
  )
}

export default Spinner