import { GET_PEDIDOS, ADD_PEDIDO , DELETE_PEDIDO, PEDIDOS_LOADING } from '../actions/types'

const initialState = {
    pedidos: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PEDIDOS:
            return {
                ...state,
                pedidos: action.payload,
                loading: false
            }
        case DELETE_PEDIDO:
            return {
                ...state,
                pedidos: state.pedidos.filter(pedido => pedido._id !== action.payload)
            }
        case ADD_PEDIDO:
            return {
                ...state,
                pedidos: [action.payload, ...state.pedidos]
            }
        case PEDIDOS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}