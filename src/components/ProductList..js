import React, { Component } from "react"
import Luffy from "../assets/luffy.png"
import axios from 'axios'
import { InputGroup, Form, Button } from "react-bootstrap"

export default class ProductList extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/products`)
      .then(res => {
        const products = res.data;
        this.setState({ products });
      })
  }

  render() {
    return (
      <div>
        <h2>Product List</h2>
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
        <div className="product-list">
          <div className="row justify-content-center">
            {
              this.state.products.map(product =>
                <div key={product.id} className="product-card col-lg-5">
                  <div className="product-thumbnail">
                    <img src={Luffy}></img>
                  </div>
                  <div className="product-summary">
                    <h3>{product.nama}</h3>
                    <p className="product-description">{product.detail}</p>
                    <p className="product-price">Rp {convertToRupiahFormat(product.harga)}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
