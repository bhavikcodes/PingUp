import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/authContext.jsx";
import { Snackbar } from "@mui/material";

// 🌙 Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D97500",
    },
    background: {
      default: "#141414",
      paper: "#242020",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        console.log(result);
        setUsername("");
        setPassword("");
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password) ;
        console.log(result);
        setName("");
        setUsername("");
        setPassword("");
        if(result != "All fields are required."){
          setOpen(true);
          setMessage(result);
        }
        if(result === "All fields are required."){
           setError("All fields are required.");
        }else{
            setError("");
        }
        if(result != "All fields are required."){
          setFormState(0);
        }
      }
    } catch (err) {
      let message = err.response?.data?.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* CENTERED CONTAINER */}
      <Grid
        container
        sx={{ minHeight: "100vh" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={11} sm={8} md={4}>
          <Paper elevation={6} sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {formState === 0 ? "Login" : "Sign Up"}
              </Typography>

              {/* TOGGLE */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant={formState === 0 ? "contained" : "outlined"}
                  onClick={() => setFormState(0)}
                >
                  Login
                </Button>
                <Button
                  variant={formState === 1 ? "contained" : "outlined"}
                  onClick={() => setFormState(1)}
                >
                  Sign Up
                </Button>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    height: 72, // reserves space
                    opacity: formState === 1 ? 1 : 0,
                    pointerEvents: formState === 1 ? "auto" : "none",
                    transition: 'opacity 0.25s ease-in-out',

                  }}
                >
                  <TextField
                    margin="normal"
                    required={formState === 1}
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                  <Typography sx={{ color: "error.main", mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
                  onClick={handleAuth}
                >
                  {formState === 0 ? "Login" : "Register"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
