import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductModal from '../components/ProductModal';
import { productAPI } from '../utils/api';
import './MyProducts.css';

// Simple modal for delete confirmation
function ConfirmModal({ isOpen, onClose, onConfirm, children, showActions = false, confirmText = 'OK', cancelText = 'Cancel' }) {
    if (!isOpen) return null;
    // Use prefers-color-scheme to set modal background
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const modalBg = isDark ? '#23272f' : '#fff';
    const modalColor = isDark ? '#fff' : '#23272f';
    return (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="modal-content" style={{ background: modalBg, color: modalColor, padding: 24, borderRadius: 8, minWidth: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {children}
                {showActions && (
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button onClick={onClose} style={{ padding: '6px 16px' }}>{cancelText}</button>
                        <button onClick={onConfirm} style={{ padding: '6px 16px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 4 }}>{confirmText}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setDeleteId(null);
    };

    const handleModalConfirm = async () => {
        if (deleteId) {
            try {
                await productAPI.delete(deleteId);
                setProducts(products.filter(p => p.id !== deleteId));
            } catch (err) {
                console.error('Failed to delete product:', err);
            }
        }
        setModalOpen(false);
        setDeleteId(null);
    };

    // Open details modal
    const handleCardClick = (product) => {
        setSelectedProduct(product);
    };

    const handleDetailsModalClose = () => {
        setSelectedProduct(null);
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
                    <Link to="/sell" className="btn-primary">List your first product</Link>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(product)}>
                            <img src={product.imageUrls[0]} alt={product.name} />
                            <div className="card-info">
                                <h3>{product.name}</h3>
                                <p className="price">Rs {product.price}</p>
                            </div>
                            <button onClick={e => { e.stopPropagation(); handleDeleteClick(product.id); }} className="btn-delete">Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal isOpen={modalOpen} onClose={handleModalClose} onConfirm={handleModalConfirm} showActions confirmText="Delete" cancelText="Cancel">
                <h3>Delete Product</h3>
                <p>Are you sure you want to delete this product?</p>
            </ConfirmModal>

            {/* Product Details Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleDetailsModalClose}
                />
            )}
        </div>
    );
}