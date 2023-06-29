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
import WavingHandIcon from '@mui/icons-material/WavingHand';

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
        <Box sx={{ ml: 15, mt: 10 }}>
            <Stack direction="row">
                <Typography fontSize={40} sx={{fontWeight: 700}}> Welcome Back! </Typography>
                <WavingHandIcon sx={{ fontSize: 40, mt: 1, ml: 2 }} />
            </Stack>

            <Stack sx={{ width: "30%", mt: 5 }}>
                <Typography fontSize={17}> Email </Typography>
                <TextField autoFocus margin="dense" id="email" placeholder="example@email.com" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} sx={{ borderColor: "#EAEBEF", backgroundColor: "#FCFCFC", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" } }} 
                />

                <Typography fontSize={17} sx={{mt: 2}}> Password </Typography>
                <TextField margin="dense" id="password" placeholder="examplepass123" type={ showPassword ? "text" : "password" }
                    value={password} onChange={(e) => setPassword(e.target.value)} sx={{ borderColor: "#EAEBEF", backgroundColor: "#FCFCFC", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" } }} 
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
                    <Button sx={{fontWeight: 600, textTransform: "none", color: "#742092", ":hover": {backgroundColor: "#FBFBFB"} }}> Forgot Password? </Button>
                </Box>

                <Button variant="contained" onClick={handleLogin} sx={{ backgroundColor: "#742092", ":hover": {backgroundColor: "#C858BA"}, fontSize: 20, mt: 2, textTransform: "none", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" }, height: 55 }}> Log In </Button>

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
                    <Button sx={{ color: "black", backgroundColor: "#F0F0F0", ":hover": {backgroundColor: "#F8F8F8"}, fontSize: 20, textTransform: "none", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" }, height: 55 }}> <GoogleIcon sx={{ position: "absolute", left: "27%", mt: -0.5 }} /> Log in with Google </Button>
                    <Button sx={{ color: "black", backgroundColor: "#F0F0F0", ":hover": {backgroundColor: "#F8F8F8"},  fontSize: 20, textTransform: "none", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" }, height: 55 }}> <FacebookIcon sx={{ position: "absolute", left: "27%", mt: -0.5 }} /> Log in with Facebook </Button>
                    <Box sx={{ display:"flex", justifyContent: "end"}}>
                        <Typography> Don't have an account? <Button sx={{fontWeight: 600, textTransform: "none", color: "#742092", ":hover": {backgroundColor: "#FBFBFB"}}} onClick={() => { onClose(); openSignup(); }}> Sign up </Button></Typography>
                    </Box>
                </Stack>
            </Stack>

            <img src="loginpic.jpg" alt="Login Art" width= "55%" height="55%" style={{ position: "absolute", right: "6%", bottom: "17%" }} />
        </Box>
    );
};

export default LoginPage;
