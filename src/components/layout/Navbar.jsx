import PropTypes from 'prop-types'


const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1><i className={icon}></i> {title}</h1>
    </nav>
  )

}

// 设置默认属性值
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fa fa-github'
}

// 定义属性类型
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar
