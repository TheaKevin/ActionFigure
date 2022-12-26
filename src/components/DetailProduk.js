import axios from 'axios';
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';

export default class DetailProduk extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            stok: 0,
            nama: "",
            detail: "",
            harga: 0,
            id: props.idProduk,
            gambar: require("../assets/luffy.png"),
            gambarProductForAddCart: "",
            jumlahBarang: 0,
            lastCartID: 0
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/products/"+this.state.id)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                stok: json.stok,
                nama: json.nama,
                detail: json.detail,
                harga: json.harga,
                id: json.id,
                gambar: require("../assets/"+json.gambar),
                gambarProductForAddCart: json.gambar,
                jumlahBarang: 1
            });
        });

        fetch("http://localhost:3001/carts?_sort=id&_order=desc&_limit=1")
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                lastCartID: json.id + 1
            });
        });
    }

    plus = () => {
        if (this.state.jumlahBarang < this.state.stok) {
            this.setState({
                jumlahBarang: this.state.jumlahBarang + 1
            });
        }
    }

    minus = () => {
        if (this.state.jumlahBarang > 1) {
            this.setState({
                jumlahBarang: this.state.jumlahBarang - 1
            });
        }
    }

    beliLangsung = () => {
        this.setState({
            stok: this.state.stok - this.state.jumlahBarang
        });

        fetch('http://localhost:3001/autoCheckout/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                jumlahBarang: this.state.jumlahBarang,
                product: {
                    id: this.state.id,
                    nama: this.state.nama,
                    detail: this.state.detail,
                    harga: this.state.harga,
                    stok: this.state.stok,
                    gambar: this.state.gambarProductForAddCart
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then(() => {
            window.location.href = "#/AutoCheckout";
        })
        .catch((err) => console.log(err));
    }

    submit = (e) => {
        e.preventDefault();

        this.validasiCarts();
    }

    validasiCarts = () => {
        let idCarts = 0;
        let jumlahBarang = 0;

        fetch('http://localhost:3001/carts?product.id='+this.state.id)
        .then((response) => response.json())
        .then((json) => {
            if(json.length != 0){
                idCarts = json[0].id
                jumlahBarang = json[0].jumlahBarang
            }
        })
        .then( () => {
            if(idCarts === 0) {
                this.postCarts();
            } else {
                this.patchCarts(idCarts, jumlahBarang);
            }
        });
    }

    postCarts = () => {
        fetch('http://localhost:3001/carts', {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.lastCartID,
                jumlahBarang: this.state.jumlahBarang,
                product: {
                    id: this.state.id,
                    nama: this.state.nama,
                    detail: this.state.detail,
                    harga: this.state.harga,
                    stok: this.state.stok,
                    gambar: this.state.gambarProductForAddCart
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(alert("Barang berhasil dimasukkan kedalam cart!"))
        .catch((err) => console.log(err));
    }

    patchCarts = (idCarts, jumlahBarang) => {
        axios.patch(`http://localhost:3001/carts/`+idCarts, {
            jumlahBarang: jumlahBarang+this.state.jumlahBarang
        })
        .then(alert("Barang berhasil dimasukkan kedalam cart!"))
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className='mx-5' style={{paddingBottom:"1rem"}}>
                <h1 className='mb-3'>Detail Produk</h1>

                <div className='d-flex flex-row mb-5'>
                    <div className='me-4 d-flex justify-content-center'
                    style={{
                        width: "300px",
                        height: "300px",
                        backgroundColor: "#FFC107",
                        borderRadius: "10px"
                    }}>
                        <img src={this.state.gambar}
                            alt={this.state.gambar}
                            style={{height: "300px"}} />
                    </div>
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
                    <Form onSubmit={(e) => this.submit(e)} className='d-flex flex-row justify-content-evenly' style={{
                        backgroundColor: "#FFC107",
                        borderRadius: "10px",
                        width: "565px",
                        height: "131px"
                    }}>
                        <Form.Group className='w-50 d-flex flex-column justify-content-center' style={{color: "white"}}>
                            <div className='mb-2'>Total Barang : </div>
                            <div className='w-100 d-flex'>
                                <button
                                    type='button'
                                    className={"btn btn-outline-light w-25 mx-auto"}
                                    onClick={() => this.minus()}>
                                    -
                                </button>

                                <Form.Control
                                    type="number"
                                    name='jumlahBarang'
                                    className='mx-3'
                                    min={1}
                                    max={this.state.stok}
                                    value={this.state.jumlahBarang}
                                    readOnly
                                    required
                                />

                                <button
                                    type='button'
                                    className={"btn btn-outline-light w-25 mx-auto"}
                                    onClick={() => this.plus()}>
                                    +
                                </button>
                            </div>
                        </Form.Group>
                        <Form.Group className='w-25 h-100 d-flex flex-column justify-content-evenly'>
                            <Button style={{
                                backgroundColor: "#467FD0",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                borderRadius: "20px",
                                textAlign: "center",
                                border: "none",
                                color: "white"
                            }} type='submit'>+ Keranjang</Button>

                            <Button style={{
                                backgroundColor: "#467FD0",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                borderRadius: "20px",
                                textAlign: "center",
                                border: "none",
                                color: "white"
                            }} type='button'
                            onClick={() => this.beliLangsung()}>Beli Langsung</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}
