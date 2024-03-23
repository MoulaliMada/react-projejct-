import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import BookHubContext from '../../context/BookHubContext'

import './index.css'

const BookItem = props => {
  const {each} = props
  const {authorName, coverPic, id, rating, readStatus, title} = each
  return (
    <BookHubContext.Consumer>
      {value => {
        const {changeactiveRoute} = value
        const onClickBookItem = () => {
          changeactiveRoute('nothing')
        }
        return (
          <Link to={`/books/${id}`} className="item-link ">
            <li className="bookItem-container" onClick={onClickBookItem}>
              <img src={coverPic} alt={title} className="BookItem-img" />
              <div className="BookItem-description-container">
                <h1 className="BookItem-title">{title}</h1>
                <p className="BookItem-authorName">{authorName}</p>
                <div className="BookItem-rating-container">
                  <p className="BookItem-authorName">Avg Rating</p>
                  <BsFillStarFill className="start-icon" />
                  <p className="BookItem-authorName">{rating}</p>
                </div>
                <p className="BookItem-authorName">
                  Status :<span className="BookItem-status">{readStatus}</span>
                </p>
              </div>
            </li>
          </Link>
        )
      }}
    </BookHubContext.Consumer>
  )
}
export default BookItem
