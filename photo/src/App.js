import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'materialize-css/dist/css/materialize.min.css'
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/common/Routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
