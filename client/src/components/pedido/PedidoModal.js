import React, { Component } from 'react'
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import { PropTypes } from "prop-types";
import { connect } from 'react-redux'
import { addPedido } from '../../actions/pedidoActions'
import { clearErrors } from '../../actions/errorActions'

class PedidoModal extends Component {
    state={
        modal: false,
        nombreCliente: '',
        direccionCliente: '',
        consejo: '',
        telefonoFijo: 0,
        telefonoCelular: 0,
        descripcionEntrega: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addPedido: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for register error
            if(error.id === 'ADD_PEDIDO_FAIL'){
                this.setState({msg: error.msg.msg})
            }else {               
                this.setState({ msg: null })
            }
        }


        // // If isAuthenticated, close modal
        // if(this.state.modal) {
        //     if(isAuthenticated){
        //         this.toggle()
        //     }
        // }

    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal,
            nombreCliente: '',
            direccionCliente: '',
            consejo: '',
            telefonoFijo: 0,
            telefonoCelular: 0,
            descripcionEntrega: '',
            msg: null
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {        
        e.preventDefault()

        const newPedido = {
            nombreCliente: this.state.nombreCliente,
            direccionCliente: this.state.direccionCliente,
            consejo: this.state.consejo,
            telefonoFijo: this.state.telefonoFijo,
            telefonoCelular: this.state.telefonoCelular,
            descripcionEntrega: this.state.descripcionEntrega   
        }

        this.props.addPedido(newPedido, this.toggle)
    }

    render(){
        return(
            <div>
                { this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Realizar un pedido
                </Button> : <h4 className="mb-3 ml-4">Por favor ingresa al sistema</h4>}

                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                    Realiza un pedido
                    </ModalHeader>

                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="nombreCliente">Nombre del Cliente</Label>
                                <Input
                                type="text"
                                name="nombreCliente"
                                id="nombreCliente"
                                placeholder="Nombre"
                                onChange={this.onChange}
                                />
                                <Label for="direccionCliente">Dirección del Cliente</Label>
                                <Input
                                type="text"
                                name="direccionCliente"
                                id="direccionCliente"
                                placeholder="Dirección"
                                onChange={this.onChange}
                                />
                                <Label for="consejo">Indicaciones para llegar</Label>
                                <Input
                                type="text"
                                name="consejo"
                                id="consejo"
                                placeholder="Indicaciones"
                                onChange={this.onChange}
                                />
                                <Label for="telefonoFijo">Teléfono fijo</Label>
                                <Input
                                type="number"
                                name="telefonoFijo"
                                id="telefonoFijo"
                                placeholder="Teléfono Fijo"
                                onChange={this.onChange}
                                />
                                <Label for="telefonoCelular">Nímero celular</Label>
                                <Input
                                type="number"
                                name="telefonoCelular"
                                id="telefonoCelular"
                                placeholder="Número celular"
                                onChange={this.onChange}
                                />
                                <Label for="descripcionEntrega">Descripción productos a entregar</Label>
                                <Input
                                type="text"
                                name="descripcionEntrega"
                                id="descripcionEntrega"
                                placeholder="Productos a entregar con sus cantidades"
                                onChange={this.onChange}
                                />

                                <Button
                                    color="dark"
                                    style={{marginTop:'2em'}}>
                                    Enviar pedido
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>


                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {addPedido, clearErrors})(PedidoModal)


