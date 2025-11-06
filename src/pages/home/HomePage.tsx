
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';
import './HomePage.css'

type HomePageProps = {
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;

    }[];
};
type Product = {
    id: string;
    name: string;
    keywords: string[];
    image: string;
    rating: {
        stars: number;
        count: number;
    };
    priceCents: number;
    createdAt: string;
    updatedAt: string;
};
export function HomePage({ cart }: HomePageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        loadProducts();
        // dependency array is empty, so this runs only once when the component mounts
    }, []);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);  // Update filtered products based on the query
    };
    return (
        <>
            <title>ecommerce-project</title>
            <Header cart={cart} setSearchQuery={setSearchQuery} searchQuery={searchQuery} handleSearch={handleSearch} />
            <div className="home-page">
                <div className="products-grid">
                    {filteredProducts.map((product) => {
                        return (
                            <div key={product.id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image" src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    {formatMoney(product.priceCents)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

