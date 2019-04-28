import { combineReducers } from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import pedidoReducer from './pedidoReducer'


export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    pedido: pedidoReducer
})