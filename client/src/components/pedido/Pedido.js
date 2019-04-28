import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getPedidos } from '../../actions/pedidoActions'
import PedidoModal from './PedidoModal'

class Pedido extends Component {

    render() {
        const { usuario, isAuthenticated, pedidos } = this.props

        console.log(pedidos);        
        return (
            <div>
                <p>{isAuthenticated ? usuario.tipo : "sin autenticar"}</p> 
                <PedidoModal/>
                {pedidos.map(pedido => (<li key={pedido._id}> {pedido.estado} / {pedido.nombreCliente} </li>))}
            </div>
                      
        )
    }
}

const mapDispatchToProps = {
    getPedidos
}

const mapStateToProps = (state) => ({
    usuario: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    pedidos: state.pedido.pedidos
})

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);