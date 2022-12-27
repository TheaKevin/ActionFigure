import React, { Component }  from 'react'
import './pembayaran.css'
import BSIM from '../assets/BSIM.png'
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
                        <h5>Virtual Account</h5>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BSIM} alt="BSIM" onClick={() => this.changePagetoPembayaran(BSIM,"8528082114436410","Bank Sinarmas")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={Mandiri} alt="Mandiri"  onClick={() => this.changePagetoPembayaran(Mandiri,"89508082114436410","Bank Mandiri")}></img>
                        </div>
                        <br></br>
                        <div className='ListTransferContent withPadding'>
                            <img src={BCA} alt="BCA"  onClick={() => this.changePagetoPembayaran(BCA,"3901082114436410","Bank BCA")}></img>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}
  }

