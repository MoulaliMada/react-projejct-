import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {password, username} = this.state
    console.log(username)
    console.log(password)
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {password, username, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710836866/mobile_view_login_image_buuqk1.png"
          alt="website login"
          className="login-website-login-mobile-view"
        />
        <img
          src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710756835/desktop_view_login_image_v4hbx2.png"
          alt="website login"
          className="login-website-login-desktop-view"
        />
        <div className="form-bg-container">
          <form className="login-form" onSubmit={this.onSubmitLogin}>
            <img
              src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710757880/login_website_logo_uep9wd.png"
              alt="login website logo"
              className="login-website-logo"
            />
            <label htmlFor="userName" className="login-label">
              Username*
            </label>
            <input
              id="userName"
              placeholder="Enter Your Name"
              className="login-userName-input"
              type="text"
              value={username}
              onChange={this.onChangeUserName}
            />
            <label htmlFor="userpassword" className="login-label">
              Password*
            </label>
            <input
              id="userpassword"
              placeholder="Enter Your Password"
              className="login-Password-input"
              type="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            {showSubmitError && <p className="login-errorMsg">{errorMsg}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
