import React, { Component } from 'react'
import axios from 'axios'
import './statuspemesanan.css'
import Arrow from "../assets/arrow.png"
import { Form, Button, Modal } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClock,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

export default class StatusPemesanan extends Component {
    state = {
        orders: [],
        totalHarga: 0,
        searchInput: "",
        selectedSort: "",
        mpSelected:false,
        vpSelected:false
      }
    
      componentDidMount() {
        this.getCartData()
      }
    
      getCartData = () => {
        axios.get(`http://localhost:3001/checkouts`)
        .then(res => {
          const orders = res.data;
          this.setState({ orders });
        })
      }

      getPriceHighToLow = () => {
        axios.get(`http://localhost:3001/checkouts?_sort=totalProduk&_order=desc`)
          .then(res => {
            const orders = res.data;
            this.setState({ orders });
          })
      }

      getPriceLowToHigh = () => {
        axios.get(`http://localhost:3001/checkouts?_sort=totalProduk&_order=asc`)
          .then(res => {
            const orders = res.data;
            this.setState({ orders });
          })
      }

      getCartByStatusMP = () => {
        this.setState({
          mpSelected: !this.state.mpSelected,
          vpSelected: false,
          selectedSort: ""
        })
        this.state.mpSelected ? 
        this.getCartData() :
        axios.get(`http://localhost:3001/checkouts?statusSummary=Menunggu Pembayaran`)
        .then(res => {
          const orders = res.data;
          this.setState({ orders });
        })
        
      }

      getCartByStatusVP = () => {
        this.setState({
          vpSelected: !this.state.vpSelected,
          mpSelected: false,
          selectedSort: ""
        })
        this.state.vpSelected ? this.getCartData() :
        axios.get(`http://localhost:3001/checkouts?statusSummary=Verifikasi Pembayaran`)
        .then(res => {
          const orders = res.data;
          this.setState({ orders });
        })
        
      }

      filterProduct = (e) => {
        this.setState({searchInput: e.target.value})
      }

      applySort = (selected) => {
        this.setState({
          selectedSort: selected,
          mpSelected: false,
          vpSelected: false
        })
        if (selected === "") {
          this.getCartData()
        } else if (selected === "1") {
          this.getPriceHighToLow()
        } else {
          this.getPriceLowToHigh()
        }
      }
  render() {
    return (
        <>
          <div className="search-product">
            <h2>Order Status</h2>
            <div className='d-flex justify-content-left gap-5'>
              <div className="sort-container">
                <label>Sort</label>
                <Form.Select value={this.state.selectedSort} onChange={(e) => this.applySort(e.target.value)}>
                  <option className="d-none">Please choose</option>
                  <option value="1">Price (High to Low)</option>
                  <option value="2">Price (Low to High)</option>
                </Form.Select>
              </div>
              <div className="sort-container">
                <label>Filter</label>
                <Button variant={this.state.mpSelected ? 'active' : 'outline-pertama'} onClick={() => this.getCartByStatusMP()}><FontAwesomeIcon className='me-2' icon={faClock}/>Menunggu Pembayaran</Button>
                <Button variant={this.state.vpSelected ? 'active' : 'outline-pertama'}  onClick={() => this.getCartByStatusVP()}><FontAwesomeIcon className='me-2' icon={faCheckCircle}/>Verifikasi Pembayaran</Button>
              </div>
            </div>
          </div>
        <div className='container-fluid'>
          <div className='status-container'>
            <div className="row justify-content-between align-items-center gap-5">
            {
              this.state.orders.map(order =>
                <div key={order.id}>
                  <div className='col-lg-8 stats-order-product'>
                    <div className="row">
                      <div className="col-lg-3 stats-order-product-thumbnail">
                        <img src={require('../assets/'+order.cart[0].product.gambar)} alt="Tes"></img>
                      </div>
                      <div className="col-lg-5 stats-order-product-summary1">
                        <h5>{order.cart[0].product.nama}</h5>
                        <p>Number of items: {order.totalBarang}</p>
                        {order.cart.length > 1 ? <h6 style={{fontWeight: "200", fontSize: "smaller"}}>+{ + (order.cart.length-1) + " another product"}</h6> : null}
                        <div style={{paddingTop: "2rem"}}>
                          <div className='row justify-content-left align-items-center'>
                            <div className='col-lg-5'>
                              <label style={{fontWeight: "200"}}>Total spending: <br/><span className='total-price '>Rp {convertToRupiahFormat(order.finalTotal)}</span></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 stats-order-product-summary2">
                          <div className='stats-order-status'>
                              <p>{order.status}</p>
                              <img src={Arrow} alt="Arrow"></img>
                          </div>
                          <hr></hr>
                          <p className='stats-order-statusSummary'>{order.statusSummary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            </div>
          </div>
        </div>
      </>
    )
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
