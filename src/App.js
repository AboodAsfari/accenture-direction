import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import LoginDialog from "./LoginDialog";
import CareerAdvice from "./CareerAdvice";
import SignupDialog from "./SignupDialog";

const App = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signupOpen, setSignupOpen] = React.useState(false);

  return (
    <>
    <AppBar position="sticky" component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
              (LOGO HERE) Direction- Career Advisory
          </Typography>
          <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
            <Button variant="container" onClick={() => setLoginOpen(true)}> Log In </Button>
            <Button variant="container" onClick={() => setSignupOpen(true)}> Sign Up </Button>
          </Stack>
        </Toolbar>
    </AppBar>

    <CareerAdvice />

    <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}

export default App;
