import { Component } from "react"
import { Nav } from "react-bootstrap"
import Logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartShopping, faEnvelope, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

export default class MenuBar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <div className="d-flex align-items-center menubar-brand">
          <img src={Logo}></img>
          <h2>Action Figure</h2>
        </div>
        <div className="menubar-list">
          <NavLink to="/">
            <Nav.Link><FontAwesomeIcon icon={faList}/>Produk</Nav.Link>
          </NavLink>
          <NavLink to="/shopping-cart">
            <Nav.Link><FontAwesomeIcon icon={faCartShopping}/>Keranjang Belanja</Nav.Link>
          </NavLink>
          <NavLink to="/request-product">
            <Nav.Link><FontAwesomeIcon icon={faEnvelope}/>Request Produk</Nav.Link>
          </NavLink>
          <NavLink to="/my-order">
            <Nav.Link><FontAwesomeIcon icon={faBagShopping}/>Pemesanan</Nav.Link>
          </NavLink>
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
    )
  }
}