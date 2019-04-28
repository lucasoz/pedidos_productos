import axios from 'axios'
import { GET_PEDIDOS, ADD_PEDIDO , DELETE_PEDIDO, PEDIDOS_LOADING } from '../actions/types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getPedidos = () => (dispatch,getState) => {  
    dispatch(setPedidosLoading())
    axios.get('/api/pedidos')
    .then(res => 
    dispatch({
        type: GET_PEDIDOS,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addPedido = (pedido, callback) => (dispatch, getState)=> {
    axios.post('/api/pedidos', pedido, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_PEDIDO,
            payload: res.data
        })
        callback()
    })
    .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_PEDIDO_FAIL'))})
}


export const deletePedido = id => (dispatch, getState) => {
    axios.delete(`/api/pedidos/${id}`, tokenConfig(getState))
    .then(res =>
    dispatch({
        type: DELETE_PEDIDO,
        payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setPedidosLoading = () => {
    return {
        type: PEDIDOS_LOADING
    }
}