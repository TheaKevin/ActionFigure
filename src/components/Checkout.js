import React, { Component } from 'react'
import actionFigureDummy from "../assets/luffy.png"
import Arrow from "../assets/arrow.png"
import JNE from "../assets/JNE.png"
import Voucher from "../assets/Voucher.png"
import Popup from 'reactjs-popup';
import ModalPengiriman from './ModalPengiriman'
import ModalVoucher from './ModalVoucher'

export default class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = {
      popupOpened: false,
      pengiriman: "JNE Reguler",
      imgPengiriman: JNE,
      inthargaPengiriman: 27000,
      inthargaProduk: 600000,
      voucher: "MERDEKA10K",
      intHargaVoucher: 10000,
      intTotalHarga: 617000
    }
  }

  changePagetoPilihPembayaran = () => {
    window.location.href = "#/pilih-pembayaran";
  }

  setPopupOpened = (status) => {
      this.setState({
        popupOpened: status
      })
  }

  setPengiriman = (pengiriman,img,harga) => {
    this.setState({
      pengiriman: pengiriman,
      imgPengiriman: img,
      inthargaPengiriman: harga,
      intTotalHarga: this.state.inthargaProduk + harga - this.state.intHargaVoucher
    })
    this.setPopupOpened(false)
  }

  setVoucher = (voucher,harga) => {
    this.setState({
      voucher: voucher,
      intHargaVoucher: harga,
      intTotalHarga: this.state.inthargaProduk + this.state.inthargaPengiriman - harga
    })
  }

  render(){
    console.log(this.state.popupOpened)
    return (
      <div>
      <h2>Detail Pembelian</h2>
      <br></br>
      <div className='checkout'>
        <div className='checkoutContainer'>
            <div>
                <h5>Alamat Pengiriman</h5>
                <p>Jane Doe | (+62) 888-8888-8888</p>
                <p>Jl Merdeka 1 No.7, Serpong Utara</p>
                <p>Tangerang Selatan, Banten</p>
                <hr></hr>

                <h5>Daftar Produk</h5>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnailProd">
                      <img src={actionFigureDummy} alt="actionFigureDummy"></img>
                    </div>
                    <div className="col-lg-6 daftarProduk-desc">
                      <p className="daftarProduk-descProd-margin">Action Figure Luffy</p>
                      <p className="daftarProduk-descProd-margin">Rp. 100,000</p>
                    </div>
                    <div className="col-lg-3 daftarProduk-qty">
                      <p>x6</p>
                    </div>
                  </div>
                </div>
                <br></br>
                <hr></hr> 
                   
                <h5>Pengiriman</h5>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={this.state.imgPengiriman} alt="Pengiriman"></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>{this.state.pengiriman}</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">Rp. {this.state.inthargaPengiriman.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-1 daftarProduk-arrow">
                      <Popup 
                        trigger={<img src={Arrow} alt="Arrow"></img>} 
                        position="right center" 
                        opened={this.state.popupOpened} 
                        onPopupClosed={() => this.setPopupOpened(false)}
                      >
                        <ModalPengiriman setPengiriman = {this.setPengiriman}/>
                      </Popup>
                    </div>
                  </div>
                </div>
                <br></br>
                <hr></hr>

                <h5 >Voucher</h5>
                <div className="daftarProduk">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={Voucher} alt="Voucher"></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>{this.state.voucher}</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">- Rp {this.state.intHargaVoucher.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-1 daftarProduk-arrow">
                      <Popup trigger={<img src={Arrow} alt="Arrow"></img>} position="right center">
                        <ModalVoucher setVoucher = {this.setVoucher}/>
                      </Popup>
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
                  <td><p>Rp. 600,000</p></td>
                </tr>
                <tr>
                  <td><p>Biaya Pengiriman</p></td>
                  <td><p>Rp. {this.state.inthargaPengiriman.toLocaleString()}</p></td>
                </tr>
                <tr>
                  <td><p>Voucher</p></td>
                  <td><p>- Rp {this.state.intHargaVoucher.toLocaleString()}</p></td>
                </tr>
                <tr>
                  <td><b><p>Total Harga</p></b></td>
                  <td><b><p>Rp. {this.state.intTotalHarga.toLocaleString()}</p></b></td>
                </tr>
                </table>
                <button className='buttonCheckout' onClick={() => this.changePagetoPilihPembayaran()}>Beli</button>
            </div>
        </div>
      </div>
      </div>
    )
  }
}
