import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import BookHubContext from '../../context/BookHubContext'
import BookItem from '../BookItem'
import Header from '../Header'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    bookshelveList: [],
    apiStatus: apiStatusConstants.initial,
    bookshelfName: 'ALL',
    searchText: '',
    shelfLabel: 'All',
  }

  componentDidMount() {
    this.getBookshelve()
  }

  getBookshelve = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`

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
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))

      this.setState({
        bookshelveList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onClickShelfBtn = (value, label) => {
    this.setState({shelfLabel: label, bookshelfName: value}, this.getBookshelve)
  }

  renderBookItems = () => {
    const {bookshelveList} = this.state
    return (
      <div>
        <ul className="bookItem-ul">
          {bookshelveList.map(each => (
            <BookItem key={each.id} each={each} />
          ))}
        </ul>
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

  renderNoSearchResults = () => {
    const {searchText} = this.state
    return (
      <div className="no-serch-results">
        <img
          src="https://res.cloudinary.com/dssaftaaa/image/upload/v1710985984/no_search_result_image_gseuel.png"
          className="no-search-results-image"
          alt="no books"
        />
        <p className="no-search-results-paragraph">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookItemList = () => {
    const {bookshelveList} = this.state
    const len = bookshelveList.length
    return (
      <div>
        {' '}
        {len !== 0 ? this.renderBookItems() : this.renderNoSearchResults()}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="bookshelves-failure-container">
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
        onClick={this.getBookshelve}
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

  renderBookItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookItemList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {bookshelfName, shelfLabel} = this.state

    return (
      <BookHubContext.Consumer>
        {value => {
          const {displayMobileviewNavItems} = value

          return (
            <div className="bookshelves-bg-container">
              <Header />
              {displayMobileviewNavItems === false && (
                <div className="bookshelves-container">
                  <div className="bookshelves-side-bar">
                    <h1 className="bookshelves-heading">Bookshelves</h1>
                    <ul className="bookshelves-desktop-Ul">
                      {bookshelvesList.map(each => (
                        <button
                          className="bookshelves-shelf-btn-desktop"
                          key={each.id}
                          type="button"
                          value={each.value}
                          onClick={() =>
                            this.onClickShelfBtn(each.value, each.label)
                          }
                        >
                          <li
                            className={
                              each.value === bookshelfName
                                ? 'bookshelves-desktop-active-item'
                                : 'bookshelves-desktop-inactive-item'
                            }
                          >
                            {each.label}
                          </li>
                        </button>
                      ))}
                    </ul>
                  </div>
                  <div className="bookshelves-items-container">
                    <div className="bookshelves-search-desktop-container">
                      <h1 className="bookshelves-all-books">
                        {shelfLabel} Books
                      </h1>
                      <div className="bookshelves-search-container">
                        <input
                          type="search"
                          className="bookshelves-input"
                          placeholder="Search"
                          onChange={this.onChangeSearch}
                        />
                        <button
                          className="bookshelves-search-btn"
                          data-testid="searchButton"
                          onClick={this.getBookshelve}
                          type="button"
                          testid="searchButton"
                        >
                          <BsSearch className="bookshelves-search-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="bookshelves-mobile-view">
                      <h1 className="bookshelves-heading">Bookshelves</h1>
                      <ul className="bookshelves-movile-Ul">
                        {bookshelvesList.map(each => (
                          <button
                            className="bookshelves-shelf-btn-mobole"
                            key={each.id}
                            value={each.value}
                            type="button"
                            onClick={() =>
                              this.onClickShelfBtn(each.value, each.label)
                            }
                          >
                            <li
                              className={
                                each.value === bookshelfName
                                  ? 'bookshelves-movile-active-item'
                                  : 'bookshelves-movile-inactive-item'
                              }
                            >
                              {each.label}
                            </li>
                          </button>
                        ))}
                      </ul>
                    </div>
                    {this.renderBookItem()}
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
export default Bookshelves
