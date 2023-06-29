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
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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
        currUser.profilePic = sessionData.user.profilePic;
        sessionData.user = currUser;
        updateUser(oldEmail);
        setEditing(false);
    }

    return (
        <>
        <Stack sx={{ width: "100%", height: 200, backgroundColor: "#F7F2FA", justifyContent: "center", alignItems:"center" }}>
            <Typography fontSize={25} fontWeight={600}> Welcome back, </Typography>
            <Typography fontSize={45} color="#37005F" fontWeight={700}> {currUser.firstName + " " + currUser.lastName} </Typography>
        </Stack>

        <Stack>
            <Tabs value={UserPages.PROFILE} sx={{ alignSelf:"center", mb: 2, mt: 1 }} TabIndicatorProps={{ style: { backgroundColor: "#742092" } }} >
                <Tab label="My Profile" value={UserPages.PROFILE} style={{color:"#742092"}} sx={{fontWeight: 700, textTransform: "none"}} />
                <Tab label="My Saved Jobs" value={UserPages.JOBS} sx={{mx: 2, textTransform: "none"}} />
                <Tab label="My Saved Mentors" value={UserPages.MENTORS} sx={{textTransform: "none"}} />
            </Tabs>
            <Stack direction="row">
                <Box sx={{ width: "30%", display: "flex", justifyContent: "end", alignItems:"start" }}>
                    <Card sx={{width: "60%", m: 5, boxShadow: 4, borderRadius: "10px"}}>
                        <Stack sx={{ alignItems: "center", m: 4}}>
                            <Box sx={{position: "relative"}}>
                                <input accept="image/*" id="upload-avatar-pic" type="file" onChange={handleAvatarChanged} hidden />
                                <label htmlFor="upload-avatar-pic">
                                    <IconButton component="span" sx={{zIndex: 2}}>
                                        <Avatar sx={{ width: 128, height: 128, bgcolor: "#F7F2FA" }}>
                                            { sessionData.user.profilePic === null ? 
                                                <PersonIcon fontSize={"large"} sx={{color: "#742092"}} /> :
                                                <img height="100%" alt="Profile Icon" src={sessionData.user.profilePic} style={{color: "#F7F2FA"}} />
                                            } 
                                        </Avatar>
                                    </IconButton>
                                </label>
                                <RadioButtonUncheckedIcon sx={{ color: "#742092", fontSize: 184, position: "absolute", top: "50%", left: "50%", mt: "-92px", ml: "-92px" }} />
                                <RadioButtonUncheckedIcon sx={{ color: "#FFFFFF", fontSize: 180, position: "absolute", top: "50%", left: "50%", mt: "-90px", ml: "-90px" }} />
                            </Box>
                            <Typography fontSize={20} sx={{mt: 2, fontWeight: 700}}> {currUser.firstName + " " + currUser.lastName} </Typography>
                            <Typography fontSize={13} sx={{color: "#989898"}}> Member since {currUser.memberSince} </Typography>
                            <Divider sx={{height: 1, width: "65%", borderTop: 1, mb: 4, mt: 1, borderColor: "#989898"}} />
                            
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 14}}} value={currUser.bio} multiline sx={{[`& fieldset`]: { borderRadius: "8px" }, mt: -2, width: "100%" }} rows={10} 
                                    onChange={(e) => setCurrUser((prev) => ({...prev, bio: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={14} sx={{fontWeight: 525, textAlign: "center"}}> {currUser.bio} </Typography>
                            }
                            {!editing && currUser.bio === "" && <Typography fontSize={16} sx={{ fontStyle: 'italic', fontWeight: 600 }}> No Bio, Press Edit to Get Started! </Typography>}
                        </Stack>
                    </Card>
                </Box>

                <Box sx={{ width: "70%", display: "flex", justifyContent: "start", alignItems:"start" }}>
                    <Card sx={{width: "90%", m: 5, boxShadow: 4, borderRadius: "10px"}}>
                        {!editing && <Button sx={{position: "absolute", right: "6%", mt: 3, color: "#989898", textTransform: "none", fontSize: 18, ":hover": {backgroundColor: "#FBFBFB"} }} onClick={startEditing}> Edit </Button>}
                        <Stack sx={{m: 4}}>
                            <Typography fontSize={30} sx={{fontWeight: 700}}> Personal Details </Typography>
                            <Divider sx={{height: 1, width: 240, borderTop: 2, mb: 2, color: "#FFC973"}} />

                            <Typography fontSize={18}> First Name </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.firstName} sx={{[`& fieldset`]: { borderRadius: "8px" }, width: "100%", mb: 2}} 
                                    onChange={(e) => setCurrUser((prev) => ({...prev, firstName: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2, fontWeight: 700}}> {currUser.firstName} </Typography>
                            }

                            <Typography fontSize={18}> Last Name </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.lastName} sx={{[`& fieldset`]: { borderRadius: "8px" }, width: "100%", mb: 2}}
                                    onChange={(e) => setCurrUser((prev) => ({...prev, lastName: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2, fontWeight: 700}}> {currUser.lastName} </Typography>
                            }

                            <Typography fontSize={18}> Email Address </Typography>
                            {editing ?
                                <TextField InputProps={{style: {fontSize: 20}}} size="small" value={currUser.email} sx={{[`& fieldset`]: { borderRadius: "8px" }, width: "100%", mb: 2}}
                                    onChange={(e) => setCurrUser((prev) => ({...prev, email: e.target.value, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))} /> :
                                <Typography fontSize={20} sx={{mb: 2, fontWeight: 700}}> {currUser.email} </Typography>
                            }
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2, opacity: 0.25}} />

                            <Typography fontSize={30} sx={{fontWeight: 700}}> Qualification(s) </Typography>
                            <Divider sx={{height: 1, width: 225, borderTop: 2, mb: 2, color: "#FFC973"}} />
                            <Stack>
                                {currUser.qualifications.map((item, index) => 
                                    <Card sx={{borderRadius: "8px", minHeight: 150, backgroundColor: editing ? "#FFFFFF" : "#FFC97329", mb: 2, border: editing ? 2 : 0, borderColor: "#D9D9D9", boxShadow: 0 }} key={item}>
                                        {editing && 
                                            <IconButton sx={{position:"absolute", right: "6.5%"}} onClick={() => setCurrUser((prev) => ({...prev, qualifications: prev.qualifications.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> 
                                                <HighlightOffIcon  /> 
                                            </IconButton>
                                        }
                                        <Stack sx={{m: 2}}>
                                            {editing ?
                                                <QualificationInstitute item={item} setCurrUser={setCurrUser} /> :
                                                <Typography fontSize={16} sx={{fontWeight: 700}}> {item.institute} </Typography>
                                            }
                                            {editing ?
                                                <QualificationDegree item={item} setCurrUser={setCurrUser} /> :
                                                <Typography fontSize={20} sx={{mb: 1, fontWeight: 700}}> {item.degree} </Typography>
                                            }

                                            <Typography fontSize={18}> Major(s) </Typography>
                                            {item.majors.map((item, majorIndex) => 
                                                <Stack direction="row" key={majorIndex}>
                                                    {editing && 
                                                    <IconButton sx={{ml: -1}} onClick={() => { currUser.qualifications[index].majors.splice(majorIndex, 1); setCurrUser((prev) => ({...prev, qualifications: prev.qualifications, clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}}>
                                                        <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                                    </IconButton>}
                                                    <Typography fontSize={20} sx={{fontWeight: editing ? 500 : 700}} key={item}> {item} </Typography>
                                                </Stack>
                                            )}
                                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                                <CircleIcon sx={{ fontSize: 12 }} />
                                                <MajorInput setCurrUser={setCurrUser} currUser={currUser} index={index} />
                                            </Stack>}
                                        </Stack>
                                    </Card>
                                )}
                                {!editing && currUser.qualifications.length === 0 && <Typography fontSize={20} sx={{ fontStyle: 'italic', fontWeight: 600 }}> No Qualifications To Display </Typography>}
                                {editing && <Button sx={{borderRadius: "8px", justifySelf: "start", width: "15%", textTransform: "none", borderWidth: 2, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 2, borderColor: "#C858BA", color: "#C858BA"}}} 
                                    variant="outlined" onClick={() => setCurrUser((prev) => ({...prev, qualifications: [...prev.qualifications, {institute: "", degree: "", majors: []}], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> Add Qualification </Button>}
                            </Stack>

                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2, opacity: 0.25}} />

                            <Typography fontSize={30} sx={{fontWeight: 700}}> Career Preferences </Typography>
                            <Divider sx={{height: 1, width: 283, borderTop: 2, mb: 2, color: "#FFC973"}} />

                            <Typography fontSize={18}> Industries I Am Interested In </Typography>
                            {currUser.industries.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    {editing ? 
                                        <IconButton sx={{ml: -1}} onClick={() => setCurrUser((prev) => ({...prev, industries: prev.industries.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}>
                                            <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                        </IconButton> : 
                                        <CircleIcon sx={{ fontSize: 12, color: "#FFC973" }} />
                                    }
                                    <Typography fontSize={20} sx={{ml: 1, fontWeight: editing ? 500 : 700}}> {item} </Typography>
                                </Stack>
                            )}
                            {!editing && currUser.industries.length === 0 && <Typography fontSize={16} sx={{ fontStyle: 'italic', fontWeight: 600 }}> No Industries Added </Typography>}
                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <TextField value={newIndustry} variant="standard" InputProps={{style: {fontSize: 20}}} size="small" sx={{width: "30%", ml: 1}}
                                    onChange={(e) => setNewIndustry(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ setCurrUser((prev) => ({...prev, industries: [...prev.industries, newIndustry], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})); setNewIndustry("")}}} />
                            </Stack>}
                            
                            <Typography fontSize={18} sx={{mt: 2}}> Locations I Want To Work In </Typography>
                            {currUser.locations.map((item, index) =>
                                <Stack direction="row" sx={{ alignItems: "center" }} key={item}>
                                    {editing ? 
                                        <IconButton sx={{ml: -1}} onClick={() => setCurrUser((prev) => ({...prev, locations: prev.locations.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}>
                                            <ClearIcon sx={{ fontSize: 13, color: "black" }} /> 
                                        </IconButton> : 
                                        <CircleIcon sx={{ fontSize: 12, color: "#FFC973" }} />
                                    }
                                    <Typography fontSize={20} sx={{ml: 1, fontWeight: editing ? 500 : 700}}> {item} </Typography>
                                </Stack>
                            )}
                            {!editing && currUser.locations.length === 0 && <Typography fontSize={16} sx={{ fontStyle: 'italic', fontWeight: 600 }}> No Locations Added </Typography>}
                            {editing && <Stack direction="row" sx={{ alignItems: "center" }}>
                                <CircleIcon sx={{ fontSize: 12 }} />
                                <TextField value={newLocation} variant="standard" InputProps={{style: {fontSize: 20}}} size="small" sx={{width: "30%", ml: 1}}
                                    onChange={(e) => setNewLocation(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ setCurrUser((prev) => ({...prev, locations: [...prev.locations, newLocation], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})); setNewLocation("")}}}/>
                            </Stack>}
                            <Divider sx={{height: 1, width: "100%", borderTop: 2, my: 2, opacity: 0.25}} />

                            <Typography fontSize={30} sx={{fontWeight: 700}}> CV </Typography>
                            <Divider sx={{height: 1, width: 45, borderTop: 2, mb: 2, color: "#FFC973"}} />
                            
                            <Stack>
                                {currUser.cvs.map((item, index) =>
                                    <Card sx={{borderRadius: "8px", minHeight: 120, backgroundColor: editing ? "#FFFFFF" : "#FFC97329", mb: 2, border: editing ? 2 : 0, borderColor: "#D9D9D9", boxShadow: 0, display: "flex"}} key={item}>
                                        {editing && 
                                            <IconButton sx={{position:"absolute", right: "6.5%"}} onClick={() => setCurrUser((prev) => ({...prev, cvs: prev.cvs.filter((item, i) => i !== index), clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate}))}> 
                                                <HighlightOffIcon /> 
                                            </IconButton>
                                        }
                                        <Typography fontSize={20} sx={{ml: 2, alignSelf: "center", fontWeight: editing ? 500 : 700 }}> {item} </Typography>
                                    </Card>
                                )}
                                {!editing && currUser.cvs.length === 0 && <Typography fontSize={20} sx={{ fontStyle: 'italic', fontWeight: 600 }}> No CVs Added </Typography>}
                            </Stack>
                            {editing && 
                                <>
                                <input accept="application/pdf" id="upload-cv" type="file" onChange={handleCVAdded} hidden />
                                <label htmlFor="upload-cv">
                                    <Button component="span" sx={{borderRadius: "8px", justifySelf: "start", width: "15%", textTransform: "none", borderWidth: 2, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 2, borderColor: "#C858BA", color: "#C858BA"}}} variant="outlined"> Add Document </Button>
                                </label>
                                </>
                            }
                            
                            {editing && <Stack direction="row" sx={{justifyContent:"end", mt: 2}} spacing={2}>
                                <Button variant="outlined" sx={{borderRadius: "8px", width: "10%", textTransform: "none", borderWidth: 2, borderColor: "#742092", color: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#FBFBFB", borderWidth: 2, borderColor: "#C858BA", color: "#C858BA"}}} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); setCurrUser(sessionData.user); setEditing(false)}}> Cancel </Button>
                                <Button variant="contained" sx={{borderRadius: "8px", width: "10%", textTransform: "none", backgroundColor: "#742092", fontWeight: 700, ":hover": {backgroundColor: "#C858BA"}}} onClick={handleSave}> Save </Button>
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
        <TextField InputProps={{style: {fontSize: 20}}} size="small" value={item.institute} sx={{[`& fieldset`]: { borderRadius: "8px" }, width: "90%", mb: 2}} 
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
        <TextField InputProps={{style: {fontSize: 20}}} size="small" value={item.degree} sx={{[`& fieldset`]: { borderRadius: "8px" }, width: "90%", mb: 2}} 
            onChange={(e) => setCurrUser((prev) => { item.degree = e.target.value; return ({...prev, qualifications: [...prev.qualifications], clone: prev.clone, addQualification: prev.addQualification, formatDate: prev.formatDate})})} />
        </>
    );
};

export default Profile;
