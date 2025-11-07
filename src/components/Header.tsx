import { Link } from 'react-router';
import "./Header.css";
import { Login } from '../init/login';


type HeaderProps = {
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
    setSearchQuery: (query: string) => void; 
    searchQuery: string;
    handleSearch: (query: string) => void;
};
/* const authenticateUserAPI = async (username: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', { username, password });
        if (response.status === 200) {
            // Assume success if the status is 200
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error during authentication:", error);
        throw error;
    }
}; */
export function Header({ cart, setSearchQuery, searchQuery, handleSearch }: HeaderProps) {
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
                    <Login ></Login>            
                </div>   
            </div>
        </>
    );
}
