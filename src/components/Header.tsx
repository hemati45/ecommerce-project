import { useState } from 'react';
import { Link } from 'react-router';
import "./header.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

type HeaderProps = { 
    cart: {
        productionId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
    setSearchQuery: (query: string) => void; // Function to update search query
    searchQuery: string;
    handleSearch: (query: string) => void;
};

export function Header({cart, setSearchQuery, searchQuery, handleSearch }: HeaderProps) {
    let totalQuantity = 0;
    for (const item of cart) {
        totalQuantity += item.quantity;
    }

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUsername("");  
        setError(""); 
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!username || !password) {
            setError("Both fields are required");
            return;
        }
        console.log("Logging in with:", { username, password });
        handleClose();
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

     const handleSearchClick = () => {
        handleSearch(searchQuery);  // Trigger the search in parent component
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
                    <input className="search-bar" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
                    <button className="search-button" onClick={handleSearchClick}>
                        <img className="search-icon" src="images/icons/search-icon.png" alt="Search Icon" />
                    </button>
                </div>

                <div className="right-section">
                    <button className="login-link header-link" onClick={handleLogin}>
                        <span className="orders-text">Login</span>
                    </button>

                    {/* Login Dialog */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message */}
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} className="orders-text">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="orders-text">
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart Icon" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </>
    );
}
