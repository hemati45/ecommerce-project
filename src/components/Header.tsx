import { Link } from 'react-router';
import { Login } from '../init/Login';
import type { UserState } from '../types/types';
import "./Header.css";


type HeaderProps = {
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
    setSearchQuery: (query: string) => void; 
    searchQuery: string;
    handleSearch: (query: string) => void;
    userState: UserState;
};

export function Header({ cart, setSearchQuery, searchQuery, handleSearch, userState }: HeaderProps) {
    let totalQuantity = 0;
    for (const item of cart) {
        totalQuantity += item.quantity;
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(searchQuery);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearchClick();
        }
    };
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img className="logo" src="images/logo-white.png" alt="Logo" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Mobile Logo" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
                    <button className="search-button" onClick={handleSearchClick}>
                        <img className="search-icon" src="images/icons/search-icon.png" alt="Search Icon" />
                    </button>
                </div>

                <div className="right-section">       
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>
                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart Icon" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        {/* <div className="cart-text">Cart</div>  */}
                    </Link>                  
                    <Login userState={userState}></Login>            
                </div>   
            </div>
        </>
    );
}
