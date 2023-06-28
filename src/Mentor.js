import React, { useState } from "react";
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';  
import { shadows } from '@mui/system';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'purple',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    backgroundColor: "#F5F5F5",
    // hide last border
}));

const StyledConnectButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px', // Adjust the border radius value as needed
    backgroundColor: 'purple',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkpurple', // Add a darker shade for the hover state if desired
    },
  }));

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    border-radius: 10px;
  }
`;


const Mentor = ({ degree, location, data }) => {
    const [open, setOpen] = useState(false); // State to manage dialog open/close

    if (!data || data.length === 0) {
        return <div>No Mentors available</div>;
    }

    const handleApply = () => {
        window.location.href = data[0].ment_linkedin;
    };

    const handleRowClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    

    return (
        <div>
            <div>
                <p></p>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Profile Picture</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Profession</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">LinkedIn</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow onClick={handleRowClick} marginBottom={10}>
                            <StyledTableCell align="center">      <a href="https://google.com" target="_blank" rel="noreferrer">
                                <img style={{ width: 80, height: 80 }}
                                    src={data[0].ment_image}
                                    alt="example"
                                />
                            </a></StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_name}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_profession}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_desc}</StyledTableCell>
                            <StyledTableCell align="center" width={225}> <StyledConnectButton onClick={handleApply} variant="contained">Connnect</StyledConnectButton></StyledTableCell>
                        </StyledTableRow>
                        <br></br>
                        <StyledTableRow onClick={handleRowClick}>
                            <StyledTableCell align="center">      <a href="https://google.com" target="_blank" rel="noreferrer">
                                <img style={{ width: 80, height: 80 }}
                                    src={data[0].ment_image}
                                    alt="example"
                                />
                            </a></StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_name}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_profession}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_desc}</StyledTableCell>
                            <StyledTableCell align="center" width={225}> <StyledConnectButton onClick={handleApply} variant="contained">Connnect</StyledConnectButton></StyledTableCell>
                        </StyledTableRow>
                        <br></br>
                        <StyledTableRow onClick={handleRowClick}>
                            <StyledTableCell align="center">      <a href="https://google.com" target="_blank" rel="noreferrer">
                                <img style={{ width: 100, height: 100, borderRadius:50 }}
                                    src={data[0].ment_image}
                                    alt="example"
                                />
                            </a></StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_name}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_profession}</StyledTableCell>
                            <StyledTableCell align="center" width={225}>{data[0].ment_desc}</StyledTableCell>
                            <StyledTableCell align="center" width={225}> <StyledConnectButton onClick={handleApply} variant="contained">Connnect</StyledConnectButton></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog */}
            <StyledDialog open={open} onClose={handleClose}  maxWidth="md" fullWidth>
                <DialogTitle>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ width: 225, height: 225, borderRadius:110, marginRight: 100, marginTop: 10}}
                            src={data[0].ment_image}
                            alt="Profile"
                        />
                        <div style={{marginRight: 200}}>
                            <h2>{data[0].ment_name}</h2>
                            <p>{data[0].ment_profession}</p>
                        </div>
                        <div style={{marginRight: 50}}>
                        <StyledConnectButton onClick={handleApply} variant="contained">Connnect</StyledConnectButton>
                        </div>
                    </div>
                    <div>
                        <h3>About {data[0].ment_name}</h3>
                        <p>A random description about the user so that the space looks filled and taken up, this paragrapgh doesnt really have any meaning. I dont know why your still reading this. this is literally wasting your time.</p>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>


                        {/* Display row details in the dialog */}
                        {/* Example: data[0].ment_name, data[0].ment_profession, etc. */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
                </StyledDialog>
        </div>
    );
};

export default Mentor;
