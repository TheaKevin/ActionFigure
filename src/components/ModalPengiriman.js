import React, { Component } from 'react'
import './checkout.css'
import JNE from "../assets/JNE.png"
import JNT from "../assets/JNT.png"
import SiCepat from "../assets/SiCepat.png"

export default class ModalPengiriman extends Component {
  render() {
    const{setPengiriman} = this.props
    return (
    <div>
    <div className="daftarProduk" onClick={()=> setPengiriman("JNE Reguler",JNE,27000)}>
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-2 daftarProduk-thumbnail">
                    <img src={JNE}></img>
                </div>
                <div className="col-lg-5 daftarProduk-desc">
                    <p>JNE Reguler</p>
                </div>
                <div className="col-lg-4 daftarProduk-desc">
                    <p>Rp. 27.000</p>
                </div>
            </div>
        </div>
    </div>

    <div className="daftarProduk" onClick={()=>setPengiriman("SiCepat REG",SiCepat,30000)}>
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-2 daftarProduk-thumbnail">
                    <img src={SiCepat}></img>
                </div>
                <div className="col-lg-5 daftarProduk-desc">
                    <p>SiCepat REG</p>
                </div>
                <div className="col-lg-4 daftarProduk-desc">
                    <p >Rp. 30.000</p>
                </div>
            </div>
        </div>
    </div>

    <div className="daftarProduk" onClick={()=>setPengiriman("JNT Reguler",JNT,32000)}>
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-2 daftarProduk-thumbnail">
                    <img src={JNT}></img>
                </div>
                <div className="col-lg-5 daftarProduk-desc">
                    <p>JNT Reguler</p>
                </div>
                <div className="col-lg-4 daftarProduk-desc">
                    <p >Rp. 32.000</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
  }
}
