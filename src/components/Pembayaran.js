import React, { Component } from 'react'
import './pembayaran.css'
import axios from 'axios'

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

updateStatusCheckout = (id) => {
    axios.patch(`http://localhost:3001/checkouts/`+id, {
        status: "Bukti pembayaran diterima. Pembayaran sedang menunggu verifikasi oleh penjual",
        statusSummary: "Verifikasi Pembayaran"
      })
      .then(function (response) {
        alert("Bukti pembayaran diterima!")
      })
  }

render() {
    return (<div style={{paddingBottom:"1rem"}}>
        <h2>Pembayaran</h2>
        <br></br>
        <div className='onePage'>
            <div className='onePageContainer'>
                <div className='onePageContent'>
                    <br></br>
                    <h5>Bank Transfer</h5>
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
                
                <div className='bottomContent'>
                    <div>
                        <p>Silahkan lakukan pembayaran ke nomor yang ada diatas sesuai dengan metode pembayaran yang telah dipilih</p>
                        <hr></hr>
                    </div>
                    <div>
                        <p>Anda sudah melakukan pembayaran?</p>
                        <p>Silahkan unggah bukti pembayaran anda!</p>
                        <button className='buttonUpload' onClick={() => this.updateStatusCheckout(this.state.idCheckout)}>Unggah</button>
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

