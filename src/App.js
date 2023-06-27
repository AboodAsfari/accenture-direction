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
import MockBackend from "./MockBackend";

const App = () => {
  const [sessionData, setSessionData] = React.useState({
    db: new MockBackend(),
    user: null
  });

  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signupOpen, setSignupOpen] = React.useState(false);

  const loadUser = (user) => {
    setSessionData(prev => ({
      db: prev.db,
      user: user
    }));
  }

  return (
    <>
    <AppBar position="sticky" component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
              (LOGO HERE) Unnamed Direction Thing AAAAAAAAAAAAAA
          </Typography>
          <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
            { !sessionData.user ? 
              <>
              <Button variant="container" onClick={() => setLoginOpen(true)}> Log In </Button>
              <Button variant="container" onClick={() => setSignupOpen(true)}> Sign Up </Button>
              </> :
              <Button disableRipple variant="container" onClick={() => loadUser(null)}> Log Out </Button>
            }
          </Stack>
        </Toolbar>
    </AppBar>

    <SessionContext.Provider value={sessionData}>
      <CareerAdvice />

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} loadUser={loadUser} />
      <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} />
    </SessionContext.Provider>
    </>
  );
};

export default App;
export const SessionContext = React.createContext();