import React from 'react'

const BookHubContext = React.createContext({
  displayMobileviewNavItems: false,
  changedisplayMobileviewNavItems: () => {},
  activeRoute: 'Home',
  changeactiveRoute: () => {},
})

export default BookHubContext
