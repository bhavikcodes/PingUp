import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const history = await getHistoryOfUser();
                setMeetings(Array.isArray(history) ? history : []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                setError("Failed to load meeting history");
                setMeetings([]);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <div>
            <IconButton onClick={() => {
                routeTo("/home")
            }}>
                <HomeIcon />
            </IconButton>
            
            {loading && <Typography sx={{ p: 2 }}>Loading meeting history...</Typography>}
            
            {error && <Typography color="error" sx={{ p: 2 }}>{error}</Typography>}
            
            {!loading && meetings.length === 0 && !error && (
                <Typography sx={{ p: 2 }} color="text.secondary">
                    No meeting history found.
                </Typography>
            )}
            
            {!loading && meetings.length > 0 && meetings.map((e, i) => {
                return (
                    <Card key={i} variant="outlined" sx={{ mb: 2, ml: 2, mr: 2 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {e.meetingCode}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Date: {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}