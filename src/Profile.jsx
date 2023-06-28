import React from "react";
import {
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";

import { SessionContext } from "./App";

const Profile = (props) => {
    const {

    } = props;

    const UserPages = {
        PROFILE: 0,
        JOBS: 1,
        MENTORS: 2,
    }

    const sessionData = React.useContext(SessionContext);

    return (
        <>
        <Stack sx={{ width: "100%", height: 200, backgroundColor: "#d0d0d0", justifyContent: "center", alignItems:"center" }}>
            <Typography fontSize={20}> Welcome back, </Typography>
            <Typography fontSize={40}> {sessionData.user.firstName + " " + sessionData.user.lastName} </Typography>
        </Stack>

        <Stack>
            <Tabs value={UserPages.PROFILE} sx={{alignSelf:"center"}}>
                <Tab label="My Profile" value={UserPages.PROFILE} />
                <Tab label="My Saved Jobs" value={UserPages.JOBS}/>
                <Tab label="My Saved Mentors" value={UserPages.MENTORS}/>
            </Tabs>
            {/* <Stack sx={{ width: "100%", height: 200, backgroundColor: "#d0d0d0", justifyContent: "center", alignItems:"center" }}></Stack> */}
        </Stack>
        </>
    );
};

export default Profile;
