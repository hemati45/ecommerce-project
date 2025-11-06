import { useState } from "react"
import { useTranslation } from "react-i18next";
import axios from "axios"
import { formatMoney } from "../../utils/money"

export function Product({ product, loadCart }) {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = async (product) => {
        try {
            await axios.post('/api/cart-items', {
                productId: product.id,
                quantity //shorthand for quantity: quantity
            });
            await loadCart();
            setAddedToCart(true);
            setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    return (
        <div className="product-container" data-testid="product-container">

            <div className="product-image-container">
                <img className="product-image" data-testid="product-image" src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars-image"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
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

            <div className="added-to-cart" style={{
                opacity: addedToCart ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out', // Smooth transition
            }}>
                <img src="images/icons/checkmark.png" />
                {t('added')}
            </div>

            <button data-testid="add-to-cart-button" className="add-to-cart-button button-primary" onClick={() => addToCart(product)}>

                {t('add_to_cart')}
            </button>
        </div>
    )
}
