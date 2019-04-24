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
    NavLink, 
    Alert
} from 'reactstrap'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
    state={
        modal: false,
        nombre: '',
        email: '',
        telefono: 0,
        password: '',
        tipo: 'vendedor',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg})
            }else {               
                this.setState({ msg: null })
            }
        }

        // If isAuthenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated){
                this.toggle()
            }
        }

    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })      
    }

    onSubmit = e => {
        e.preventDefault()
        
        const { nombre, email, telefono, tipo, password } = this.state;

        // Create user object
        const  newUser = {
            nombre, 
            email, 
            telefono,
            tipo,
            password
        }

        // Attempt to register
        this.props.register(newUser)

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Registro
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                    Registro
                    </ModalHeader>

                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="nombre">Nombre</Label>
                                <Input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre"
                                className="mb-3"
                                onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                className="mb-3"
                                onChange={this.onChange}
                                />
                                <Label for="telefono">Teléfono</Label>
                                <Input
                                type="number"
                                name="telefono"
                                id="telefono"
                                placeholder="Teléfono"
                                className="mb-3"
                                onChange={this.onChange}
                                />
                                <Label for="tipo">Tipo de Usuario</Label>
                                <Input
                                type="select"
                                name="tipo"
                                id="tipo"
                                placeholder="Tipo de Usuario"
                                className="mb-3"
                                onChange={this.onChange}
                                >
                                    <option value="vendedor">Vendedor</option>
                                    <option value="repartidor">Repartidor</option>
                                </Input>
                                <Label for="password">Contraseña</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop:'2em'}}>
                                    Registrarse
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)


