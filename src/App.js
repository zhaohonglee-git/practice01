import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import User from './components/users/User.jsx'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

import GithubState from './context/github/githubState'
import AlertState from './context/alert/alertState'

const App = () => {

  // 页面初始加载的时候显示该页面，当进行搜索的时候用搜索结果替换
  // async componentDidMount() {
  //   // console.log('123')
  //   // 请求数据
  //   // 测试是否可以获取环境变量
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

  //   this.setState({
  //     loading: true
  //   })
  //   // 启用git OAuth Apps 将ID和SECRET按照一下格式请求
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   // console.log(res.data)
  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   })
  // }

  // 子->父的实现方式，这个是父组件为了传值而设立的方法

  const test = 'Github FinderV1.0.0'

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title={test}></Navbar>
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App