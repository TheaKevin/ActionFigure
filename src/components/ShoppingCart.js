import React, { Component } from "react";
import { InputGroup, Form, Button } from "react-bootstrap"
import Luffy from "../assets/luffy.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class ShoppingCart extends Component {
  state = {
    carts: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/carts`)
      .then(res => {
        const carts = res.data;
        this.setState({ carts });
      })
  }
  render() {
    return (
      <>
        <h2>Shopping Cart</h2>
        <InputGroup className="mb-5">
          <Form.Control
            placeholder="Enter name of product"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Find
          </Button>
        </InputGroup>
        <div className="row justify-content-between align-items-center gap-5">
        {
              this.state.carts.map(cart =>
                <div key={cart.id} className="col-lg-12 chart-product">
                  <div className="row gap-3">
                    <div className="col-lg-4 chart-product-thumbnail">
                      <img src={Luffy}></img>
                    </div>
                    <div className="col-lg-7 chart-product-summary">
                      <h2 className="mb-3">{cart.product.nama}</h2>
                      <p className="product-description">{cart.product.detail}</p>
                      <InputGroup className="mb-3">
                        <Button variant="outline-danger" className="me-3"><FontAwesomeIcon icon={faTrash}/></Button>
                        <Button variant="outline-secondary">-</Button>
                        <Form.Control
                          placeholder={cart.jumlahBarang + " pcs"}
                          aria-label="Recipient's username with two button addons"
                          className="input-stock"
                        />
                        <Button variant="outline-success">+</Button>
                      </InputGroup>
                      <p className="product-price">{"Total: Rp " + convertToRupiahFormat(cart.product.harga) + " x " + cart.jumlahBarang + " = Rp " + convertToRupiahFormat(cart.totalHarga)}</p>

                    </div>
                  </div>
                </div>
              )
            }
        </div>
      </>
    );
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export default ShoppingCart;