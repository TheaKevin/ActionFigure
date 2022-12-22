import React, { Component, useEffect, useState } from "react"
import Luffy from "../assets/luffy.png"
import axios from 'axios'
import { InputGroup, Form, Button } from "react-bootstrap"

function ProductList({setIdProduk}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProduct();
  }, [])

  const getAllProduct = () => {
    axios.get(`http://localhost:3001/products`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const changePage = (id) => {
    setIdProduk(id);
    window.location.href = "#/DetailProduk/"+id;
  }

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
            products.map(product =>
              <a onClick={() => changePage(product.id)} key={product.id} className="product-card col-lg-5">
                <div className="product-thumbnail">
                  <img src={require('../assets/'+product.gambar)} alt={product.gambar}></img>
                </div>
                <div className="product-summary d-flex flex-column justify-content-between">
                  <div>
                    <h3>{product.nama}</h3>
                    <p className="product-description">{product.detail}</p>
                  </div>
                  <p className="product-price">Rp {convertToRupiahFormat(product.harga)}</p>
                </div>
              </a>
            )
          }
        </div>
      </div>
    </div>
  );
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default ProductList;
