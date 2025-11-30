import { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 5;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const { data } = await productAPI.getAll(page, limit);
            setProducts(data.products || []);
            // Calculate total pages (you may need to get total count from backend)
            // For now, we'll show next if we got full page
            if (data.products && data.products.length === limit) {
                setTotalPages(page + 1);
            } else {
                setTotalPages(page);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Products</h1>
            </div>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">No products available</div>
            ) : (
                <>
                    <div className="products-horizontal">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>

                        <span className="page-info">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="pagination-btn"
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </>
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}