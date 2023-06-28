import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import LoginPage from "./LoginPage";
import CareerAdvice from "./CareerAdvice";
import SignupPage from "./SignupPage";
import MockBackend from "./MockBackend";

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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

  const openLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  }

  const openSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  }

  return (
    <>
    <AppBar position="sticky" component="nav">
        <Toolbar>
          <EmojiEmotionsIcon />
          <Typography variant="h6" component="div" sx={{ ml: 2, textAlign: "center" }}>
              D1RECTION Career Advice
          </Typography>
          <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
            { !sessionData.user ? 
              <>
              <Button variant="container" onClick={openLogin}> Log In </Button>
              <Button variant="container" onClick={openSignup}> Sign Up </Button>
              </> :
              <Button disableRipple variant="container" onClick={() => loadUser(null)}> Log Out </Button>
            }
          </Stack>
        </Toolbar>
    </AppBar>

    <SessionContext.Provider value={sessionData}>
      {!loginOpen && !signupOpen && <CareerAdvice /> }

      {loginOpen && <LoginPage onClose={() => setLoginOpen(false)} openSignup={() => setSignupOpen(true)} loadUser={loadUser} />}
      {signupOpen && <SignupPage onClose={() => setSignupOpen(false)} />}
    </SessionContext.Provider>
    </>
  );
};

export default App;
export const SessionContext = React.createContext();