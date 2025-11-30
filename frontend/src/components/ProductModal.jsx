import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-images">
                    {product.imageUrls.map((url, i) => (
                        <img key={i} src={url} alt={product.name} />
                    ))}
                </div>
                <h2>{product.name}</h2>
                <p className="modal-price">${product.price}</p>
                <div className="seller-info">
                    <h3>Seller Information</h3>
                    <p><strong>Name:</strong> {product.seller?.name}</p>
                    <p><strong>Phone:</strong> {product.seller?.phoneNumber || product.seller?.email}</p>
                </div>
            </div>
        </div>
    );
}