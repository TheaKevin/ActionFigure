import axios from 'axios';
import React, { Component } from 'react'
import { Breadcrumb, Button, Form } from 'react-bootstrap';

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
                <h2 className='mb-3'>Detail Produk</h2>
                <Breadcrumb className='mb-5 breadcrumb'>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>{this.state.nama}</Breadcrumb.Item>
                </Breadcrumb>
                <div className='d-flex'>
                  <div className='container-fluid'>
                    <div className='row justify-content-left gap-3'>
                      <div className='col-xl-3 d-flex justify-content-center border'
                      style={{
                          height: "200px",
                          backgroundColor: "#FFC107",
                          borderRadius: "10px",
                          overflow:'hidden'
                      }}>
                          <img src={this.state.gambar}
                              alt={this.state.gambar}
                              />
                      </div>
                      <div className='col-xl-5 d-flex flex-column justify-content-between'>
                          <div>
                              <div className='mb-2' style={{
                                  fontWeight: "500",
                                  fontSize: "18px",
                                  lineHeight: "28px"
                              }}>{this.state.nama}</div>
                              <div style={{
                                  fontWeight: "800", 
                                  fontSize: "24px",
                                  lineHeight: "44px",
                                  marginBottom: "2rem"
                                }}>Rp {convertToRupiahFormat(this.state.harga)}</div>
                              <div style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  whiteSpace: "pre-wrap"
                              }}>{this.state.detail}</div>
                          </div>
                      </div>
                      <div className='col-xl-3 d-flex justify-content-center detail-product-input'>
                        <Form onSubmit={(e) => this.submit(e)} className="w-100">
                          <Form.Group className='w-100 d-flex flex-column justify-content-center' style={{color: "white"}}>
                              <div>Total Barang : </div>
                              <label className='mb-2' style={{fontWeight: "800"}}>{this.state.stok} stock left</label>
                              <div className='d-flex gap-3 align-items-center'>
                                  <button
                                      type='button'
                                      className={"btn btn-outline-light"}
                                      onClick={() => this.minus()}>
                                      -
                                  </button>

                                  <Form.Control
                                      type="number"
                                      name='jumlahBarang'
                                      min={1}
                                      max={this.state.stok}
                                      value={this.state.jumlahBarang}
                                      readOnly
                                      required
                                      style={{textAlign: "center"}}
                                  />

                                  <button
                                      type='button'
                                      className={"btn btn-outline-light"}
                                      onClick={() => this.plus()}>
                                      +
                                  </button>
                              </div>
                          </Form.Group>
                          <Form.Group className='mt-3 w-100 d-flex flex-column justify-content-left gap-3'>
                              <Button variant='outline-pertama' type='submit'>+ Keranjang</Button>

                              <Button variant='pertama' type='button'
                              onClick={() => this.beliLangsung()}>Beli Langsung</Button>
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
