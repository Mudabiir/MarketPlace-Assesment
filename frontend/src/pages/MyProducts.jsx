import { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import './MyProducts.css';

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productAPI.getMine().then(({ data }) => {
            setProducts(data.products || []);
        }).catch(err => {
            console.error('Failed to fetch my products:', err);
            setProducts([]);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product?')) {
            try {
                await productAPI.delete(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error('Failed to delete product:', err);
            }
        }
    };

    return (
        <div className="my-products-container">
            <div className="header">
                <h1>My Products</h1>
            </div>

            {loading ? (
                <div className="loading">Loading your products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <p>No products listed yet</p>
                    <a href="/sell" className="btn-primary">List your first product</a>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrls[0]} alt={product.name} />
                            <div className="card-info">
                                <h3>{product.name}</h3>
                                <p className="price">Rs {product.price}</p>
                            </div>
                            <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}