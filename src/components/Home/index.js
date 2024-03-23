import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import BookHubContext from '../../context/BookHubContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topReadBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopReadBooks()
  }

  getTopReadBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({
        topReadBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTopReadBooksList = () => {
    const {topReadBooksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    }
    const settings2 = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <BookHubContext.Consumer>
        {value => {
          const {changeactiveRoute} = value

          const onClickBookItem = () => {
            changeactiveRoute('nothing')
          }

          return (
            <div>
              <div className="react-slick-continer">
                <div>
                  <Slider {...settings2} className="react-slick-continer">
                    {topReadBooksList.map(each => (
                      <Link
                        to={`/books/${each.id}`}
                        className="item-link "
                        key={each.id}
                      >
                        <li
                          className="home-slick-item"
                          onClick={onClickBookItem}
                          key={each.id}
                        >
                          <div className="slick-image-container">
                            <img
                              src={each.coverPic}
                              alt={each.title}
                              className="home-slick-image"
                            />
                          </div>
                          <p className="home-authorName">{each.title}</p>
                          <h1 className="home-slick-title">
                            {each.authorName}
                          </h1>
                        </li>
                      </Link>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="react-slick-continer-two">
                <div>
                  <Slider {...settings2}>
                    {topReadBooksList.map(each => (
                      <Link
                        to={`/books/${each.id}`}
                        className="item-link "
                        key={each.id}
                      >
                        <li
                          key={each.id}
                          className="home-slick-item"
                          onClick={onClickBookItem}
                          key={each.id}
                        >
                          <div className="slick-image-container">
                            <img
                              src={each.coverPic}
                              alt={each.title}
                              className="home-slick-image"
                            />
                          </div>
                          <p className="home-authorName">{each.authorName}</p>
                          <h1 className="home-slick-title">{each.title}</h1>
                        </li>
                      </Link>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710900399/failure_image_yqkiyb.png"
        className="home-failure-img"
        alt="failure view"
      />
      <p className="home-failure-paragraph">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-tryagain-btn"
        type="button"
        onClick={this.getTopReadBooks}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopReadBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopReadBooksList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <BookHubContext.Consumer>
        {value => {
          const {displayMobileviewNavItems, changeactiveRoute} = value
          console.log(displayMobileviewNavItems)
          const onClickFindBooksBtn = () => {
            changeactiveRoute('Bookshelves')
          }
          return (
            <div className="home-bg-container">
              <Header />
              {displayMobileviewNavItems === false && (
                <div>
                  <div className="home-container">
                    <h1 className="home-heading">
                      Find Your Next Favorite Books?
                    </h1>
                    <p className="home-paragraph">
                      You are in the right place. Tell us what titles or genres
                      you have enjoyed in the past, and we will give you
                      surprisingly insightful recommendations.
                    </p>
                    <Link to="/shelf" className="home-link">
                      <button
                        className="home-find-books-btn"
                        type="button"
                        onClick={onClickFindBooksBtn}
                      >
                        Find Books
                      </button>
                    </Link>
                  </div>
                  <div className="home-top-tated-books-container">
                    <div className="home-slick-findbooks-btn-Conrainer">
                      <h1 className="top-tated-books">Top Rated Books</h1>
                      <Link to="/shelf" className="home-link">
                        <button
                          className="home-find-books-btn2"
                          type="button"
                          onClick={onClickFindBooksBtn}
                        >
                          Find Books
                        </button>
                      </Link>
                    </div>
                    {this.renderTopReadBooks()}
                  </div>
                </div>
              )}
              {displayMobileviewNavItems === false && (
                <div className="contact-container">
                  <div className="contact-icons">
                    <FaGoogle className="contact-icon" />
                    <FaTwitter className="contact-icon" />
                    <FaInstagram className="contact-icon" />
                    <FaYoutube className="contact-icon" />
                  </div>
                  <p className="contact-paragraph">Contact Us</p>
                </div>
              )}
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default Home
