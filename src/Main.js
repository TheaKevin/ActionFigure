import React, { Component, useState } from "react"
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
import RequestProduct from "./components/RequestProduct";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "produk"
    };
  }
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
                  <Nav.Link 
                    exact href="#/" 
                    onClick={() => this.setState({ activeMenu: "produk" })} 
                    className={this.state.activeMenu == "produk" ? "nav-active": ""}>
                      <FontAwesomeIcon icon={faList}/>Produk
                  </Nav.Link>
                  <Nav.Link 
                    href="#/shopping-cart" 
                    onClick={() => this.setState({ activeMenu: "keranjang" })}
                    className={this.state.activeMenu == "keranjang" ? "nav-active": ""}>
                      <FontAwesomeIcon icon={faCartShopping}/>Keranjang Belanja
                  </Nav.Link>
                  <Nav.Link 
                    href="#/request-product"
                    onClick={() => this.setState({ activeMenu: "request" })}
                    className={this.state.activeMenu == "request" ? "nav-active": ""}>
                      <FontAwesomeIcon icon={faEnvelope}/>Request Produk
                  </Nav.Link>
                  <Nav.Link 
                    href="#/order"
                    onClick={() => this.setState({ activeMenu: "pemesanan" })}
                    className={this.state.activeMenu == "pemesanan" ? "nav-active": ""}>
                      <FontAwesomeIcon icon={faBagShopping}/>Pemesanan
                  </Nav.Link>
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
              <Route path="/request-product" element={ <RequestProduct/> }/>
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;