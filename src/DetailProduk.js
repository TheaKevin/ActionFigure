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
            <div className='mx-5' style={{width: "65%"}}>
                <h1 className='mb-3'>Detail Produk</h1>

                <div className='d-flex flex-row mb-5'>
                    <img className='me-4'
                        src={this.state.gambar}
                        alt={this.state.gambar}
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "#FFC107",
                            borderRadius: "10px"
                        }} />
                    <div className='d-flex flex-column justify-content-between'>
                        <div>
                            <div className='mb-2' style={{
                                fontWeight: "700",
                                fontSize: "24px",
                                lineHeight: "28px"
                            }}>{this.state.nama}</div>
                            <div style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "17px"
                            }}>{this.state.detail}</div>
                        </div>
                        <div>
                            <div className='mb-1' style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "17px"
                            }}>Total Stok : {this.state.stok}</div>
                            <div style={{
                                fontWeight: "700", 
                                fontSize: "36px",
                                lineHeight: "44px"
                            }}>Rp. {this.state.harga}</div>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-row justify-content-center'>
                    <div className='d-flex flex-row justify-content-evenly' style={{
                        backgroundColor: "#FFC107",
                        borderRadius: "10px",
                        width: "565px",
                        height: "131px"
                    }}>
                        <div className='w-50 d-flex align-items-center'>Total Barang : - 1 + </div>
                        <div className='w-25 h-100 d-flex flex-column justify-content-evenly'>
                            <button style={{
                                backgroundColor: "#467FD0",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                borderRadius: "20px",
                                textAlign: "center",
                                border: "none",
                                color: "white"
                            }}>+ Keranjang</button>

                            <button style={{
                                backgroundColor: "#467FD0",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                borderRadius: "20px",
                                textAlign: "center",
                                border: "none",
                                color: "white"
                            }}>Beli Langsung</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
