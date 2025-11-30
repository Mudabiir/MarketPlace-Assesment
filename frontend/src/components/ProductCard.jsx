import './ProductCard.css';

export default function ProductCard({ product, onClick }) {
    return (
        <div className="product-card" onClick={onClick}>
            <img src={product.imageUrls[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
        </div>
    );
}