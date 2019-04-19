import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'

class AppNavBar extends Component {
    state = {
        isOpen: false
    }
    toogle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            ShoppingList
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toogle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className = "ml-auto" navbar>
                                <NavItem>
                                    <RegisterModal/>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


export default AppNavBar