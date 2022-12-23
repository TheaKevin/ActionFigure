import React, { Component, useEffect, useState } from "react"
import Luffy from "../assets/luffy.png"
import axios from 'axios'
import { InputGroup, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
      <div className="search-product">
      <h2>Product List</h2>
        <InputGroup>
          <Form.Control
            placeholder="Find your desired product here"
            aria-label="Find your desired product here"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
        </InputGroup>
      </div>
      <div className="product-list">
        <div className="row justify-content-center">
          {
            products.map(product =>
              <a onClick={() => changePage(product.id)} key={product.id} className="product-card col-xl-3 col-lg-4 col-sm-12 col-md-8">
                <div className="product-thumbnail">
                  <img src={require('../assets/'+product.gambar)} alt={product.gambar}></img>
                </div>
                <div className="product-summary">
                  <div>
                    <h3>{product.nama}</h3>
                    <p className="product-price"> Rp {convertToRupiahFormat(product.harga)}</p>
                    <p className="product-description">{product.detail}</p>
                  </div>
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
