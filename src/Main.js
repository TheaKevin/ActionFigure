import React, { Component, useState } from "react"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Route,
  NavLink,
  HashRouter,
  useLocation,
  Router
} from "react-router-dom";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import { Nav } from "react-bootstrap"
import Logo from "./assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartShopping, faEnvelope, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { Routes } from "react-router-dom";
import RequestProduct from "./components/RequestProduct";
import DetailProduk from "./components/DetailProduk";
import Checkout from "./components/Checkout";
import PilihPembayaran from "./components/PilihPembayaran";
import { Login } from "./components/Login";
import Pembayaran from "./components/Pembayaran";

function Main() {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     activeMenu: "produk",
  //     idProduk: 0
  //   };
  // }

  const [activeMenu, setActiveMenu] = useState("produk")
  const [idProduk, setIdProduk] = useState(0)
  const [img, setImg] = useState(0)
  const [noRekening, setNoRekening] = useState(0)

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
                  onClick={() => setActiveMenu("produk")} 
                  className={activeMenu == "produk" ? "nav-active": ""}>
                    <FontAwesomeIcon icon={faList}/>Produk
                </Nav.Link>
                <Nav.Link 
                  href="#/shopping-cart" 
                  onClick={() => setActiveMenu("keranjang")}
                  className={activeMenu == "keranjang" ? "nav-active": ""}>
                    <FontAwesomeIcon icon={faCartShopping}/>Keranjang Belanja
                </Nav.Link>
                <Nav.Link 
                  href="#/request-product"
                  onClick={() => setActiveMenu("request")}
                  className={activeMenu == "request" ? "nav-active": ""}>
                    <FontAwesomeIcon icon={faEnvelope}/>Request Produk
                </Nav.Link>
                <Nav.Link 
                  href="#/order"
                  onClick={() => setActiveMenu("pemesanan")}
                  className={activeMenu == "pemesanan" ? "nav-active": ""}>
                    <FontAwesomeIcon icon={faBagShopping}/>Pemesanan
                </Nav.Link>
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
            <Route path="/" element={ <ProductList setIdProduk={setIdProduk} /> }/>
            <Route path="/shopping-cart" element={ <ShoppingCart/> }/>
            <Route path="/request-product" element={ <RequestProduct/> }/>
            <Route path={"/DetailProduk/"+idProduk} element={ <DetailProduk idProduk={idProduk} /> }/>
            <Route path="/checkout" element={ <Checkout/> }/>
            <Route path="/pilih-pembayaran" element={ <PilihPembayaran/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/pilih-pembayaran" element={ <PilihPembayaran setImg={setImg} setNoRekening={setNoRekening}/> }/>
            <Route path={"/pembayaran/"+img+"/"+noRekening} element={ <Pembayaran img={img} noRekening={noRekening}/> }/>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
  
}

export default Main;