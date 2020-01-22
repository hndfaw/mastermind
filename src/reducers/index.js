import { combineReducers } from 'redux';
import { codeReducer } from './codeReducer';
import { currentGuessReducer } from './currentGuessReducer';

export const rootReducer = combineReducers({
  codeReducer,
  currentGuessReducer
})