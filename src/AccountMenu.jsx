import React from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import { SessionContext } from "./App";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

/** A dropdown menu that opens other account-related dialogs. */
const AccountMenu = (props) => {
    const {
        logOut,
        openProfile,
        openSavedJobs,
        openSavedMentors,
    } = props;

    const sessionData = React.useContext(SessionContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    return (
        <Box>
            <IconButton color="#1C1C1C" onClick={(event) => setAnchorEl(event.target)}>
                {sessionData.user.profilePic === null ? 
                    <AccountCircleRoundedIcon color="inherit" fontSize="large"/> :
                    <Avatar src={sessionData.user.profilePic} style={{ border: '2px solid lightgray'}}> </Avatar>
                }
            </IconButton>
            
            <Menu open={menuOpen} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: "right", vertical: "top" }} 
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }} sx={{mt: 2}}
            >
                <MenuItem onClick={() => { openProfile(); setAnchorEl(null); }}>
                    <ListItemIcon>
                        <PersonRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> My Profile </Typography>
                </MenuItem>
                <MenuItem onClick={() => { setAnchorEl(null); }}>
                    <ListItemIcon>
                        <BusinessCenterRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> Saved Jobs </Typography>
                </MenuItem>
                <MenuItem onClick={() => { setAnchorEl(null); }}>
                    <ListItemIcon>
                        <PeopleRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> Saved Mentors </Typography>
                </MenuItem>

                <Divider variant="middle" />

                <MenuItem onClick={() => {setAnchorEl(null); logOut(); }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> Logout </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AccountMenu;
