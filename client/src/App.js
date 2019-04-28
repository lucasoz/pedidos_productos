import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal' 
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions'
import Pedido from './components/pedido/Pedido'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar/>
        <Container>
          <Pedido/>
          <ItemModal/>
          <ShoppingList/>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
