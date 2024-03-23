import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="nofound-container">
    <img
      src="https://res.cloudinary.com/dssaftaaa/image/upload/v1711000119/not_found_v5avyh.png"
      className="notfound-image"
      alt="not found"
    />
    <h1 className="nofound-heading">Page Not Found</h1>
    <p className="nofound-discription">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="nofound-link">
      <button className="nofound-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
