import React, { useEffect, useState } from "react"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Route,
  HashRouter,
  Navigate
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
  faRightFromBracket,
  faCircleUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import { Routes } from "react-router-dom";
import RequestProduct from "./components/RequestProduct";
import DetailProduk from "./components/DetailProduk";
import Checkout from "./components/Checkout";
import AutoCheckout from "./components/AutoCheckout";
import PilihPembayaran from "./components/PilihPembayaran";
import { Login } from "./components/Login";
import Pembayaran from "./components/Pembayaran";
import StatusPemesanan from "./components/StatusPemesanan";
import Wishlist from "./components/Wishlist";
import axios from "axios";

function Main() {
  const [activeMenu, setActiveMenu] = useState("produk")
  const [idProduk, setIdProduk] = useState(0)
  const [idCheckout, setIdCheckout] = useState(0)
  const [img, setImg] = useState(0)
  const [noRekening, setNoRekening] = useState(0)
  const [isLoggedIn, setLogin] = useState()
  const [show, setShow] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [userName, setUserName] = useState("")
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogOut = () => {
    localStorage.removeItem("info")
    localStorage.removeItem("email")
    window.location.href = "/"
  }

  const getUsername = () => {
    axios.get("http://localhost:3001/users?email=" + localStorage.getItem("email"))
      .then((response) => {
        setUserName(response.data[0].nama)
      }). catch(function (error) {
        console.log(error)
        setUserName("please reload this site")
      })
  }

  const collapseNavbar = () => {
    isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true)
    const navTrigger = document.getElementById("nav-trigger")
    const triggerDiv = document.getElementsByClassName("eventCollapse")
    const triggerSvg = document.getElementsByClassName("eventCollapse2")
    const imageTrigger = document.getElementById("image-trigger")

    if (isCollapsed) {
      navTrigger.style.width = "110px"

      for (let i=0;i<triggerDiv.length;i+=1){
        triggerDiv[i].style.display = 'none';
      }
  
      for (let i=0;i<triggerSvg.length;i+=1){
        triggerSvg[i].style.paddingRight = "0"
        triggerSvg[i].style.textAlign = "center"
        triggerSvg[i].style.width = "100%"
      }
      
      imageTrigger.style.removeProperty("animation-name")
      imageTrigger.style.removeProperty("animation-duration")
      imageTrigger.style.animationName = "spin"
      imageTrigger.style.animationDuration = "500ms"

    } else {
      navTrigger.style.width = "350px"
      
      
      for (let i=0;i<triggerSvg.length;i+=1){
        triggerSvg[i].style.removeProperty("width")
        triggerSvg[i].style.paddingRight = "1rem"
        triggerSvg[i].style.removeProperty("textAlign")
      }
      
      for (let i=0;i<triggerDiv.length;i+=1){
        triggerDiv[i].style.display = "inline-block"
      }

      imageTrigger.style.removeProperty("animation-name")
      imageTrigger.style.removeProperty("animation-duration")
      imageTrigger.style.animationName = "spin2"
      imageTrigger.style.animationDuration = "500ms"
    }
  }

  useEffect(() => {
    localStorage.getItem("info") != null ? setLogin(true) : setLogin(false)
    getUsername()
  }, [])

  if (!isLoggedIn) {
    return(
      <>
        <HashRouter>
          <Routes>
            <Route path="/" element={ <Login /> }/>
            <Route path="*" element={<Navigate to ="/" />}/>
          </Routes>
        </HashRouter> 
      </>
    )
  }
  else {
    return (
      <>
        <HashRouter>
          <div className="d-flex">
            <div>
              <Nav className="flex-column" id="nav-trigger">
                <div className="d-flex align-items-center menubar-brand">
                  <img id="image-trigger"onClick={() => collapseNavbar()} src={Logo} alt={"Logo Action Figure "}></img>
                  <div className="d-flex flex-column">
                    <h2 className="eventCollapse">Action Figure</h2>
                    <h6 className="eventCollapse text-white">Hello, {userName}</h6>
                  </div>
                </div>
                <div className="menubar-list">
                    <Nav.Link 
                      href="#/" 
                      onClick={() => setActiveMenu("produk")} 
                      className={activeMenu == "produk" ? "nav-active": ""}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faList}/><span className="eventCollapse">Product</span>
                    </Nav.Link>
                    <Nav.Link 
                      href="#/Wishlist" 
                      onClick={() => setActiveMenu("wishlist")} 
                      className={activeMenu == "wishlist" ? "nav-active": ""}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faHeart}/><span className="eventCollapse">Wishlist</span>
                    </Nav.Link>
                    <Nav.Link 
                      href="#/shopping-cart" 
                      onClick={() => setActiveMenu("keranjang")}
                      className={activeMenu == "keranjang" ? "nav-active": ""}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faCartShopping}/><span className="eventCollapse">Cart</span>
                    </Nav.Link>
                    <Nav.Link 
                      href="#/request-product"
                      onClick={() => setActiveMenu("request")}
                      className={activeMenu == "request" ? "nav-active": ""}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faEnvelope}/><span className="eventCollapse">Request</span>
                    </Nav.Link>
                    <Nav.Link 
                      href="#/status-pemesanan"
                      onClick={() => setActiveMenu("pemesanan")}
                      className={activeMenu == "pemesanan" ? "nav-active": ""}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faBagShopping}/><span className="eventCollapse">Order</span>
                    </Nav.Link>
                    <hr></hr>
                    <Nav.Link 
                      onClick={() => handleShow()}>
                        <FontAwesomeIcon className="eventCollapse2" icon={faRightFromBracket}/><span className="eventCollapse">Log out</span>
                    </Nav.Link>
                    <hr></hr>
                </div>
                <div className="menubar-user eventCollapse">
                  <div className="d-flex">
                    <FontAwesomeIcon className="eventCollapse2" icon={faCircleUser}/>
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
                <Route path="/Wishlist" element={ <Wishlist setIdProduk={setIdProduk} /> }/>
                <Route path="/shopping-cart" element={ <ShoppingCart/> }/>
                <Route path={"/DetailProduk/"+idProduk} element={ <DetailProduk idProduk={idProduk} /> }/>
                <Route path="/checkout" element={ <Checkout setIdCheckout={setIdCheckout}/> }/>
                <Route path="/AutoCheckout" element={ <AutoCheckout setIdCheckout={setIdCheckout}/> }/>
                <Route path="/request-product" element={ <RequestProduct/> }/>
                <Route path="/status-pemesanan" element={ <StatusPemesanan/> }/>
                <Route path={"/PilihPembayaran/"+idCheckout} element={ <PilihPembayaran idCheckout={idCheckout} setImg={setImg} setNoRekening={setNoRekening}/> }/>
                <Route path={"/pembayaran/"+ idCheckout} element={ <Pembayaran idCheckout={idCheckout} img={img} noRekening={noRekening}/> }/>
                <Route path="*" element={<ProductList setIdProduk={setIdProduk} />}/>
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
      </>
    );
  }
}

export default Main;