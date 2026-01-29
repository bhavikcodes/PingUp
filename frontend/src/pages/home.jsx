import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, TextField, Menu, MenuItem, Typography, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../contexts/authContext.jsx';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState("");
    const {addToUserHistory} = useContext(AuthContext);
    
    const userName = localStorage.getItem("userName") || "User";
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewHistory = () => {
        handleMenuClose();
        alert("History feature coming soon!");
    };

    const handleLogout = () => {
        handleMenuClose();
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/");
    };

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            setError("Please enter a meeting code");
            return;
        }
        setError("");
        // await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`);
    }

    return (
        <>
            <div className="homeNavBar">
                <div className="navHeader">
                    <h2>PingUp</h2>
                </div>

                <div className="navRight">
                    <span className="welcomeText">Welcome,  <span id='un'>{userName}</span></span>
                    <button 
                        className="menuButton"
                        onClick={handleMenuOpen}
                        aria-label="menu"
                    >
                        <MoreVertIcon sx={{ color: 'white' }} />
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleViewHistory}>History</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div className="meetContent">
                        <span className="mobileWelcomeText">Welcome, {userName}</span>
                        <h2>High-quality video calls anytime, anywhere.</h2>

                        <div className="meetInputGroup">
                            <TextField 
                                onChange={e => {
                                    setMeetingCode(e.target.value);
                                    setError("");
                                }} 
                                id="outlined-basic" 
                                label="Meeting Code" 
                                variant="outlined"
                                className="meetInput"
                                value={meetingCode}
                            />
                            <Button onClick={handleJoinVideoCall} variant='contained' className="joinButton">
                                Join
                            </Button>
                        </div>

                        {error && (
                            <Typography sx={{ color: '#FF6B6B', mt: 1.5, fontSize: '0.95rem', fontWeight: 500 }}>
                                ⚠️ {error}
                            </Typography>
                        )}
                    </div>
                </div>
                <div className='rightPanel'>
                    <img src='/logo3.png' alt="Video calling illustration" />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)