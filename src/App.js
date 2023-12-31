import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  Fade,
} from "@mui/material";
import LoginPage from "./LoginPage";
import CareerAdvice from "./CareerAdvice";
import SignupPage from "./SignupPage";
import MockBackend from "./MockBackend";

import AccountMenu from "./AccountMenu";
import Profile from "./Profile";
import { Box } from "@mui/system";

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
      <AppBar position="sticky" component="nav" sx={{backgroundColor: "white", boxShadow: 0}}>
          <Toolbar>
            <img src="telegram.png" alt="D1rection Logo" width="2.5%" height="2.5%" />
            <Typography fontSize={25} component="div" sx={{ ml: 2, mt: 0.5, textAlign: "center", color: "#742092", fontWeight: 700 }}>
                D1rection
            </Typography>
            <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
              <Button sx={{textTransform: "none", borderWidth: 3, borderColor: "#742092", color: "#1C1C1C", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderColor: "#C858BA"}, mr: 2}} onClick={() => setActivePage(MainPages.HOME)}> Home </Button>
              <Divider orientation="vertical" sx={{mr: 3, borderWidth: 1, borderColor: "#1C1C1C", height: 35, alignSelf:"center"}} />
              { !sessionData.user ? 
                <>
                <Button variant="outlined" sx={{borderRadius: "8px", textTransform: "none", borderWidth: 3, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 3, borderColor: "#C858BA", color: "#C858BA"}, mr: 2}} onClick={() => setActivePage(MainPages.LOGIN)}> Log In </Button>
                <Button variant="container" sx={{borderRadius: "8px", textTransform: "none", backgroundColor: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#C858BA"}}} onClick={() => setActivePage(MainPages.SIGNUP)}> Sign Up </Button>
                </> :
                <>
                <Typography sx={{mr: 1, fontSize: 14, color: "#1C1C1C", fontWeight: 600, alignSelf:"center", mt: 0.3}}> {sessionData.user.firstName} </Typography>
                <AccountMenu logOut={() => { setActivePage(MainPages.HOME); loadUser(null) }} openProfile={() => setActivePage(MainPages.PROFILE)} openSavedJobs={() => setActivePage(MainPages.SAVEDJOBS)} openSavedMentors={() => setActivePage(MainPages.SAVEDMENTORS)} />
                </>
              }
            </Stack>
          </Toolbar>
      </AppBar>

      <Fade in={activePage === MainPages.HOME}>
        <Box>
          {activePage === MainPages.HOME && <CareerAdvice /> }
        </Box>
      </Fade>
      
      <Fade in={activePage === MainPages.LOGIN}>
        <Box>
          {activePage === MainPages.LOGIN && <LoginPage onClose={() => setActivePage(MainPages.HOME)} openSignup={() => setActivePage(MainPages.SIGNUP)} loadUser={loadUser} />}
        </Box>
      </Fade >
      
      <Fade in={activePage === MainPages.SIGNUP}>
        <Box>
          {activePage === MainPages.SIGNUP && <SignupPage onClose={() => setActivePage(MainPages.HOME)} loadUser={loadUser} />}
        </Box>
      </Fade>

      <Fade in={activePage === MainPages.PROFILE}>
        <Box>
          {activePage === MainPages.PROFILE && <Profile updateProfilePic={updateProfilePic} updateUser={updateUser} />}
        </Box>
      </Fade>
    </SessionContext.Provider>
  );
};

export default App;
export const SessionContext = React.createContext();