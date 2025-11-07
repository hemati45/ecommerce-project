
import React, { useState } from "react"
import { Dialog, DialogActions, DialogContent, Button, TextField } from '@mui/material';
import type { UserState } from '../types/types';
import "./Login.css"

type LoginProps = {
 userState : UserState
};
export function Login({userState} : LoginProps) {

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("pass");
    const [error, setError] = useState<string | null>(null);
    

    const authenticateUser = (username: string, password: string) => {
        return username === "afshin" && password === "pass"
    };
    const handleLogin = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        userState.setUsername("");
        setError("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userState.username || !password) {
            setError("Both fields are required");
            return;
        }
        try {
            if (authenticateUser(userState.username, password)) {
                userState.setIsLoggedIn(true);
                userState.setUserImage('../../public/images/user.png');
                setError(null);
                console.log("User authenticated successfully.");
                handleClose();
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            setError("An error occurred during authentication");
            console.error("Authentication error:", error);
        }


    };

    return (
        <div className="login">
            {!userState.isLoggedIn ? (
                <div >
                    <button className="login-link" onClick={handleLogin}>
                        <span className="login-text">Login</span>
                    </button>
                    <Dialog open={open} onClose={handleClose}>
                        {/* <DialogTitle>Login</DialogTitle> */}
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userState.username}
                                    onChange={(e) => userState.setUsername(e.target.value)}
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
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} className="login-bttn" >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="login-bttn" >
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : (
                <div>
                    <img className="profile-image" src={userState.userImage} alt={userState.username} />
                </div>
            )}
        </div>
    )
}