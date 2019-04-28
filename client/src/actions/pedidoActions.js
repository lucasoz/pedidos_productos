import axios from 'axios'
import { GET_PEDIDOS, ADD_PEDIDO , DELETE_PEDIDO, PEDIDOS_LOADING, UPDATE_PEDIDO } from '../actions/types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getPedidos = () => (dispatch,getState) => { 
    const tipo = getState().auth.user.tipo
    dispatch(setPedidosLoading())
    console.log(tipo)    
    tipo === "vendedor" ? 
    axios.get('/api/pedidos/vendedor', tokenConfig(getState))
    .then(res => 
    dispatch({
        type: GET_PEDIDOS,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))) :
    axios.get('/api/pedidos', tokenConfig(getState))
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

export const entregara = pedido => (dispatch, getState) => {
    console.log("entregará front");
    console.log(getState());
    const pedidoEntrega = {id: pedido._id, estado: 'en proceso', repartidor: getState().auth.user.id}
    axios.patch(`/api/pedidos`, pedidoEntrega ,tokenConfig(getState))
    .then(res => {
        console.log(res.data);
        dispatch({
            type: UPDATE_PEDIDO,
            payload: res.data
        })
    }
    )
    .catch(err => dispatch(returnErrors(err.response.data || null, err.response.status)))
} 

export const entregue = pedido => (dispatch, getState) => {
    const pedidoEntrega = {id: pedido._id, estado: 'entregado'}
    axios.patch(`/api/pedidos`, pedidoEntrega ,tokenConfig(getState))
    .then(res => {
        console.log(res.data);
        dispatch({
            type: UPDATE_PEDIDO,
            payload: res.data
        })
    }
    )
    .catch(err => dispatch(returnErrors(err.response.data || null, err.response.status)))
} 

export const setPedidosLoading = () => {
    return {
        type: PEDIDOS_LOADING
    }
}