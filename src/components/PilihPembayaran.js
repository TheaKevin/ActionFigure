import React, { Component }  from 'react'
import './pembayaran.css'
import BSIM from '../assets/BSIM.png'
import BSIMSyariah from '../assets/BSIMSyariah.png'
import Mandiri from '../assets/Mandiri.png'
import BCA from '../assets/BCA.png'
import axios from 'axios'


// function PilihPembayaran({setImg,setNoRekening})  {
export default class PilihPembayaran extends Component {
    constructor(props){
        super(props);
        this.state = {
            idCheckout: props.idCheckout
        }
    }

    updateCheckout = (id, bank) => {
        axios.patch(`http://localhost:3001/checkouts/`+id, {
            bank: bank
          })
      }

    changePagetoPembayaran = (img,noRekening,bank) => {
        this.updateCheckout(this.state.idCheckout,bank);
        const{setImg,setNoRekening} = this.props;
        setImg(img);
        setNoRekening(noRekening);
        window.location.href = "#/pembayaran/"+this.state.idCheckout;
    }

    
render(){
    return (
        <div style={{paddingBottom:"1rem"}}>
            <h2>Pilih Pembayaran {this.state.idCheckout}</h2>
            <br></br>
    
            <div className='onePage'>
                <div className='onePageContainer'>
                    <div className='onePageContent'>
                        <br></br>
                        <h5>Bank Transfer</h5>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BSIM} alt="BSIM" onClick={() => this.changePagetoPembayaran(BSIM,"0052992389","Bank Sinarmas")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent'>
                            <img src={BSIMSyariah} alt="BSIMSyariah"  onClick={() => this.changePagetoPembayaran(BSIMSyariah,"0043219870","Bank Sinarmas Syariah")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={Mandiri} alt="Mandiri"  onClick={() => this.changePagetoPembayaran(Mandiri,"1234567890","Bank Mandiri")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BCA} alt="BCA"  onClick={() => this.changePagetoPembayaran(BCA,"6040875857","Bank BCA")}></img>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}
  }

