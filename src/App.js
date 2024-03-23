import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import BookHubContext from './context/BookHubContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'

import './App.css'

class App extends Component {
  state = {displayMobileviewNavItems: false, activeRoute: 'Home'}

  changedisplayMobileviewNavItems = () => {
    this.setState(prevState => ({
      displayMobileviewNavItems: !prevState.displayMobileviewNavItems,
    }))
  }

  changeactiveRoute = route => {
    this.setState({activeRoute: route})
  }

  render() {
    const {displayMobileviewNavItems, activeRoute} = this.state
    return (
      <BookHubContext.Provider
        value={{
          displayMobileviewNavItems,
          changedisplayMobileviewNavItems: this.changedisplayMobileviewNavItems,
          activeRoute,
          changeactiveRoute: this.changeactiveRoute,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute path="/books/:id" component={BookDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BookHubContext.Provider>
    )
  }
}

export default App
