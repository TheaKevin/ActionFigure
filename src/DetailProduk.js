import React, { Component } from 'react'

export default class DetailProduk extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            stok: 0,
            nama: "",
            detail: "",
            harga: 0,
            id: "",
            gambar: require("./assets/luffy.png")
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/products/1")
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                stok: json.stok,
                nama: json.nama,
                detail: json.detail,
                harga: json.harga,
                id: json.id,
                gambar: require("./assets/"+json.gambar)
            });
        });
    }

    render() {
        return (
            <div className='mx-3'>
                <div>Detail Produk</div>
                <div className='d-flex flex-row'>
                    <img className='me-3' src={this.state.gambar} alt={this.state.gambar} style={{width: "300px", height: "300px"}} />
                    <div className='d-flex flex-column'>
                        <div style={{fontWeight: "700", fontSize: "24px", lineHeight: "28px"}}>{this.state.nama}</div>
                        <div style={{fontWeight: "400", fontSize: "14px", lineHeight: "17px"}}>{this.state.detail}</div>
                        <div style={{fontWeight: "400", fontSize: "14px", lineHeight: "17px"}}>{this.state.stok}</div>
                        <div style={{fontWeight: "700", fontSize: "36px", lineHeight: "44px"}}>Rp. {this.state.harga}</div>
                    </div>
                </div>
            </div>
        )
    }
}
