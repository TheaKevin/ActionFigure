import React, { Component } from 'react'
import Arrow from "../assets/arrow.png"
import JNE from "../assets/JNE.png"
import Voucher from "../assets/Voucher.png"
import Popup from 'reactjs-popup';
import ModalPengiriman from './ModalPengiriman'
import ModalVoucher from './ModalVoucher'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { Breadcrumb } from 'react-bootstrap';

export default class AutoCheckout extends Component {
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
      autoCheckout: [],
      checkoutProducts: [],
      lastCheckoutId: 0,
      intTotalBarang: 0,
      namaProduk: "",
      idProduk: 0,
    }
  }

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    axios.get(`http://localhost:3001/autoCheckout`)
    .then(res => {
      const autoCheckout = res.data;
      const checkoutProducts = res.data;
      this.setState({ autoCheckout });
      this.setState({ checkoutProducts });

      let totalHargaProduk = 0
      let totalBarang = 0
      for(let i = 0; i < autoCheckout.length; i++){
        totalHargaProduk += (autoCheckout[i].jumlahBarang * autoCheckout[i].product.harga)
        totalBarang += autoCheckout[i].jumlahBarang
      };

      this.setState({
        inthargaProduk: totalHargaProduk,
        intTotalHarga: totalHargaProduk - this.state.intHargaVoucher + this.state.inthargaPengiriman,
        intTotalBarang: totalBarang,
        namaProduk: autoCheckout[0].product.nama,
        idProduk: autoCheckout[0].product.id
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
    let idCheckout = 0;
    fetch("http://localhost:3001/checkouts?_sort=id&_order=desc&_limit=1")
      .then((response) => response.json())
      .then((json) => {
        if(json.length != 0){
          this.setState({
              lastCheckoutId: json[0].id + 1
          });
        }else{
          this.setState({
            lastCheckoutId: idCheckout + 1
          });
        }
      })
      .then(() => {
        axios.post('http://localhost:3001/checkouts', {
          id: this.state.lastCheckoutId,
          cart: this.state.checkoutProducts,
          totalProduk: this.state.inthargaProduk,
          biayaKirim: this.state.inthargaPengiriman,
          totalBarang: this.state.intTotalBarang,
          voucher: this.state.intHargaVoucher,
          finalTotal: this.state.intTotalHarga,
          status: "Pesanan Dibuat. Menunggu bukti pembayaran diunggah oleh pembeli.",
          statusSummary:"Menunggu Pembayaran",
          statusFromCart:"N"
        })
        .then(function (response) {
          console.log(response)
        })
        .then(()=>{
              this.props.setIdCheckout(this.state.lastCheckoutId);
              window.location.href = "#/PilihPembayaran/"+this.state.lastCheckoutId;
        })
        .catch(function (error) {
          alert("Request failed!")
        });
      })
  }

  render(){
    return (
      <div>
        <h2 className='ps-4 pb-2'>Purchase Details</h2>
        <Breadcrumb className='ms-4 breadcrumb'>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={"#/DetailProduk/" + this.state.idProduk}>{this.state.namaProduk}</Breadcrumb.Item>
          <Breadcrumb.Item active>Purchase Details</Breadcrumb.Item>
        </Breadcrumb>
      <div className='container-fluid checkout'>
        <div className='checkoutContainer'>
            <div>
                <h3>Shipping Address</h3>
                <p><FontAwesomeIcon className='px-3' icon={faLocationDot}/>Jl Merdeka 1 No.7, Serpong Utara, Tangerang Selatan, Banten</p>
                <p><FontAwesomeIcon className='px-3' icon={faAddressBook}/>Jane Doe | (+62) 888-8888-8888</p>
                <hr></hr>
                <h5>Product list</h5>
                {
                  this.state.autoCheckout.map( autocheckout => 
                    <div key={autocheckout.id} className="container-fluid daftarProduk my-3">
                      <div className="row">
                        <div className="col-lg-5 daftarProduk-thumbnailProd">
                          <img src={require('../assets/'+autocheckout.product.gambar)} alt={autocheckout.product.gambar}></img>
                        </div>
                        <div className="col-lg-5 daftarProduk-desc">
                          <p className="daftarProduk-descProd-margin">{autocheckout.product.nama}</p>
                          <p className="daftarProduk-descProd-margin">Rp. {convertToRupiahFormat(autocheckout.product.harga)}</p>
                        </div>
                        <div className="col-lg-2 daftarProduk-qty">
                          <p>x{autocheckout.jumlahBarang}</p>
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
                  <tbody>
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
                  </tbody>
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
