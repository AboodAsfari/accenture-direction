import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    IconButton,
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
        updateProfilePic
    } = props;

    const UserPages = {
        PROFILE: 0,
        JOBS: 1,
        MENTORS: 2,
    }

    const sessionData = React.useContext(SessionContext);

    function handleAvatarChanged(e) {
        var selectedFile = e.target.files[0];
        var reader = new FileReader();
        if(!selectedFile) return;

        reader.onload = function(e) {
            updateProfilePic(e.target.result);
        };
      
        reader.readAsDataURL(selectedFile);
    }

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
                            <input accept="image/*" id="upload-avatar-pic" type="file" onChange={handleAvatarChanged} hidden />
                            <label htmlFor="upload-avatar-pic">
                                <IconButton component="span">
                                    <Avatar sx={{ width: 128, height: 128 }}>
                                        { sessionData.user.profilePic === null ? 
                                            <PersonIcon fontSize={"large"} /> :
                                            <img height="100%" alt="Profile Icon" src={sessionData.user.profilePic} />
                                        } 

                                    </Avatar>
                                </IconButton>
                            </label>
                            <Typography fontSize={20} sx={{mt: 2}}> {sessionData.user.firstName + " " + sessionData.user.lastName} </Typography>
                            <Typography fontSize={13}> Member since {sessionData.user.memberSince} </Typography>
                            <Divider sx={{height: 1, width: "55%", borderTop: 1, mb: 5, mt: 1}} />

                            <Typography fontSize={13}> {sessionData.user.bio} </Typography>
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
                            <Typography fontSize={20} sx={{mb: 2}}> {sessionData.user.firstName} </Typography>

                            <Typography fontSize={16}> Last Name </Typography>
                            <Typography fontSize={20} sx={{mb: 2}}> {sessionData.user.lastName} </Typography>

                            <Typography fontSize={16}> Email Address </Typography>
                            <Typography fontSize={20} sx={{mb: 2}}> {sessionData.user.email} </Typography>
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Qualification(s) </Typography>
                            <Divider sx={{height: 1, width: 210, borderTop: 2, mb: 2}} />
                            <Card sx={{minHeight: 150, backgroundColor: "#d0d0d0", mb: 2}}>
                                <Stack sx={{m: 2}}>
                                    {sessionData.user.qualifications.map((item, index) => 
                                        <Stack sx={{m: 2}} key={item}>
                                            <Typography fontSize={16}> {item.institute} </Typography>
                                            <Typography fontSize={20} sx={{mb: 1}}> {item.degree} </Typography>

                                            <Typography fontSize={16}> Major(s) </Typography>
                                            {item.majors.map((item, index) => <Typography fontSize={20} key={item}> {item} </Typography>)}
                                        </Stack>
                                    )}
                                </Stack>
                            </Card>
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Career Preferences </Typography>
                            <Divider sx={{height: 1, width: 270, borderTop: 2, mb: 2}} />

                            <Typography fontSize={16}> Industries I Am Interested In </Typography>
                            {sessionData.user.industries.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    <CircleIcon sx={{ fontSize: 12 }} />
                                    <Typography fontSize={20} sx={{ml: 1}}> {item} </Typography>
                                </Stack>
                            )}
                            
                            <Typography fontSize={16} sx={{mt: 2}}> Locations I Want To Work In </Typography>
                            {sessionData.user.locations.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    <CircleIcon sx={{ fontSize: 12 }} />
                                    <Typography fontSize={20} sx={{ml: 1}}> {item} </Typography>
                                </Stack>
                            )}
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> CV </Typography>
                            <Divider sx={{height: 1, width: 45, borderTop: 2, mb: 2}} />
                            
                            <Stack spacing={2}>
                                {sessionData.user.cvs.map((item, index) =>
                                    <Card sx={{minHeight: 120, backgroundColor: "#d0d0d0", mb: 2, display: "flex", alignItems: "center"}} key={item}>
                                        <Typography fontSize={20} sx={{ml: 2}}> {item} </Typography>
                                    </Card>
                                )}
                            </Stack>
                        </Stack>
                    </Card>
                </Box>
            </Stack>
        </Stack>
        </>
    );
};

export default Profile;
