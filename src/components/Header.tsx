import { Link } from 'react-router'
import "./header.css"
import { useState } from 'react';
import LoginPopup from './LoginPopup';
type HeaderProps = {
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
}
export function Header({ cart }: HeaderProps) {
    let totalQuantity = 0;
    for (const item of cart) {
        totalQuantity += item.quantity;
    }
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img className="logo"
                            src="images/logo-white.png" />
                        <img className="mobile-logo"
                            src="images/mobile-logo-white.png" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>
                <div className="right-section">               
                    <button className="orders-link header-link" style={{background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer'}} onClick={() => setShowLogin(true)}>
                        <span className="orders-text">Login</span>
                    </button>
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
            <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    )
}