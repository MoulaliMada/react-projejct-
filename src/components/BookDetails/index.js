import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import BookHubContext from '../../context/BookHubContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = {
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        id: fetchedData.book_details.id,
        rating: fetchedData.book_details.rating,
        readStatus: fetchedData.book_details.read_status,
        title: fetchedData.book_details.title,
      }

      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookDetailsList = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails
    return (
      <div className="bookdetails-container">
        <div className="bookdetails-white-container">
          <div className="bookdetails-img-container">
            <img src={coverPic} className="bookDetails-coverPic" alt={title} />
            <div className="BookItem-description-container">
              <h1 className="BookItem-title">{title}</h1>
              <p className="BookItem-authorName">{authorName}</p>
              <div className="BookItem-rating-container">
                <p className="BookItem-authorName">Avg Rating</p>
                <BsFillStarFill className="start-icon" />
                <p className="BookItem-authorName">{rating}</p>
              </div>
              <p className="BookItem-authorName">
                Status:<span className="BookItem-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="about-author-heading">About Author</h1>
            <p className="author-description">{aboutAuthor}</p>
            <h1 className="about-author-heading">About Book</h1>
            <p className="author-description">{aboutBook}</p>
          </div>
        </div>
        <div className="contact-container">
          <div className="contact-icons">
            <FaGoogle className="contact-icon" />
            <FaTwitter className="contact-icon" />
            <FaInstagram className="contact-icon" />
            <FaYoutube className="contact-icon" />
          </div>
          <p className="contact-paragraph">Contact Us</p>
        </div>
      </div>
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
        onClick={this.getBookDetails}
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

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsList()
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
          const {displayMobileviewNavItems} = value

          return (
            <div className="BookDetails-bg-container">
              <Header />
              {displayMobileviewNavItems === false && (
                <div>{this.renderBookDetails()}</div>
              )}
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default BookDetails
