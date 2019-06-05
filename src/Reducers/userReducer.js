const user = (state = {}, action) => {
  switch( action.type ) {
      case "SET_USER_INFO":
          return Object.assign({}, state, {id: action.id, jwtToken: action.jwtToken} )
      default:
          return state;
  }
}

export default user