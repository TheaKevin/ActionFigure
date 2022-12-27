import React, { useEffect, useState } from "react"
import axios from 'axios'
import { InputGroup, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function ProductList({setIdProduk}) {
  const [products, setProducts] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedSort, setSelectedSort] = useState("")
  const [isNewest, setIsNewest] = useState(false)

  useEffect(() => {
    getAllProduct();
  }, [])

  const getAllProduct = () => {
    axios.get(`http://localhost:3001/products`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const getNewestProduct = () => {
    setIsNewest(!isNewest)
    setSelectedSort("")
    isNewest ? getAllProduct() :
    axios.get(`http://localhost:3001/products?_sort=tanggal&_order=desc`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const getPriceLowToHigh = () => {
    axios.get(`http://localhost:3001/products?_sort=harga&_order=asc`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const getPriceHighToLow = () => {
    axios.get(`http://localhost:3001/products?_sort=harga&_order=desc`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const getProductAToZ = () => {
    axios.get(`http://localhost:3001/products?_sort=nama&_order=asc`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const getProductZToA = () => {
    axios.get(`http://localhost:3001/products?_sort=nama&_order=desc`)
      .then(res => {
        const product = res.data;
        setProducts(product);
      })
  }

  const applySort = (selectedSort) => {
    setIsNewest(false)
    setSelectedSort(selectedSort)
    if (selectedSort === "") {
      getAllProduct()
    } else if (selectedSort === "1") {
      getPriceHighToLow()
    } else if (selectedSort === "2") {
      getPriceLowToHigh()
    } else if (selectedSort === "3") {
      getProductAToZ()
    } else {
      getProductZToA()
    }
  }

  const changePage = (id) => {
    setIdProduk(id);
    window.location.href = "#/DetailProduk/"+id;
  }

  const filterProduct = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <>
      <div className="search-product">
        <h2>Product List</h2>
        <InputGroup>
          <Form.Control
            placeholder="Find your desired product here"
            aria-label="Find your desired product here"
            aria-describedby="basic-addon2"
            name="search-input"
            onChange={(e) => filterProduct(e)}
          />
          <Button variant="outline-secondary" id="button-addon2" className="me-5">
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
        </InputGroup>
        <div className="sort-container">
          <label>Sort</label>
          <Button variant={isNewest ? "active": "outline-pertama"} onClick={() => getNewestProduct()}>Newest</Button>
          <Form.Select value={selectedSort} onChange={(e) => applySort(e.target.value)}>
            <option className="d-none">Please choose</option>
            <option value="1">Price (High to Low)</option>
            <option value="2">Price (Low to High)</option>
            <option value="3">Name (A-Z)</option>
            <option value="4">Name (Z-A)</option>
          </Form.Select>
        </div>
      </div>
      <div className="container-fluid">
        <div className="product-list">
          <div className="row w-100">
            {
              products.filter(product => product.nama.toLowerCase().includes(searchInput.toLocaleLowerCase())).map(filteredNama => (
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
      </div>
    </>
  );
}

const convertToRupiahFormat = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default ProductList;
