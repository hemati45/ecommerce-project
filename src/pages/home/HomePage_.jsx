import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductGrid'
import './HomePage.css'


export function HomePage({ products, cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        // dependency array is empty, so this runs only once when the component mounts
    }, []);

    return (
        <>
            <title>ecommerce-project</title>
            <Header cart={cart} />
            <div className="home-page">
                <ProductGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}

