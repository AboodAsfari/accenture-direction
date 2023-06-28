import React from "react";
import {
    Box, 
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Divider,
    Collapse,
    Alert,
} from "@mui/material";

import { SessionContext } from "./App";
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = (props) => {
    const {
        onClose,
        loadUser,
        openSignup,
    } = props;

    const sessionData = React.useContext(SessionContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);

    const handleLogin = () => {
        let user = sessionData.db.getUser(email);
        if (!user || user.password !== password) {
            setLoginError(true);
        } else {
            loadUser(user);
            onClose();
        }
    }

    return (
        <Box sx={{ ml: 15, mt: 15 }}>
            <Typography fontSize={40}> Welcome Back! </Typography>
            
            <Stack sx={{ width: "30%" }}>
                <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <TextField margin="dense" id="password" label="Password" type={ showPassword ? "text" : "password" }
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ endAdornment: 
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                { showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>,
                        style: { WebkitBoxShadow: "0 0 0 1000px transparent inset" }
                    }}
                />

                <Box sx={{ display:"flex", justifyContent: "end"}}>
                    <Button> Forgot Password? </Button>
                </Box>

                <Button variant="contained" onClick={handleLogin} sx={{ fontSize: 20, mt: 5 }}> Log In </Button>

                <Collapse in={loginError}>
                    <Alert severity="error" sx={{ mt: 2 }}
                        action= {
                            <IconButton color="inherit" size="small" onClick={() => setLoginError(false)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Incorrect email/password.
                    </Alert>
                </Collapse>

                <Divider sx={{ my: 5 }}> Or </Divider>

                <Stack spacing={2}>
                    <Button variant="contained" sx={{ fontSize: 20 }}> <GoogleIcon sx={{ position: "absolute", left: "20%" }} /> Log in with Google </Button>
                    <Button variant="contained" sx={{ fontSize: 20 }}> <FacebookIcon sx={{ position: "absolute", left: "20%" }} /> Log in with Facebook </Button>
                    <Box sx={{ display:"flex", justifyContent: "end"}}>
                        <Typography> Don't have an account? <Button onClick={() => { onClose(); openSignup(); }}> Sign up </Button></Typography>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default LoginPage;
