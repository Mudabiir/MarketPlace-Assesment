import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.imageUrls.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.imageUrls.length - 1 : prev - 1
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={20} />
                </button>

                {/* Image Carousel */}
                <div className="modal-carousel">
                    <img
                        src={product.imageUrls[currentImageIndex]}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                    />

                    {product.imageUrls.length > 1 && (
                        <>
                            <button className="carousel-btn prev" onClick={prevImage}>
                                <ChevronLeft size={24} />
                            </button>
                            <button className="carousel-btn next" onClick={nextImage}>
                                <ChevronRight size={24} />
                            </button>

                            <div className="carousel-indicators">
                                {product.imageUrls.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Compact Product Info */}
                <div className="modal-info">
                    <div className="info-header">
                        <h2>{product.name}</h2>
                        <div className="price-tag">Rs {product.price}</div>
                    </div>

                    <div className="seller-details">
                        <div className="detail-row">
                            <span className="label">Seller</span>
                            <span className="value">{product.seller?.name || 'Unknown'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Contact</span>
                            <span className="value">{product.seller?.phoneNumber || product.seller?.email || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}