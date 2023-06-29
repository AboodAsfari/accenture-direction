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
    TextField,
    Typography,
} from "@mui/material";

import { SessionContext } from "./App";
import CircleIcon from '@mui/icons-material/Circle';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Profile = (props) => {
    const {
        updateProfilePic,
        updateUser
    } = props;

    const UserPages = {
        PROFILE: 0,
        JOBS: 1,
        MENTORS: 2,
    }

    const sessionData = React.useContext(SessionContext);
    
    const [editing, setEditing] = React.useState(false);
    const [newIndustry, setNewIndustry] = React.useState("");
    const [newLocation, setNewLocation] = React.useState("");
    const [currUser, setCurrUser] = React.useState(sessionData.user);

    const handleAvatarChanged = (e) => {
        var selectedFile = e.target.files[0];
        var reader = new FileReader();
        if(!selectedFile) return;

        reader.onload = function(e) {
            updateProfilePic(e.target.result);
        };
      
        reader.readAsDataURL(selectedFile);
    }

    const handleCVAdded = (e) => {
        var selectedFile = e.target.files[0];
        if(!selectedFile) return;
        setCurrUser((prev) => ({...prev, cvs: [...prev.cvs, selectedFile.name], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}));
    }

    const startEditing = () => {
        setCurrUser(sessionData.user.clone());
        setEditing(true);
    }

    const handleSave = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        let oldEmail = sessionData.user.email; 
        sessionData.user = currUser;
        updateUser(oldEmail);
        setEditing(false);
    }

    return (
        <>
        <Stack sx={{ width: "100%", height: 200, backgroundColor: "#d0d0d0", justifyContent: "center", alignItems:"center" }}>
            <Typography fontSize={20}> Welcome back, </Typography>
            <Typography fontSize={40}> {currUser.firstName + " " + currUser.lastName} </Typography>
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
                            <Typography fontSize={20} sx={{mt: 2}}> {currUser.firstName + " " + currUser.lastName} </Typography>
                            <Typography fontSize={13}> Member since {currUser.memberSince} </Typography>
                            <Divider sx={{height: 1, width: "55%", borderTop: 1, mb: 5, mt: 1}} />
                            
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 13}}} value={currUser.bio} multiline sx={{mt: -2, width: "100%"}} rows={10} 
                                    onChange={(e) => setCurrUser((prev) => ({...prev, bio: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={13}> {currUser.bio} </Typography>
                            }
                        </Stack>
                    </Card>
                </Box>

                <Box sx={{ width: "70%", display: "flex", justifyContent: "start", alignItems:"start" }}>
                    <Card sx={{width: "90%", m: 5, boxShadow: 15}}>
                        {!editing && <Button sx={{position: "absolute", right: "6%", mt: 4}} onClick={startEditing}> Edit </Button>}
                        <Stack sx={{m: 4}}>
                            <Typography fontSize={30}> Personal Details </Typography>
                            <Divider sx={{height: 1, width: 230, borderTop: 2, mb: 2}} />

                            <Typography fontSize={16}> First Name </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.firstName} sx={{width: "100%", mb: 2}} 
                                    onChange={(e) => setCurrUser((prev) => ({...prev, firstName: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2}}> {currUser.firstName} </Typography>
                            }

                            <Typography fontSize={16}> Last Name </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.lastName} sx={{width: "100%", mb: 2}}
                                    onChange={(e) => setCurrUser((prev) => ({...prev, lastName: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2}}> {currUser.lastName} </Typography>
                            }

                            <Typography fontSize={16}> Email Address </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.email} sx={{width: "100%", mb: 2}}
                                    onChange={(e) => setCurrUser((prev) => ({...prev, email: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2}}> {currUser.email} </Typography>
                            }
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Qualification(s) </Typography>
                            <Divider sx={{height: 1, width: 210, borderTop: 2, mb: 2}} />
                            <Stack>
                                {currUser.qualifications.map((item, index) => 
                                    <Card sx={{minHeight: 150, backgroundColor: "#d0d0d0", mb: 2}} key={item}>
                                        {editing && 
                                            <IconButton sx={{position:"absolute", right: "6.5%"}} onClick={() => setCurrUser((prev) => ({...prev, qualifications: prev.qualifications.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> 
                                                <HighlightOffIcon /> 
                                            </IconButton>
                                        }
                                        <Stack sx={{m: 2}}>
                                            {editing ?
                                                <QualificationInstitute item={item} setCurrUser={setCurrUser} /> :
                                                <Typography fontSize={16}> {item.institute} </Typography>
                                            }
                                            {editing ?
                                                <QualificationDegree item={item} setCurrUser={setCurrUser} /> :
                                                <Typography fontSize={20} sx={{mb: 1}}> {item.degree} </Typography>
                                            }

                                            <Typography fontSize={16}> Major(s) </Typography>
                                            {item.majors.map((item, majorIndex) => 
                                                <Stack direction="row" key={majorIndex}>
                                                    {editing && 
                                                    <IconButton sx={{ml: -1}} onClick={() => { currUser.qualifications[index].majors.splice(majorIndex, 1); setCurrUser((prev) => ({...prev, qualifications: prev.qualifications, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}}>
                                                        <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                                    </IconButton>}
                                                    <Typography fontSize={20} key={item}> {item} </Typography>
                                                </Stack>
                                            )}
                                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                                <CircleIcon sx={{ fontSize: 12 }} />
                                                <MajorInput setCurrUser={setCurrUser} currUser={currUser} index={index} />
                                            </Stack>}
                                        </Stack>
                                    </Card>
                                )}
                                {editing && <Button sx={{justifySelf: "start", width: "20%"}} variant="outlined" onClick={() => setCurrUser((prev) => ({...prev, qualifications: [...prev.qualifications, {institute: "", degree: "", majors: []}], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> Add Qualification </Button>}
                            </Stack>

                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> Career Preferences </Typography>
                            <Divider sx={{height: 1, width: 270, borderTop: 2, mb: 2}} />

                            <Typography fontSize={16}> Industries I Am Interested In </Typography>
                            {currUser.industries.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    {editing ? 
                                        <IconButton sx={{ml: -1}} onClick={() => setCurrUser((prev) => ({...prev, industries: prev.industries.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}>
                                            <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                        </IconButton> : 
                                        <CircleIcon sx={{ fontSize: 12 }} />
                                    }
                                    <Typography fontSize={20} sx={{ml: 1}}> {item} </Typography>
                                </Stack>
                            )}
                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <TextField value={newIndustry} variant="standard" InputProps={{style: {fontSize: 20}}} size="small" sx={{width: "30%", ml: 1}}
                                    onChange={(e) => setNewIndustry(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ setCurrUser((prev) => ({...prev, industries: [...prev.industries, newIndustry], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})); setNewIndustry("")}}} />
                            </Stack>}
                            
                            <Typography fontSize={16} sx={{mt: 2}}> Locations I Want To Work In </Typography>
                            {currUser.locations.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    {editing ? 
                                        <IconButton sx={{ml: -1}} onClick={() => setCurrUser((prev) => ({...prev, locations: prev.locations.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}>
                                            <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                        </IconButton> : 
                                        <CircleIcon sx={{ fontSize: 12 }} />
                                    }
                                    <Typography fontSize={20} sx={{ml: 1}}> {item} </Typography>
                                </Stack>
                            )}
                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <TextField value={newLocation} variant="standard" InputProps={{style: {fontSize: 20}}} size="small" sx={{width: "30%", ml: 1}}
                                    onChange={(e) => setNewLocation(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ setCurrUser((prev) => ({...prev, locations: [...prev.locations, newLocation], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})); setNewLocation("")}}}/>
                            </Stack>}
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2}} />

                            <Typography fontSize={30}> CV </Typography>
                            <Divider sx={{height: 1, width: 45, borderTop: 2, mb: 2}} />
                            
                            <Stack spacing={2}>
                                {currUser.cvs.map((item, index) =>
                                    <Card sx={{minHeight: 120, backgroundColor: "#d0d0d0", display: "flex"}} key={item}>
                                        {editing && 
                                            <IconButton sx={{position:"absolute", right: "6.5%"}} onClick={() => setCurrUser((prev) => ({...prev, cvs: prev.cvs.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> 
                                                <HighlightOffIcon /> 
                                            </IconButton>
                                        }
                                        <Typography fontSize={20} sx={{ml: 2, alignSelf: "center"}}> {item} </Typography>
                                    </Card>
                                )}
                                {editing && 
                                    <>
                                    <input accept="application/pdf" id="upload-cv" type="file" onChange={handleCVAdded} hidden />
                                    <label htmlFor="upload-cv">
                                        <Button component="span" sx={{justifySelf: "start", width: "20%"}} variant="outlined"> Add Document </Button>
                                    </label>
                                    </>
                                }
                            </Stack>
                            
                            {editing && <Stack direction="row" sx={{justifyContent:"end", mt: 2}} spacing={2}>
                                <Button variant="outlined" sx={{width: "10%"}} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); setCurrUser(sessionData.user); setEditing(false)}}> Cancel </Button>
                                <Button variant="contained" sx={{width: "10%"}} onClick={handleSave}> Save </Button>
                            </Stack>}
                        </Stack>
                    </Card>
                </Box>
            </Stack>
        </Stack>
        </>
    );
};

const MajorInput = (props) => {
    const {
        setCurrUser,
        currUser,
        index,
    } = props;

    const [major, setMajor] = React.useState("");

    return ( 
        <TextField value={major} variant="standard" InputProps={{style: {fontSize: 20}}} size="small" sx={{width: "30%", ml: 1}}
            onChange={(e) => setMajor(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ currUser.qualifications[index].majors.push(major); setCurrUser((prev) => ({...prev, qualifications: [...prev.qualifications], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})); setMajor("")}}} />
    );
};

const QualificationInstitute = (props) => {
    const {
        setCurrUser,
        item
    } = props;

    return ( 
        <>
        <Typography fontSize={16}> Institute </Typography>
        <TextField InputProps={{style: {fontSize: 20}}} size="small" value={item.institute} sx={{width: "90%", mb: 2}} 
            onChange={(e) => setCurrUser((prev) => { item.institute = e.target.value; return ({...prev, qualifications: [...prev.qualifications], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})})} />
        </>
    );
};

const QualificationDegree = (props) => {
    const {
        setCurrUser,
        item
    } = props;

    return ( 
        <>
        <Typography fontSize={16}> Degree </Typography>
        <TextField InputProps={{style: {fontSize: 20}}} size="small" value={item.degree} sx={{width: "90%", mb: 2}} 
            onChange={(e) => setCurrUser((prev) => { item.degree = e.target.value; return ({...prev, qualifications: [...prev.qualifications], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})})} />
        </>
    );
};

export default Profile;
