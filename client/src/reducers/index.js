import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import pedidoReducer from './pedidoReducer'


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    pedido: pedidoReducer
})