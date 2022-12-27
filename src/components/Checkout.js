import React, { Component } from 'react'
import Arrow from "../assets/arrow.png"
import JNE from "../assets/JNE.png"
import Voucher from "../assets/Voucher.png"
import Popup from 'reactjs-popup';
import ModalPengiriman from './ModalPengiriman'
import ModalVoucher from './ModalVoucher'
import axios from 'axios'
import './checkout.css'

export default class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = {
      popupOpened: false,
      pengiriman: "JNE Reguler",
      imgPengiriman: JNE,
      inthargaPengiriman: 27000,
      inthargaProduk: 0,
      voucher: "MERDEKA10K",
      intHargaVoucher: 10000,
      intTotalHarga: 0,
      intTotalBarang: 0,
      carts: [],
      checkoutProducts: [],
      lastCheckoutId: 0,
    }
  }

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    axios.get(`http://localhost:3001/carts`)
    .then(res => {
      const carts = res.data;
      const checkoutProducts = res.data;
      this.setState({ carts });
      this.setState({ checkoutProducts });
           
      let totalHargaProduk = 0
      let totalBarang = 0

      for(let i = 0; i < carts.length; i++){
        totalHargaProduk += (carts[i].jumlahBarang * carts[i].product.harga)
        totalBarang += carts[i].jumlahBarang
      };

      this.setState({
        inthargaProduk: totalHargaProduk,
        intTotalHarga: totalHargaProduk - this.state.intHargaVoucher + this.state.inthargaPengiriman,
        intTotalBarang: totalBarang
      })
    })
  }

  changePagetoPilihPembayaran = () => {
    this.handleSubmitCheckout();
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
  
  // get latest checkout id
  handleSubmitCheckout = () => {
    fetch("http://localhost:3001/checkouts?_sort=id&_order=desc&_limit=1")
      .then((response) => response.json())
      .then((json) => {
          this.setState({
              lastCheckoutId: json[0].id + 1
          });
      });
      
    axios.post('http://localhost:3001/checkouts', {
      id: this.state.lastCheckoutId,
      cart: this.state.checkoutProducts,
      totalProduk: this.state.inthargaProduk,
      biayaKirim: this.state.inthargaPengiriman,
      totalBarang: this.state.intTotalBarang,
      voucher: this.state.intHargaVoucher,
      finalTotal: this.state.intTotalHarga,
      status: "Pesanan Dibuat. Menunggu bukti pembayaran diunggah oleh pembeli.",
      statusSummary:"Menunggu Pembayaran"

    })
    .then(function (response) {
    })
    .then(()=>{
          this.props.setIdCheckout(this.state.lastCheckoutId);
          window.location.href = "#/PilihPembayaran/"+this.state.lastCheckoutId;
    })
    .catch(function (error) {
      alert("Request failed!")
    });
  }

  render(){
    return (
      <div style={{paddingBottom:"1rem"}}>
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
                {
                  this.state.carts.map( cart => 
                    <div key={cart.id} className="daftarProduk my-3">
                      <div className="row">
                        <div className="col-lg-5 daftarProduk-thumbnailProd">
                          <img src={require('../assets/'+cart.product.gambar)} alt={cart.product.gambar}></img>
                        </div>
                        <div className="col-lg-5 daftarProduk-desc">
                          <p className="daftarProduk-descProd-margin">{cart.product.nama}</p>
                          <p className="daftarProduk-descProd-margin">Rp. {convertToRupiahFormat(cart.product.harga)}</p>
                        </div>
                        <div className="col-lg-2 daftarProduk-qty">
                          <p>x{cart.jumlahBarang}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                <hr></hr> 
                
                <h5>Pengiriman</h5>
                <div className="daftarProduk">
                  <div className="row">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={this.state.imgPengiriman} alt="Pengiriman"></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>{this.state.pengiriman}</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">Rp. {convertToRupiahFormat(this.state.inthargaPengiriman)}</p>
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
                <hr></hr>

                <h5 >Voucher</h5>
                <div className="daftarProduk">
                  <div className="row">
                    <div className="col-lg-3 daftarProduk-thumbnail">
                      <img src={Voucher} alt="Voucher"></img>
                    </div>
                    <div className="col-lg-3 daftarProduk-desc">
                      <p>{this.state.voucher}</p>
                    </div>
                    <div className="col-lg-5 daftarProduk-desc">
                      <p className="daftarProduk-desc-margin">- Rp {convertToRupiahFormat(this.state.intHargaVoucher)}</p>
                    </div>
                    <div className="col-lg-1 daftarProduk-arrow">
                      <Popup trigger={<img src={Arrow} alt="Arrow"></img>} position="right center">
                        <ModalVoucher setVoucher = {this.setVoucher}/>
                      </Popup>
                    </div>
                  </div>
                </div>
                <hr></hr>
            </div>
        </div>
        <div className='checkoutContainerTotal'>
            <div className='checkoutContentTotal'>
                <h1  className="titleHeaderTotal">Total</h1>
                <table>
                <tr>
                  <td><p>Total Produk</p></td>
                  <td><p>Rp. {convertToRupiahFormat(this.state.inthargaProduk)}</p></td>
                </tr>
                <tr>
                  <td><p>Biaya Pengiriman</p></td>
                  <td><p>Rp. {convertToRupiahFormat(this.state.inthargaPengiriman)}</p></td>
                </tr>
                <tr>
                  <td><p>Voucher</p></td>
                  <td><p>- Rp {convertToRupiahFormat(this.state.intHargaVoucher)}</p></td>
                </tr>
                <tr>
                  <td><b><p>Total Harga</p></b></td>
                  <td><b><p>Rp. {convertToRupiahFormat(this.state.intTotalHarga)}</p></b></td>
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

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
