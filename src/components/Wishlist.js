import React, { useEffect, useState } from "react"
import axios from 'axios'
import { InputGroup, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Wishlist({setIdProduk}) {
    const [wishlists, setWishlists] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        getAllWishlist();
    }, [])

    const getAllWishlist = () => {
        axios.get(`http://localhost:3001/wishlist`)
        .then(res => {
            const wishlist = res.data;
            setWishlists(wishlist);
        })
    }

    const changePage = (id) => {
        setIdProduk(id);
        window.location.href = "#/DetailProduk/"+id;
    }

    const filterWishlist = (e) => {
        console.log(e.target.value)
        setSearchInput(e.target.value)
        console.log(searchInput)
    }

    return (
        <>
        <div className="search-product">
            <h2>Wishlist</h2>
            <InputGroup>
            <Form.Control
                placeholder="Find your desired wishlist here"
                aria-label="Find your desired wishlist here"
                aria-describedby="basic-addon2"
                name="search-input"
                onChange={(e) => filterWishlist(e)}
            />
            <Button variant="outline-secondary" id="button-addon2">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Button>
            </InputGroup>
        </div>
        <div className="product-list container-fluid">
            <div className="row w-100">
            {
                wishlists.filter(wishlist => wishlist.nama.includes(searchInput)).map(filteredNama => (
                <a onClick={() => changePage(filteredNama.id)} key={filteredNama.id} className="product-card col-xl-3 col-lg-4 col-sm-12 col-md-8">
                    <div className="product-thumbnail">
                    <img src={require('../assets/'+filteredNama.gambar)} alt={filteredNama.gambar}></img>
                    </div>
                    <div className="product-summary">
                    <div>
                        <h3>{filteredNama.nama}</h3>
                        <p className="product-price"> Rp {convertToRupiahFormat(filteredNama.harga)}</p>
                        <p className="product-description">{filteredNama.detail}</p>
                    </div>
                    </div>
                </a>
                ))
            }
            </div>
        </div>
        </>
    );
}

const convertToRupiahFormat = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default Wishlist;
