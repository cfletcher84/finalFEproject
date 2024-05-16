import React, { Component } from 'react';
import { ListGroup, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import ProductForm from './ProductForm';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProductId: null,
    };
    this.selectProduct = this.selectProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products`);
      this.setState({ products: response.data });
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }

  selectProduct(id) {
    console.log(id);
    this.setState({ selectedProductId: id });
  }

  async deleteProduct(id) {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${id}`);
      await this.fetchProducts();
      this.setState({ selectedProductId: null }); // Clear selected product after deletion
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  }

  render() {
    const { products, selectedProductId } = this.state;

    return (
      <div>
        <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
          {products.map((product) => (
            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
              <span onClick={() => this.selectProduct(product.id)}>{product.name}</span>
              <div>
                <Button as={Link} to={`/edit-product/${product.id}`} variant="primary">Edit</Button>
                <Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {selectedProductId && (
          <Container fluid className='d-flex flex-column align-items-center'>
            <h2>Selected Product: {selectedProductId}</h2>
            <ProductDetails productId={selectedProductId} />
          </Container>
        )}
      </div>
    );
  }
}

export default ProductList;