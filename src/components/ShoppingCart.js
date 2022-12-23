import React, { Component } from "react";
import { InputGroup, Form, Button } from "react-bootstrap"
import Luffy from "../assets/luffy.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class ShoppingCart extends Component {
  state = {
    carts: [],
    totalHarga: 0
  }

  componentDidMount() {
    this.getCartData()
  }

  updateCart = (id, jumlahBarang) => {
    if (jumlahBarang > 0) {
      axios.patch(`http://localhost:3001/carts/`+id, {
        jumlahBarang: jumlahBarang
      })
      .then(
        this.getCartData()
      )
    }else{
      alert("Jumlah barang yang dibeli tidak boleh kurang dari 1!")
    }
  }

  getCartData = () => {
    axios.get(`http://localhost:3001/carts`)
    .then(res => {
      const carts = res.data;
      this.setState({ carts });

      let totalHargaProduk = 0
      for(let i = 0; i < carts.length; i++){
        totalHargaProduk += (carts[i].jumlahBarang * carts[i].product.harga)
      };

      this.setState({
        totalHarga: totalHargaProduk
      })
    })
  }

  deleteCart = (id) => {
    axios.delete(`http://localhost:3001/carts/`+id)
    .then(alert("Barang berhasil dihapus dari keranjang belanja!"))
    .then(
      this.getCartData()
    )
  }

  checkout = () => {
    window.location.href = "#/checkout";
  }

  render() {
    return (
      <>
        <div className="search-product">
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
        </div>
        <div className="row justify-content-between align-items-center gap-5">
        {
          this.state.carts.map(cart =>
            <div key={cart.id} className="col-lg-12 chart-product">
              <div className="row gap-3">
                <div className="col-lg-4 chart-product-thumbnail">
                  <img src={require('../assets/'+cart.product.gambar)} alt={cart.product.gambar}></img>
                </div>
                <div className="col-lg-7 chart-product-summary">
                  <h2 className="mb-3">{cart.product.nama}</h2>
                  <p className="product-description">{cart.product.detail}</p>
                  <InputGroup className="mb-3">
                    <Button onClick={() => this.deleteCart(cart.id)} variant="outline-danger" className="me-3"><FontAwesomeIcon icon={faTrash}/></Button>
                    <Button variant="outline-secondary" onClick={() => this.updateCart(cart.id, cart.jumlahBarang-1)}>-</Button>
                    <Form.Control
                      value={cart.jumlahBarang + " pcs"}
                      aria-label="Recipient's username with two button addons"
                      className="input-stock"
                      readOnly
                    />
                    <Button variant="outline-success" onClick={() => this.updateCart(cart.id, cart.jumlahBarang+1)}>+</Button>
                  </InputGroup>
                  <p className="product-price">{"Total: Rp " + convertToRupiahFormat(cart.product.harga) + " x " + cart.jumlahBarang + " = Rp " + convertToRupiahFormat(cart.product.harga * cart.jumlahBarang)}</p>
                </div>
              </div>
            </div>
          )
        }
        </div>
        <div className="mt-3 w-100 gap-5 d-flex flex-row justify-content-between align-items-center" style={{backgroundColor: "#d9d9d9", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", padding:"1rem"}}>
          <div className="totalHargaCart">
            Total Harga : Rp. {convertToRupiahFormat(this.state.totalHarga)}
          </div>
          <button style={{
            backgroundColor: "#467FD0",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
            textAlign: "center",
            border: "none",
            color: "white",
            width: "100px"
          }} className="me-3" onClick={() => this.checkout()}>
            Beli
          </button>
        </div>
      </>
    );
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export default ShoppingCart;