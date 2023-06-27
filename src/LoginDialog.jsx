import React, { useCallback } from "react";
import {
    Box, 
    Button,
    Dialog,
    IconButton,
    InputAdornment,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginDialog = (props) => {
    const {
        onClose,
        open,
    } = props;

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClose = useCallback(() => {
        onClose();
        setEmail("");
        setPassword("");
        setShowPassword(false);
    }, [onClose]);

    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="xs">
                <DialogTitle> Login </DialogTitle>
                
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
                        <Button onClick={handleClose}> Cancel </Button>
                        <Button fullWidth> Login </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LoginDialog;
