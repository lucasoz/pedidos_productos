import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { getPedidos, entregara, entregue } from '../../actions/pedidoActions'
import PedidoModal from './PedidoModal'
import { 
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    CardText,
} from 'reactstrap'
import _ from 'lodash'

class Pedido extends Component {

    render() {
        const { usuario, isAuthenticated, pedidos, entregara, entregue } = this.props    

        const ganancias = _.size(_.filter(pedidos, {estado : 'entregado'}))*2000
        
        return (
            <div>
                {isAuthenticated && usuario.tipo === "repartidor" && (<h2>Ganancias: ${ganancias}</h2>)}
                {!isAuthenticated && (<h2>Por favor ingresa al sistema para registrar pedidos o hacer entregas</h2>)}
                {isAuthenticated && usuario.tipo === "vendedor" && <PedidoModal/>}
                { isAuthenticated && pedidos.map(pedido => (
                    <Fragment key={pedido._id}>
                        <Card  body inverse color={pedido.estado === "para entregar" ? "info": pedido.estado === "en proceso" ? "warning" : 'success'}>
                            <CardBody>
                            <CardTitle>Pedido {pedido.estado} </CardTitle>
                            <CardSubtitle>Entregar a {pedido.nombreCliente}</CardSubtitle>
                            <CardText>Teléfono fijo: {pedido.telefonoFijo} <br/>
                            Teléfono Celular: {pedido.telefonoCelular} <br/>
                            Dirección: {pedido.direccionCliente} <br/>
                            Indicaciones: {pedido.consejo} <br/>
                            Productos a entregar: {pedido.descripcionEntrega} <br/>
                            Publicado el: {pedido.fechaRegistro}                  
                            </CardText>
                            {/* {pedido.estado === "para entregar" && usuario.tipo === "vendedor" && <Button color="danger" onClick={() => console.log("click" + pedido._id)}>Eliminar</Button> } */}
                            {pedido.estado === "para entregar" && usuario.tipo === "repartidor" && <Button color="warning" onClick={() => entregara(pedido)}>Lo voy a entregar</Button> }
                            {pedido.estado === "en proceso" && usuario.tipo === "repartidor" && <Button color="success" onClick={() => entregue(pedido)}>Ya lo entregué</Button> }
                            </CardBody>
                        </Card>
                        <br />
                    </Fragment>
                ))}
                { _.isEmpty(pedidos) && isAuthenticated && (<h2>En este momento no hay pedidos disponibles</h2>)}
            </div>
                      
        )
    }
}

const mapDispatchToProps = {
    getPedidos,
    entregara,
    entregue
}

const mapStateToProps = (state) => ({
    usuario: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    pedidos: state.pedido.pedidos
})

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);