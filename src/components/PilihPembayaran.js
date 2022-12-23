import React, { Component }  from 'react'
import './pembayaran.css'
import BSIM from '../assets/BSIM.png'
import BSIMSyariah from '../assets/BSIMSyariah.png'
import Mandiri from '../assets/Mandiri.png'
import BCA from '../assets/BCA.png'

function PilihPembayaran({setImg,setNoRekening})  {

const changePagetoPembayaran = (img,noRekening) => {
    setImg(img);
    setNoRekening(noRekening);
     window.location.href = "#/pembayaran/"+img+"/"+noRekening;
   }

    return (
        <div>
            <h2>Pilih Pembayaran</h2>
            <br></br>
    
            <div className='onePage'>
                <div className='onePageContainer'>
                    <div className='onePageContent'>
                        <br></br>
                        <h5>Bank Transfer</h5>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BSIM} alt="BSIM" onClick={() => changePagetoPembayaran(BSIM,"0052992389")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent'>
                            <img src={BSIMSyariah} alt="BSIMSyariah"  onClick={() => changePagetoPembayaran(BSIMSyariah,"0043219870")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={Mandiri} alt="Mandiri"  onClick={() => changePagetoPembayaran(Mandiri,"1234567890")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BCA} alt="BCA"  onClick={() => changePagetoPembayaran(BCA,"6040875857")}></img>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  export default PilihPembayaran
