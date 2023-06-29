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
        <Box sx={{ ml: 15, mt: 10 }}>
            <Typography fontSize={40} sx={{fontWeight: 700}}> Create an Account </Typography>

            <Typography fontSize={24} sx={{opacity: 0.5}}> I'm a... </Typography>
            <Stack sx={{ width: "30%" }}>
                <Stack direction="row" spacing={5} sx={{ my: 1, mb: 5 }}>
                    {isStudent ?
                        <>
                        <Button variant="contained" sx={{fontSize: 20, py: 3, px: 11, textTransform: "none", backgroundColor: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#C858BA"}}} onClick={() => setIsStudent(true)}> Student </Button>
                        <Button variant="outlined" sx={{fontSize: 20, py: 3, px: 10, textTransform: "none", borderWidth: 3, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 3, borderColor: "#C858BA", color: "#C858BA"}}} onClick={() => setIsStudent(false)}> Employer </Button>
                        </> :
                        <>
                        <Button variant="outlined" sx={{fontSize: 20, py: 3, px: 10, textTransform: "none", borderWidth: 3, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 3, borderColor: "#C858BA", color: "#C858BA"}}} onClick={() => setIsStudent(true)}> Student </Button>
                        <Button variant="contained" sx={{fontSize: 20, py: 3, px: 11, textTransform: "none", backgroundColor: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#C858BA"}}} onClick={() => setIsStudent(false)}> Employer </Button>
                        </>
                    }
                </Stack>

                <Typography fontSize={17}> First Name </Typography>
                <TextField autoFocus margin="dense" id="email" placeholder="John" type="text" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} sx={{ borderColor: "#EAEBEF", backgroundColor: "#FCFCFC", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" } }} 
                />

                <Typography fontSize={17} sx={{mt: 2}}> Last Name </Typography>
                <TextField margin="dense" id="email" placeholder="Doe" type="text" value={lastName}
                    onChange={(e) => setLastName(e.target.value)} sx={{ borderColor: "#EAEBEF", backgroundColor: "#FCFCFC", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" } }} 
                />

                <Typography fontSize={17} sx={{mt: 2}}> Email </Typography>
                <TextField margin="dense" id="email" placeholder="example@email.com" type="email" value={email}
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
                
                <Button variant="contained" disabled={!firstName || !lastName || !email || !password} onClick={handleSignup} sx={{ backgroundColor: "#742092", ":hover": {backgroundColor: "#C858BA"}, fontSize: 20, mt: 2, textTransform: "none", borderRadius: "12px", [`& fieldset`]: { borderRadius: "12px" }, height: 55 }}> Sign Up </Button>

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
            <img src="signuppic.jpg" alt="Signup Art" width= "50%" height="auto" style={{ position: "absolute", right: "6%", bottom: "7.5%" }} />
        </Box>
    );
};

export default SignupPage;