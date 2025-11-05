
import { useCallback } from "react";
import { formatMoney } from "../../utils/money.js";
import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOption({ deliveryOptions, item, loadCart }) {
    //useCallback helps to memorize the function and prevent unnecessary re-creations on each render
   const updateDeliveryOption = useCallback(async (optionId) => {
        try {
            await axios.put(`/api/cart-items/${item.productId}`, {
                deliveryOptionId: optionId
            });
            await loadCart();
        } catch (error) {
            console.error('Error updating delivery option:', error);
        }
    }, [item.productId, loadCart]); // Recreate function only when item.productId or loadCart changes



    return (

        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((option) => {
                let priceString = 'FREE Shipping';
                if (option.priceCents > 0) {
                    priceString = `${formatMoney(option.priceCents)} - Shipping`;
                }               

                return (
                    <div key={option.id} className="delivery-option" onClick={() => updateDeliveryOption(option.id)}>
                        <input type="radio"
                            onChange={() => { }}
                            checked={option.id === item.deliveryOptionId}
                            className="delivery-option-input"
                            name={`delivery-option-${item.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs().add(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}