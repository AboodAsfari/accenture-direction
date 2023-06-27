import React, { useCallback } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignupDialog = (props) => {
    const {
        onClose,
        open,
    } = props;

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClose = useCallback(() => {
        onClose();
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);
    }, [onClose]);

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Sign Up </DialogTitle>

                <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth 
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <TextField margin="dense" id="email" label="Email Address" type="email" fullWidth value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField margin="dense" id="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} 
                        type={showPassword ? "text" : "password"}
                        InputProps={{endAdornment: 
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Box sx={{ position: "relative" }}>
                        <Button disabled={!name || !email || !password}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SignupDialog;