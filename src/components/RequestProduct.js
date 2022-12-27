import { Form, Button } from "react-bootstrap"
import { Component } from "react"
import axios from "axios";

class RequestProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sumOfStock: 0,
      lastProductId: 0,
      value: ""
    };
  }
  
  render(){
    const handleAdd = () => {
      this.setState({sumOfStock : this.state.sumOfStock + 1}) 
    }

    const handleReduce = () => {
      if (this.state.sumOfStock > 0) 
        this.setState({sumOfStock : this.state.sumOfStock - 1}) 
    }

    // get latest product id
    const handleSubmitRequestProduct = (e) => {
      e.preventDefault();

      fetch("http://localhost:3001/products?_sort=id&_order=desc&_limit=1")
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                lastProductID: json.id + 1
            });
        });

      const formData = new FormData(e.currentTarget);

      axios.post('http://localhost:3001/products', {
        id: this.state.lastProductId,
        nama: formData.get("product-name"),
        detail: formData.get("product-desc"),
        harga: parseInt(this.state.value),
        stok: parseInt(formData.get("product-stock")),
        gambar: "luffy.png"
      })
      .then(function (response) {
        alert("Product has been requested!")
      })
      .catch(function (error) {
        alert("Request product failed!")
      });
    }

    
    const priceDelimiter = (event) => {
      this.setState({value: addCommas(removeNonNumeric(event.target.value))})
    }
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "")

    return(
      <>
        <h2 className="ps-4 pb-4">Request Product</h2>
        <div className="container-fluid">
          <div className="request-container">
            <Form onSubmit={handleSubmitRequestProduct}>
              <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control name="product-name" type="text" placeholder="Enter product name" />
              </Form.Group>
      
              <Form.Group className="mb-3" controlId="formProductDesc">
                <Form.Label>Product Description</Form.Label>
                <Form.Control name="product-desc" as="textarea" rows={5} placeholder="Enter product description" style={{whiteSpace: "pre-wrap"}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control name="product-price" type="text" placeholder="Enter product price" onChange={priceDelimiter} value={"Rp " + this.state.value}/>
              </Form.Group>
      
              <Form.Group className="mb-3" controlId="formProductDesc">
                <Form.Label>Stock of Product</Form.Label>
                <Button variant="outline-secondary ms-3" onClick = {()=> handleReduce()}>-</Button>
                <Form.Control type="number" name="product-stock" min={1} value={this.state.sumOfStock} placeholder="Enter product stock" style={{textAlign: "center"}} className="mb-2" readOnly required/>
                <Button variant="outline-success" onClick = {() => handleAdd()}>+</Button>
              </Form.Group>
      
              <Button className="mt-3" variant="pertama" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default RequestProduct