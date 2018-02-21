import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import authReducer from './auth-reducer'

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
})
