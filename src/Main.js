import React, { Component } from "react"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ProductList from "./components/ProductList.";
import ShoppingCart from "./components/ShoppingCart";
import { Nav } from "react-bootstrap"
import Logo from "./assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartShopping, faEnvelope, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { Routes } from "react-router-dom";
import Checkout from "./components/checkout.component";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="d-flex justify-content-center">
          <div>
            <Nav defaultActiveKey="/home" className="flex-column">
              <div className="d-flex align-items-center menubar-brand">
                <img src={Logo}></img>
                <h2>Action Figure</h2>
              </div>
              <div className="menubar-list">
                  <Nav.Link exact href="#/"><FontAwesomeIcon icon={faList}/>Produk</Nav.Link>
                  <Nav.Link href="#/shopping-cart"><FontAwesomeIcon icon={faCartShopping}/>Keranjang Belanja</Nav.Link>
                  <Nav.Link href="#/request-product"><FontAwesomeIcon icon={faEnvelope}/>Request Produk</Nav.Link>
                  <Nav.Link href="#/order"><FontAwesomeIcon icon={faBagShopping}/>Pemesanan</Nav.Link>
                  <Nav.Link href="#/checkout"><FontAwesomeIcon icon={faBagShopping}/>Checkout - deleted soon</Nav.Link>
              </div>
              <div className="menubar-user">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faUser}/>
                  <div className="user-summary">
                    <h6 className="mb-0">Julyus Andreas</h6>
                    <p className="mb-0">User</p>
                  </div>
                </div>
              </div>
            </Nav>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={ <ProductList/> }/>
              <Route path="/shopping-cart" element={ <ShoppingCart/> }/>
              <Route path="/checkout" element={ <Checkout/> }/>
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;