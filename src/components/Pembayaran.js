import React, { Component } from 'react'
import './pembayaran.css'
import BSIM from '../assets/BSIM.png'

export default class Pembayaran extends Component {
constructor(props){
    super(props);
    this.state = {
        img: props.img,
        noRekening: props.noRekening,
        totalBayar: props.totalBayar
    }
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
                        <b><p>Total Pembayaran: Rp. {this.state.totalBayar}</p></b>
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
                        <button className='buttonUpload'>Unggah</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

