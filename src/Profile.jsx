import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";

import { SessionContext } from "./App";
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';

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
            <Tabs value={UserPages.PROFILE} sx={{ alignSelf:"center", mb: 2, mt: 1 }}>
                <Tab label="My Profile" value={UserPages.PROFILE} />
                <Tab label="My Saved Jobs" value={UserPages.JOBS} sx={{mx: 2}} />
                <Tab label="My Saved Mentors" value={UserPages.MENTORS} />
            </Tabs>
            <Stack direction="row">
                <Box sx={{ width: "30%", display: "flex", justifyContent: "end", alignItems:"start" }}>
                    <Card sx={{width: "60%", m: 5, boxShadow: 15}}>
                        <Stack sx={{ alignItems: "center", m: 4}}>
                            <Avatar sx={{ width: 128, height: 128 }}> <PersonIcon fontSize={"large"} /> </Avatar>
                            <Typography fontSize={20} sx={{mt: 2}}> Full Name </Typography>
                            <Typography fontSize={13}> Member since 00/00/0000 </Typography>
                            <Divider sx={{height: 1, width: "55%", borderTop: 1, mb: 5, mt: 1}} />

                            <Typography fontSize={13}> Hi I’m Kieran Doe, a Computer Science student in my final year of my degree. I want to find out what further options are available to me so that I can figure out what to do next.   </Typography>
                        </Stack>
                    </Card>
                </Box>

                <Box sx={{ width: "70%", display: "flex", justifyContent: "start", alignItems:"start" }}>
                    <Card sx={{width: "90%", m: 5, boxShadow: 15}}>
                        <Button sx={{position: "absolute", right: "6%", mt: 4}}> Edit </Button>
                        <Stack sx={{m: 4}}>
                            <Typography fontSize={30}> Personal Details </Typography>
                            <Divider sx={{height: 1, width: 230, borderTop: 2, mb: 2}} />

                            <Typography fontSize={16}> First Name </Typography>
                            <Typography fontSize={20} sx={{mb: 2}}> Abood </Typography>

                            <Typography fontSize={16}> Last Name </Typography>
                            <Typography fontSize={20} sx={{mb: 2}}> Asfari </Typography>

                            <Typography fontSize={16}> Email Address </Typography>
                            <Typography fontSize={20} sx={{mb: 2}}> az.asfari@gmail.com </Typography>
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Qualification(s) </Typography>
                            <Divider sx={{height: 1, width: 210, borderTop: 2, mb: 2}} />
                            <Card sx={{minHeight: 150, backgroundColor: "#d0d0d0", mb: 2}}>
                                <Stack sx={{m: 2}}>
                                    <Typography fontSize={16}> University of Auckland </Typography>
                                    <Typography fontSize={20} sx={{mb: 1}}> Bachelors of Science </Typography>

                                    <Typography fontSize={16}> Major(s) </Typography>
                                    <Typography fontSize={20}> Computer Science </Typography>
                                </Stack>
                            </Card>
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Career Preferences </Typography>
                            <Divider sx={{height: 1, width: 270, borderTop: 2, mb: 2}} />

                            <Typography fontSize={16}> Industries I Am Interested In </Typography>
                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <Typography fontSize={20} sx={{ml: 1}}> Technology </Typography>
                            </Stack>
                            
                            <Typography fontSize={16} sx={{mt: 2}}> Locations I Want To Work In </Typography>
                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <Typography fontSize={20} sx={{ml: 1}}> Sydney, Australia </Typography>
                            </Stack>
                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <Typography fontSize={20} sx={{ml: 1}}> Auckland, New Zealand </Typography>
                            </Stack>
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> CV </Typography>
                            <Divider sx={{height: 1, width: 45, borderTop: 2, mb: 2}} />

                            <Card sx={{minHeight: 120, backgroundColor: "#d0d0d0", mb: 2, display: "flex", alignItems: "center"}}>
                                <Typography fontSize={20} sx={{ml: 2}}> Aboods_CV.pdf </Typography>
                            </Card>
                        </Stack>
                    </Card>
                </Box>
            </Stack>
        </Stack>
        </>
    );
};

export default Profile;
