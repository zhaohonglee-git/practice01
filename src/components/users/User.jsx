import React, { Fragment, useEffect, useContext } from 'react';
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext.js'

const User = ({ match }) => {
  const githubContext = useContext(GithubContext)
  const { getUser, loading, user, repos, getUserRepos } = githubContext

  // componentDidMount() {
  //   // console.log(this.props, '**User**')
  //   this.props.getUser(this.props.match.params.login)
  //   this.props.getUserRepos(this.props.match.params.login)
  // }

  // 利用这个钩子函数来实现类似于componentDidMount生命周期函数
  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // console.log('render........')
  }, [])

  // 可以通过这个接口地址得到很多字段内容，如果有需要可以自定义结构出来需要的字段
  const { name, id, hireable, avatar_url, location, bio, html_url, company, blog } = user

  if (loading) return <Spinner></Spinner>

  return (
    <Fragment>
      <Link to='/' className='btn btn-dark'>返回</Link>
        是否在职：{''}
      {hireable ? (
        <i className='fa fa-check text-success'></i>
      ) : (
          <i className='fa fa-times-circle text-danger'></i>
        )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img src={avatar_url} className='round-img' style={{ width: '100px' }} alt="" />
          <h1>{name}</h1>
          <p>所在地：{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>个人简介</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1' >访问</a>
          <ul>
            <li>
              {company && (
                <Fragment>
                  <strong>公司：</strong>{company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>网址：</strong>{blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
}



export default User