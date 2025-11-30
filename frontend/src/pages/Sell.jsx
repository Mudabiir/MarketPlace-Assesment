import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import './Sell.css';

export default function Sell() {
    const [form, setForm] = useState({ name: '', price: '', imageUrls: [''] });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productAPI.create(form);
            setMessage('Product created successfully!');
            setTimeout(() => navigate('/my-products'), 1500);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Failed to create product');
        }
    };

    const addImageUrl = () => {
        setForm({ ...form, imageUrls: [...form.imageUrls, ''] });
    };

    const updateImageUrl = (index, value) => {
        const newUrls = [...form.imageUrls];
        newUrls[index] = value;
        setForm({ ...form, imageUrls: newUrls });
    };

    return (
        <div className="sell-container">
            <div className="sell-card">
                <h2>Sell a Product</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                    />
                    <div className="image-inputs">
                        <label>Product Images (URLs):</label>
                        {form.imageUrls.map((url, i) => (
                            <input
                                key={i}
                                type="url"
                                placeholder={`Image URL ${i + 1}`}
                                value={url}
                                onChange={(e) => updateImageUrl(i, e.target.value)}
                                required
                            />
                        ))}
                        <button type="button" onClick={addImageUrl} className="btn-secondary">+ Add Image</button>
                    </div>
                    <button type="submit" className="btn-primary">Create Product</button>
                </form>
            </div>
        </div>
    );
}