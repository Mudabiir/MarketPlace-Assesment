import { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        productAPI.getAll().then(({ data }) => {
            // Backend returns { products: [...] }
            setProducts(data.products || []);
        }).catch(err => {
            console.error('Failed to fetch products:', err);
            setProducts([]);
        });
    }, []);

    return (
        <div className="home-container">
            <h1>All Products</h1>
            <div className="product-grid">
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                ))}
            </div>
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}