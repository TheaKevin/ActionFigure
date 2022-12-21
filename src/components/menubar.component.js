import { Component } from "react"
import { Nav } from "react-bootstrap"
import Logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartShopping, faEnvelope, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'

export default class MenuBar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <div className="d-flex align-items-center menubar-brand">
          <img src={Logo}></img>
          <h2>Action Figure</h2>
        </div>
        <div className="menubar-list">
          <Nav.Link href="javascript:alert('not yet implemented')"><FontAwesomeIcon icon={faList}/>Produk</Nav.Link>
          <Nav.Link href="javascript:alert('not yet implemented')"><FontAwesomeIcon icon={faCartShopping}/>Keranjang Belanja</Nav.Link>
          <Nav.Link href="javascript:alert('not yet implemented')"><FontAwesomeIcon icon={faEnvelope}/>Request Produk</Nav.Link>
          <Nav.Link href="javascript:alert('not yet implemented')"><FontAwesomeIcon icon={faBagShopping}/>Pemesanan</Nav.Link>
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