import React, { Component } from 'react'
import axios from 'axios'
import './statuspemesanan.css'
import Arrow from "../assets/arrow.png"

export default class StatusPemesanan extends Component {
    state = {
        orders: [],
        totalHarga: 0
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
      
  render() {
    return (
        <>
        <div className="header-status-pemesanan">
          <h2>Status Pemesanan</h2>
        </div>
        <div className="row justify-content-between align-items-center gap-2">
        {
          this.state.orders.map(order =>
            <div key={order.id} className="col-lg-12 stats-order-product">
              <div className="row">
                <div className="col-lg-3 stats-order-product-thumbnail">
                  <img src={require('../assets/'+order.cart[0].product.gambar)} alt="Tes"></img>
                </div>
                <div className="col-lg-5 stats-order-product-summary1">
                  <h5>Order ID: {order.id}</h5>
                  <p>Total Barang: {order.totalBarang}</p>
                  <h5>Rp. {convertToRupiahFormat(order.finalTotal)}</h5>
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
          )
        }
        </div>
      </>
    )
  }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
