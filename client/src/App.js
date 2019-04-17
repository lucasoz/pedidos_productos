import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal' 
import { Container } from 'reactstrap'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
       
        <h1>Hola</h1>
      </div>
      </Provider>
    );
  }
}

export default App;
