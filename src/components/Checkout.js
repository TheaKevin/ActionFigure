import React, { Component } from 'react'
import styles from './checkout.css'

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <div>
            <h1>Detail Pembelian</h1>
        </div>

        <div>
            <h3 className={styles.titlePage}>Alamat Pengiriman</h3>
            <h5>Jane Doe | (+62) 888-8888-8888</h5>
            <h5>Jl Merdeka 1 No.7, Serpong Utara</h5>
            <h5>Tangerang Selatan, Banten</h5>
            <hr></hr>
        </div>

        <div>
            <h3>Daftar Produk</h3>
            <hr></hr>
        </div>

        <div>
            <h3>Pengiriman</h3>
            <hr></hr>
        </div>

        <div>
            <h3>Voucher</h3>
            <hr></hr>
        </div>
      </div>
    )
  }
}
