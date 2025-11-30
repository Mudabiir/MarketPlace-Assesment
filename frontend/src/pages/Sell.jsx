import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import './Sell.css';

export default function Sell() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [message, setMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        addFiles(selectedFiles);
    };

    const addFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
        setFiles(prev => [...prev, ...validFiles]);

        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]); // Cleanup
            return newPreviews.filter((_, i) => i !== index);
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            setMessage('Please upload at least one image');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        files.forEach(file => {
            formData.append('images', file);
        });

        try {
            await productAPI.create(formData);
            setMessage('Product created successfully!');
            setTimeout(() => navigate('/my-products'), 1500);
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.error || 'Failed to create product');
        }
    };

    return (
        <div className="sell-container">
            <div className="sell-card">
                <h2>Sell a Product</h2>
                {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Vintage Camera"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-modern"
                        />
                    </div>

                    <div className="form-group">
                        <label>Price (Rs)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            className="input-modern"
                        />
                    </div>

                    <div className="form-group">
                        <label>Product Images</label>
                        <div
                            className={`dropbox ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden-input"
                            />
                            <div className="dropbox-content">
                                <Upload className="dropbox-icon" />
                                <p>Drag & drop images here, or click to select</p>
                                <span className="dropbox-hint">Supports JPG, PNG, WebP</span>
                            </div>
                        </div>
                    </div>

                    {previews.length > 0 && (
                        <div className="preview-grid">
                            {previews.map((url, index) => (
                                <div key={index} className="preview-item">
                                    <img src={url} alt={`Preview ${index}`} />
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeFile(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit" className="btn-primary submit-btn">
                        List Item
                    </button>
                </form>
            </div>
        </div>
    );
}