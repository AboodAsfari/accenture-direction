import React from "react";
import {
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from '@mui/icons-material/Star';
import TagFacesRoundedIcon from "@mui/icons-material/TagFacesRounded";

/** A dropdown menu that opens other account-related dialogs. */
const AccountMenu = (props) => {
    const {
        logOut,
        openProfile,
        openSavedJobs,
        openSavedMentors,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    return (
        <Box sx={{ mr: 2 }}>
            <IconButton color="inherit" onClick={(event) => setAnchorEl(event.target)}>
                <AccountCircleRoundedIcon color="inherit" fontSize="large"/>
            </IconButton>
            
            <Menu open={menuOpen} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: "right", vertical: "top" }} 
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={() => { openProfile(); setAnchorEl(null); }}>
                    <ListItemIcon>
                        <TagFacesRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> My Profile </Typography>
                </MenuItem>
                <MenuItem onClick={() => { openSavedJobs(); setAnchorEl(null); }}>
                    <ListItemIcon>
                        <StarIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="body1"> Saved Jobs </Typography>
                </MenuItem>
                <MenuItem onClick={() => { openSavedMentors(); setAnchorEl(null); }}>
                    <ListItemIcon>
                        <StarIcon fontSize="small"/>
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
