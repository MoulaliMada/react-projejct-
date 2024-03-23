import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {IoIosCloseCircle} from 'react-icons/io'
import BookHubContext from '../../context/BookHubContext'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <BookHubContext.Consumer>
        {value => {
          const {
            changedisplayMobileviewNavItems,
            changeactiveRoute,
            displayMobileviewNavItems,
            activeRoute,
          } = value
          const onClickNavListIcon = () => {
            changedisplayMobileviewNavItems()
          }
          const onClickHome = () => {
            changeactiveRoute('Home')
          }
          const onClickBookshelves = () => {
            changeactiveRoute('Bookshelves')
          }

          return (
            <div
              className={
                displayMobileviewNavItems ? 'header-container-true' : ''
              }
            >
              <div className="header-bg-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710757880/login_website_logo_uep9wd.png"
                    alt="website logo"
                    className="header-website-logo"
                    onClick={onClickHome}
                  />
                </Link>

                <img
                  src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710812959/list_icon_v7euoa.png"
                  alt="list"
                  className="header-list-img"
                  onClick={onClickNavListIcon}
                />

                <div className="deskTop-navItems">
                  <ul className="navitems-Ul">
                    <Link
                      to="/"
                      className={
                        activeRoute === 'Home'
                          ? 'navItem active-nav-Item'
                          : 'navItem'
                      }
                    >
                      <li onClick={onClickHome}>Home</li>
                    </Link>
                    <Link
                      to="/shelf"
                      className={
                        activeRoute === 'Bookshelves'
                          ? 'navItem active-nav-Item'
                          : 'navItem'
                      }
                    >
                      <li
                        className={
                          activeRoute === 'Bookshelves'
                            ? 'navItem active-nav-Item'
                            : 'navItem'
                        }
                        onClick={onClickBookshelves}
                      >
                        Bookshelves
                      </li>
                    </Link>
                  </ul>
                  <button
                    type="button"
                    className="logout-btn-mobile"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              {displayMobileviewNavItems && (
                <div className="navItem-container">
                  <ul className="navitems-Ul">
                    <Link to="/" className="navItem">
                      <li onClick={onClickNavListIcon}>Home</li>
                    </Link>
                    <Link to="/shelf" className="navItem">
                      <li className="navItem" onClick={onClickNavListIcon}>
                        Bookshelves
                      </li>
                    </Link>
                  </ul>
                  <div className="logout-btn-mobile-container">
                    <button
                      type="button"
                      className="logout-btn-mobile"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                    <IoIosCloseCircle
                      className="close-icon"
                      onClick={onClickNavListIcon}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default withRouter(Header)
