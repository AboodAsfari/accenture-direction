/**
 * Twenty Three Fifty Nine - Grade tracking tool
 * Copyright (C) 2023  Abdulrahman Asfari and Christopher E Sa
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

import React, { useCallback } from "react";
import {
    Alert,
    Box, 
    Button,
    CircularProgress,
    Collapse,
    Dialog,
    IconButton,
    InputAdornment,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * This dialog allows the user to log into their account
 * and access the rest of the website. It also allows the user to
 * request a password reset.
 */
const LoginDialog = (props) => {
    const {
        activeTri,
        onClose,
        open,
        setIsLoggedIn,
        setUserDetails,
    } = props;

    // Tracks whether the user is logging in or requesting a password reset.
    const [loginState, setLoginState] = React.useState(true);

    // Stores user details from the login form.
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // States for visual feedback when the form is being used.
    const [loginError, setLoginError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [resetPasswordSuccess, setResetPasswordSuccess] = React.useState(false);

    /** Closes the login dialog. */
    const handleClose = useCallback(() => {
        onClose();
        setLoginError(null);
        setLoginState(true);
        setEmail("");
        setPassword("");
        setShowPassword(false);
    }, [onClose]);

    return (
        <Box>
            <Dialog open={open} onClose={() => loginState ? handleClose() : setLoginState(true)} fullWidth maxWidth="xs">
                <DialogTitle> { loginState ? "Login" : "Reset Passowrd" } </DialogTitle>
                
                <DialogContent>
                    <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField margin="dense" id="password" label="Password" type={ showPassword ? "text" : "password" }
                        fullWidth value={password} onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ endAdornment: 
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                                </IconButton>
                            </InputAdornment>,
                            style: { WebkitBoxShadow: "0 0 0 1000px transparent inset" }
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
                    <Stack direction="row">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button  disabled={loading} fullWidth> Login </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LoginDialog;
