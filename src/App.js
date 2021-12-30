import React, { Component } from 'react';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';
//import { CAMPSITES } from './shared/campsites';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-lobster';
import 'typeface-open-sans';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';



const store = ConfigureStore();



class App extends Component {


   



    render() {
        return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
        );
    }
}

export default App;

