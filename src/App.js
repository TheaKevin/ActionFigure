import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/menubar.component';
import { ProductList } from './components/ProductList.';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react';
import DetailProduk from './DetailProduk';

function App() {


  return (
    <div className="App d-flex flex-row">
      <MenuBar/>
      <ProductList/>
    </div>
  );
}

export default App;
