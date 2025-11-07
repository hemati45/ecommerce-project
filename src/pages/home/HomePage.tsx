
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css'
import { ProductGrid } from './ProductGrid';

type HomePageProps = {
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;

    }[];
    loadCart: () => Promise<void>; 
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
export function HomePage({ cart , loadCart}: HomePageProps) {
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
                <ProductGrid products={filteredProducts} loadCart={loadCart} />
            </div>
        </>
    )
}

