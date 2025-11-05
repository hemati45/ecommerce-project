import { DeliveryOption } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";
import { useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
     const deleteCartItem = useCallback(async (item) => {
         try {
             await axios.delete(`/api/cart-items/${item.productId}`);
             await loadCart();
         } catch (error) {
             console.error('Error deleting cart item:', error);
         }
     }, [loadCart]);
              
    return (
        <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((item) => {
                const selectedDeliveryOption = deliveryOptions.find(option => option.id === item.deliveryOptionId);
           
                return (
                    <div key={item.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs().add(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={item.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {item.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(item.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{item.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary" onClick={() => deleteCartItem(item)}>
                                        Delete
                                    </span>
                                </div>
                            </div>
                            <DeliveryOption deliveryOptions={deliveryOptions} item={item} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

