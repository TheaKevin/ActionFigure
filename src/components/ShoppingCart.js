import React, { Component } from "react";
import { InputGroup, Form, Button, Table } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class ShoppingCart extends Component {
  state = {
    carts: [],
    totalHarga: 0,
    totalBarang: 0
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
      let totalBarangDiKeranjang = 0
      for(let i = 0; i < carts.length; i++){
        totalHargaProduk += (carts[i].jumlahBarang * carts[i].product.harga)
        totalBarangDiKeranjang += carts[i].jumlahBarang
      };

      this.setState({
        totalHarga: totalHargaProduk,
        totalBarang: totalBarangDiKeranjang
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
        <div>
          <h2 className="ps-4 pb-4">Shopping Cart</h2>
        </div>
        <div className="container-fluid">
          <div className="cart-list">
            <div className="row justify-content-left gap-3 w-100">
              <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12">
                {
                  this.state.carts.length == 0 ? 
                  "You've not added product to cart!":
                  this.state.carts.map(cart =>
                    <div key={cart.id} className="chart-product">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-lg-4 col-md-12 chart-product-thumbnail">
                            <img src={require('../assets/'+cart.product.gambar)} alt={cart.product.gambar}></img>
                          </div>
                          <div className="col-lg-6 col-md-12 chart-product-summary">
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
                    </div>
                  )
                }
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 cart-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Pcs</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.carts.map(cart => 
                        <tr key={cart.id}>
                          <td>{cart.product.nama}</td>
                          <td>{cart.jumlahBarang}</td>
                          <td>Rp {convertToRupiahFormat(cart.product.harga)}</td>
                          <td>Rp {convertToRupiahFormat(cart.product.harga * cart.jumlahBarang)}</td>
                        </tr>
                      )
                    }
                    <tr className="total-price">
                      <td>Total Price: </td>
                      <td colSpan={3}>Rp {convertToRupiahFormat(this.state.totalHarga)}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                  <Button disabled={this.state.carts.length == 0 ? true : false} className="w-50" variant="pertama" onClick={() => this.checkout()}>
                    Buy {this.state.totalBarang} items
                  </Button>      
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export default ShoppingCart;