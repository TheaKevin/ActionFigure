import React from 'react'
import './pembayaran.css'
import BSIM from '../assets/BSIM.png'
import BSIMSyariah from '../assets/BSIMSyariah.png'
import Mandiri from '../assets/Mandiri.png'
import BCA from '../assets/BCA.png'

export default function PilihPembayaran() {
  return (
    <div>
        <h2>Pilih Pembayaran</h2>
        <br></br>

        <div className='onePage'>
            <div className='onePageContainer'>
                <div className='onePageContent'>
                    <h5>Bank Transfer</h5>
                    <br></br>
                    <div className='ListTransferContent withPadding'>
                        <img src={BSIM} alt="BSIM"></img>
                    </div>
                    <br></br>
                    <div className='ListTransferContent'>
                        <img src={BSIMSyariah} alt="BSIMSyariah"></img>
                    </div>
                    <br></br>
                    <div className='ListTransferContent withPadding'>
                        <img src={Mandiri} alt="Mandiri"></img>
                    </div>
                    <br></br>
                    <div className='ListTransferContent withPadding'>
                        <img src={BCA} alt="BCA"></img>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    </div>
  )
}
