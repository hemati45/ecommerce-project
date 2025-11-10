
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, Divider, Typography } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material'; // Icons

export function ProfileMenu({ userState }) {
    const [anchorEl, setAnchorEl] = useState (null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };
    const handleManageProfile = () => {
        console.log('Navigate to manage profile');
        // redirect to the profile management page
        setAnchorEl(null); // Close the menu after clicking
    };

    const handleLogout = () => {
        userState.setIsLoggedIn(false);
        userState.setUsername("");
        userState.setUserImage("");

        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={userState.username || "Default Username"} >
                <img className="profile-image" src={userState.userImage} alt={userState.username} onClick={handleMenuClick} />
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <img className="user-profile-image" src={userState.userImage} alt={userState.username} />
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        {userState.username || 'Guest'}
                    </Typography>
                </div>

                {/* Divider */}
                <Divider />
                <MenuItem onClick={handleManageProfile}>
                    <AccountCircle style={{ marginRight: '8px' }} />
                    Manage Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ExitToApp style={{ marginRight: '8px' }} />
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}