export const codeReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CODE':
          return action.code;
      default:
      return state;
  }
}