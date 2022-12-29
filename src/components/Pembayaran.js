import React, { Component } from 'react'
import './pembayaran.css'
import axios from 'axios'
import { Form, Button } from "react-bootstrap"

export default class Pembayaran extends Component {
constructor(props){
    super(props);
    this.state = {
        img: props.img,
        noRekening: props.noRekening,
        idCheckout: props.idCheckout,
        totalBayar: 0
    }
}

componentDidMount() {
    fetch("http://localhost:3001/checkouts/"+this.state.idCheckout)
    .then((response) => response.json())
    .then((json) => {
        this.setState({
            totalBayar: json.finalTotal
        });
    });
}

checkFromCart = (id) => {
    let carts = []
    let isDelete = 0
    fetch('http://localhost:3001/checkouts?id='+id+"&statusFromCart=Y")
    .then((response) => response.json())
    .then((json) => {
        if(json.length != 0){
            carts = json[0].cart
            isDelete = 1
        }
    })
    .then(function(){
        if(isDelete==1){
            for(let i = 0; i < carts.length; i++){
                axios.delete(`http://localhost:3001/carts/`+carts[i].id)
            }
        }}
    )
}

  updateStatusCheckout = (id,noRef) => {
    axios.patch(`http://localhost:3001/checkouts/`+id, {
        status: "Bukti pembayaran diterima. Pembayaran sedang menunggu verifikasi oleh penjual",
        statusSummary: "Verifikasi Pembayaran",
        noRef: noRef
      })
      .then(
        this.checkFromCart(id)
      )
      .then(function (response) {
        alert("Bukti pembayaran diterima!")
        window.location.href = "#/status-pemesanan"
      })
    }

render() {
    const handleSubmitPembayaran = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const trxno = formData.get("trx-no-ref")
        if(trxno==""){
            alert("Mohon isi no transaksi / ref terlebih dahulu")
        }
        else{
            this.updateStatusCheckout(this.state.idCheckout,trxno)
        }
    }

    return (<div style={{paddingLeft: "3rem", paddingRight: "3rem"}}>
        <h2>Pembayaran</h2>
        <br></br>
        <div className='onePage'>
            <div className='onePageContainer'>
                <div className='onePageContent'>
                    <br></br>
                    <h5>Virtual Account</h5>
                    <br></br>
                    <div>
                        <img src={this.state.img} alt="img"></img>
                    </div>
                    <br></br>
                    <div>
                        <h5>{this.state.noRekening}</h5>
                        <p>a/n Action Figure</p>
                        <b><p>Total Pembayaran: Rp. {convertToRupiahFormat(this.state.totalBayar)}</p></b>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='bottomContent w-50'>
                      <div>
                          <p>Silahkan lakukan pembayaran ke nomor yang ada diatas sesuai dengan metode pembayaran yang telah dipilih</p>
                          <hr></hr>
                      </div>
                      <div>
                          <p>Anda sudah melakukan pembayaran? Silahkan input no transaksi/ref anda!</p>
                          <Form onSubmit={handleSubmitPembayaran}>
                              <Form.Group className="mb-3 d-flex justify-content-center" controlId="formNoRef">
                                  <Form.Control className='w-50 text-center' name="trx-no-ref" type="text" placeholder="Enter transaction number" />
                              </Form.Group>
                                <Button className="buttonUpload" variant="primary" type="submit">
                                  Submit
                              </Button>
                          </Form>
                      </div>
                  </div>
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

