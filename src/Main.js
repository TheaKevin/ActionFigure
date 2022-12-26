import React, { Component, useEffect, useState } from "react"
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
import { Nav, Button, Modal } from "react-bootstrap"
import Logo from "./assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList, 
  faCartShopping, 
  faEnvelope, 
  faBagShopping, 
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { Routes } from "react-router-dom";
import RequestProduct from "./components/RequestProduct";
import DetailProduk from "./components/DetailProduk";
import Checkout from "./components/Checkout";
import PilihPembayaran from "./components/PilihPembayaran";
import { Login } from "./components/Login";
import Pembayaran from "./components/Pembayaran";

function Main() {
  const [activeMenu, setActiveMenu] = useState("produk")
  const [idProduk, setIdProduk] = useState(0)
  const [idCheckout, setIdCheckout] = useState(0)
  const [img, setImg] = useState(0)
  const [noRekening, setNoRekening] = useState(0)
  const [isLoggedIn, setLogin] = useState()
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }
  const handleLogOut = () => {
    localStorage.removeItem("info")
    localStorage.removeItem("email")
    setChange(!change)
    window.location.href = "/"
  }

  useEffect(() => {
    if (localStorage.getItem("info") != null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [change])

  return (
    <HashRouter>
      <div className="d-none">
        {isLoggedIn == false ? window.location.href = '#/login' : null}
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <Nav defaultActiveKey="/home" className={isLoggedIn == true ? "flex-column" : "d-none"}>
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
                <Nav.Link 
                  onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faRightFromBracket}/>Log out
                </Nav.Link>
            </div>
            <div className="menubar-user">
              <div className="d-flex">
                <FontAwesomeIcon icon={faUser}/>
                <div className="user-summary">
                  <h6 className="mb-0">{localStorage.getItem("email")}</h6>
                </div>
              </div>
            </div>
          </Nav>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={ <ProductList setIdProduk={setIdProduk} /> }/>
            <Route path="/shopping-cart" element={ <ShoppingCart/> }/>
            <Route path={"/DetailProduk/"+idProduk} element={ <DetailProduk idProduk={idProduk} /> }/>
            <Route path="/checkout" element={ <Checkout setIdCheckout={setIdCheckout}/> }/>
            <Route path="/login" element={ <Login change={change} setChange={setChange} /> }/>
            <Route path={"/pilih-pembayaran/"+idCheckout} element={ <PilihPembayaran idCheckout={idCheckout} setImg={setImg} setNoRekening={setNoRekening}/> }/>
            <Route path={"/pembayaran/"+ idCheckout} element={ <Pembayaran idCheckout={idCheckout} img={img} noRekening={noRekening}/> }/>
            <Route path="/request-product" element={ <RequestProduct/> }/>
          </Routes>
        </div>
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogOut}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </HashRouter>
  );
  
}

export default Main;