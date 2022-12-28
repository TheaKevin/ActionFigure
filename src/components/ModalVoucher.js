import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import './checkout.css'

export default class ModalVoucher extends Component {
  render() {
    const{setVoucher} = this.props
    return (
    <div>
    <div className="daftarProduk">
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-9 daftarProduk-descCustomWidth1">
                    <Form>
                        <input type="text" name="voucher" className="input"/>
                    </Form>
                </div>
                <div className="col-lg-3 daftarProduk-descCustomWidth2">
                    <button className='buttonTerapkan'>Terapkan</button>
                </div>
            </div>
        </div>
    </div>

    <div className="daftarProduk" onClick={()=> setVoucher("MERDEKA10K",10000)}>
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-6 daftarProduk-descCustomWidth1">
                    <p>MERDEKA10K</p>
                    <p className="textgrey">Hingga 17.09.2023</p>
                </div>
                <div className="col-lg-6 daftarProduk-descCustomWidth2">
                    <p >Rp. 10.000</p>
                </div>
            </div>
        </div>
    </div>

    <div className="daftarProduk" onClick={()=> setVoucher("MERDEKA20K",20000)}>
        <div className="popUp">
            <div className="row justify-content-center">
                <div className="col-lg-6 daftarProduk-descCustomWidth1">
                    <p>MERDEKA20K</p>
                    <p className="textgrey">Hingga 17.09.2023</p>
                </div>
                <div className="col-lg-6 daftarProduk-descCustomWidth2">
                    <p >Rp. 20.000</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
  }
}
