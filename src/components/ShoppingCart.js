import React, { Component } from "react";
import { InputGroup, Form, Button } from "react-bootstrap"
import Luffy from "../assets/luffy.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class ShoppingCart extends Component {
  render() {
    return (
      <div>
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
        <div className="chart-product">
          <div className="row justify-content-center">
            <div className="col-lg-3 chart-product-thumbnail">
              <img src={Luffy}></img>
            </div>
            <div className="col-lg-6 chart-product-summary">
              <h2 className="mb-3">Action Figure Luffy</h2>
              <InputGroup className="mb-3">
                <Button variant="outline-secondary">-</Button>
                <Form.Control
                  placeholder="6 pcs"
                  aria-label="Recipient's username with two button addons"
                />
                <Button variant="outline-secondary">+</Button>
              </InputGroup>
              <p>Rp 100.000</p>
            </div>
            <div className="col-lg-3 chart-product-action">
              <FontAwesomeIcon icon={faTrash}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;