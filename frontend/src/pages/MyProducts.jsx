import { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import './MyProducts.css';

export default function MyProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productAPI.getMine().then(({ data }) => {
            // Backend returns { products: [...] }
            setProducts(data.products || []);
        }).catch(err => {
            console.error('Failed to fetch my products:', err);
            setProducts([]);
        });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product?')) {
            await productAPI.delete(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="my-products-container">
            <h1>My Products</h1>
            {products.length === 0 && <p>No products yet. Create one!</p>}
            <div className="product-grid">
                {products?.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrls[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className="price">${product.price}</p>
                        <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}