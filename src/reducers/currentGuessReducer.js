export const currentGuessReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CURRENT_GUESS':
          return action.guess;
      default:
      return state;
  }
}