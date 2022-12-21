import React, { Component } from 'react'
import './checkout.css'
import actionFigureDummy from "../assets/Luffy.png"
import JNE from "../assets/JNE.png"
import Voucher from "../assets/Voucher.png"
import MenuBar from './menubar.component'


export default class Checkout extends Component {
  render() {
    return (
      <div className='checkout'>
        <MenuBar/>
        <div className='checkoutContainer'>
            <div className='checkoutContent'>
                <h1  className="titlePage">Detail Pembelian</h1>
                <h3 className='titleHeader'>Alamat Pengiriman</h3>
                <p className='fontPage'>Jane Doe | (+62) 888-8888-8888</p>
                <p className='fontPage'>Jl Merdeka 1 No.7, Serpong Utara</p>
                <p className='fontPage'>Tangerang Selatan, Banten</p>
                <hr></hr>
                <h3 className='titleHeader'>Daftar Produk</h3>
                <img
                  className='imageCheckout'
                  src={actionFigureDummy}
                  width={80}
                  height={80}
                  alt={"actionFigureDummy"}
                />
                <p className='fontwithPhoto'>Action Figure Luffy</p>
                <p className='fontwithPhoto'>Rp. 597.000</p>
                <br></br>
                <hr></hr>    
                <h3 className='titleHeader'>Pengiriman</h3>
                <img
                  className='imageCheckout'
                  src={JNE}
                  width={74}
                  height={30}
                  alt={"JNE"}
                />
                <p className='fontwithPhoto'>JNE Reguler</p>
                <br></br>
                <hr></hr>
                <h3 className='titleHeader'>Voucher</h3>
                <img
                  className='imageCheckout'
                  src={Voucher}
                  width={50}
                  height={50}
                  alt={"Voucher"}
                />
                <p className='fontwithPhoto'>MERDEKA10K</p>
                <br></br>
                <hr></hr>
            </div>
        </div>
        <div className='checkoutContainerTotal'>
            <div className='checkoutContentTotal'>
                <h1  className="titleHeaderTotal">Total</h1>
                <table>
                <tr>
                  <td><p className='fontPage'>Total Produk</p></td>
                  <td><p className='fontPage'>Rp. 597.000</p></td>
                </tr>
                <tr>
                  <td><p className='fontPage'>Biaya Pengiriman</p></td>
                  <td><p className='fontPage'>Rp. 27.000</p></td>
                </tr>
                <tr>
                  <td><p className='fontPage'>Voucher</p></td>
                  <td><p className='fontPage'>-Rp. 10.000</p></td>
                </tr>
                <tr>
                  <td><b><p className='fontPage'>Total Harga</p></b></td>
                  <td><b><p className='fontPage'>Rp. 614.000</p></b></td>
                </tr>
                </table>
                <button className='buttonCheckout'>Beli</button>
            </div>
        </div>
      </div>
    )
  }
}
