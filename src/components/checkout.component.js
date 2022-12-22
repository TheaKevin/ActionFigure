import React, { Component } from 'react'
import './checkout.css'
import actionFigureDummy from "../assets/luffy.png"
import Arrow from "../assets/arrow.png"
import JNE from "../assets/JNE.png"
import Voucher from "../assets/Voucher.png"
import MenuBar from './menubar.component'


export default class Checkout extends Component {
  render() {
    return (
      <div>
      <h2>Detail Pembelian</h2>
      <br></br>
      <div className='checkout'>
        <div className='checkoutContainer'>
            <div>
                <b><h5>Alamat Pengiriman</h5></b>
                <p>Jane Doe | (+62) 888-8888-8888</p>
                <p>Jl Merdeka 1 No.7, Serpong Utara</p>
                <p>Tangerang Selatan, Banten</p>
                <hr></hr>

                <b><h5>Daftar Produk</h5></b>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnailProd">
                      <img src={actionFigureDummy}></img>
                    </div>
                    <div className="col-lg-6 daftarProduk-desc">
                      <p className="daftarProduk-descProd-margin">Action Figure Luffy</p>
                      <p className="daftarProduk-descProd-margin">Rp. 100.000</p>
                    </div>
                    <div className="col-lg-3 daftarProduk-qty">
                      <p>x6</p>
                    </div>
                  </div>
                </div>
                <br></br>
                <hr></hr> 
                   
                <b><h5>Pengiriman</h5></b>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={JNE}></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>JNE Reguler</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">Rp. 27.000</p>
                    </div>
                    <div className="col-lg-1 daftarProduk-arrow">
                      <img src={Arrow}></img>
                    </div>
                  </div>
                </div>
                <br></br>
                <hr></hr>

                <b><h5 >Voucher</h5></b>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={Voucher}></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>MERDEKA10K</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">- Rp. 10.000</p>
                    </div>
                    <div className="col-lg-1 daftarProduk-arrow">
                      <img src={Arrow}></img>
                    </div>
                  </div>
                </div>
                <br></br>
                <hr></hr>
            </div>
        </div>
        <div className='checkoutContainerTotal'>
            <div className='checkoutContentTotal'>
                <h1  className="titleHeaderTotal">Total</h1>
                <table>
                <tr>
                  <td><p>Total Produk</p></td>
                  <td><p>Rp. 600.000</p></td>
                </tr>
                <tr>
                  <td><p>Biaya Pengiriman</p></td>
                  <td><p>Rp. 27.000</p></td>
                </tr>
                <tr>
                  <td><p>Voucher</p></td>
                  <td><p>-Rp. 10.000</p></td>
                </tr>
                <tr>
                  <td><b><p>Total Harga</p></b></td>
                  <td><b><p>Rp. 617.000</p></b></td>
                </tr>
                </table>
                <button className='buttonCheckout'>Beli</button>
            </div>
        </div>
      </div>
      </div>
    )
  }
}
