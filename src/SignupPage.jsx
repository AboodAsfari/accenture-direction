import React from "react";
import {
    Alert,
    Box,
    Button,
    Collapse,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { SessionContext } from "./App";
import CloseIcon from '@mui/icons-material/Close';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignupPage = (props) => {
    const {
        onClose,
        loadUser,
    } = props;

    const sessionData = React.useContext(SessionContext);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isStudent, setIsStudent] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const [signupError, setSignupError] = React.useState(false);

    const handleSignup = () => {
        if (!sessionData.db.emailTaken(email)) {
            sessionData.db.addUser(firstName, lastName, email, password);
            loadUser(sessionData.db.getUser(email));
            onClose();
        } else {
            setSignupError(true);
        }
    }

    return (
        <Box sx={{ ml: 15, mt: 15 }}>
            <Typography fontSize={40}> Create an Account </Typography>

            <Typography fontSize={20}> Are you a... </Typography>
            <Stack sx={{ width: "30%" }}>
                <Stack direction="row" spacing={6.5} sx={{ my: 1}}>
                    <Button variant={isStudent ? "contained" : "outlined"} sx={{fontSize: 20, p: 4, px: 9}} onClick={() => setIsStudent(true)}> Student </Button>
                    <Button variant={!isStudent ? "contained" : "outlined"} sx={{fontSize: 20, p: 4, px: 8}} onClick={() => setIsStudent(false)}> Employer </Button>
                </Stack>

                <TextField autoFocus margin="dense" id="firstname" label="Last Name" type="text" fullWidth 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField margin="dense" id="lastname" label="First Name" type="text" fullWidth 
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                />

                <TextField margin="dense" id="email" label="Email Address" type="email" value={email}
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

                <Button variant="contained" disabled={!firstName || !lastName || !email || !password} onClick={handleSignup} sx={{ fontSize: 20, mt: 5 }}> Sign Up </Button>

                <Collapse in={signupError}>
                    <Alert severity="error" sx={{ mt: 2 }}
                        action= {
                            <IconButton color="inherit" size="small" onClick={() => setSignupError(false)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Email already in use.
                    </Alert>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default SignupPage;