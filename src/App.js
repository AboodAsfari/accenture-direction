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
import AccountMenu from "./AccountMenu";
import Profile from "./Profile";

const App = () => {
  const [sessionData, setSessionData] = React.useState({
    db: new MockBackend(),
    user: null
  });

  const MainPages = {
    HOME: 0,
    LOGIN: 1,
    SIGNUP: 2,
    PROFILE: 3,
    SAVEDJOBS: 4,
    SAVEDMENTORS: 5
  }

  const [activePage, setActivePage] = React.useState(MainPages.HOME);

  const loadUser = (user) => {
    setSessionData(prev => ({
      db: prev.db,
      user: user, 
    }));
  }

  const updateProfilePic = (src) => {
    setSessionData(prev => ({
      db: prev.db,
      user: {
        ...prev.user,
        profilePic: src, 
        clone: prev.user.clone, 
        addQualification: prev.user.addQualification, 
        formatDate: prev.user.formatDate
      }
    }));
    sessionData.db.getUser(sessionData.user.email).profilePic = src;
  }

  const updateUser = (oldEmail) => {
    delete sessionData.db.users[oldEmail];
    sessionData.db.users[sessionData.user.email] = sessionData.user;
    setSessionData(prev => ({
      db: prev.db,
      user: prev.user, 
    }));
  }

  return (
    <SessionContext.Provider value={sessionData}>
      <AppBar position="sticky" component="nav">
          <Toolbar>
            <EmojiEmotionsIcon />
            <Typography variant="h6" component="div" sx={{ ml: 2, textAlign: "center" }}>
                D1rection
            </Typography>
            <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
              { !sessionData.user ? 
                <>
                <Button variant="container" onClick={() => setActivePage(MainPages.LOGIN)}> Log In </Button>
                <Button variant="container" onClick={() => setActivePage(MainPages.SIGNUP)}> Sign Up </Button>
                </> :
                <>
                <Typography sx={{alignSelf:"center", mt: 0.5}}> {sessionData.user.firstName} </Typography>
                <AccountMenu logOut={() => { setActivePage(MainPages.HOME); loadUser(null) }} openProfile={() => setActivePage(MainPages.PROFILE)} openSavedJobs={() => setActivePage(MainPages.SAVEDJOBS)} openSavedMentors={() => setActivePage(MainPages.SAVEDMENTORS)} />
                </>
              }
            </Stack>
          </Toolbar>
      </AppBar>

      {activePage === MainPages.HOME && <CareerAdvice /> }

      {activePage === MainPages.LOGIN && <LoginPage onClose={() => setActivePage(MainPages.HOME)} openSignup={() => setActivePage(MainPages.SIGNUP)} loadUser={loadUser} />}
      {activePage === MainPages.SIGNUP && <SignupPage onClose={() => setActivePage(MainPages.HOME)} loadUser={loadUser} />}

      {activePage === MainPages.PROFILE && <Profile updateProfilePic={updateProfilePic} updateUser={updateUser} />}
    </SessionContext.Provider>
  );
};

export default App;
export const SessionContext = React.createContext();