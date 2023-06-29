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
import './Mentor.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

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
    backgroundColor: "#FFFFFF",
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

const StyledDialogContentText = styled(DialogContentText)`
  color: black;
`;

const Mentor = ({ degree, location, data }) => {
    const [open, setOpen] = useState(false); // State to manage dialog open/close
    const [selectedMentor, setSelectedMentor] = useState(null);

    if (!data || data.length === 0) {
        return <div>No Mentors available</div>;
    }

    let filteredData = data;
    if (degree !== 'All') {
        filteredData = filteredData.filter((mentor) => mentor.degree === degree);
    }


    const handleApply = () => {
        window.open(data[0].ment_linkedin, "_blank");
    };

    const handleDiscord = () => {
        window.open("https://discord.com/", "_blank");
    };

    const handleRowClick = (mentor) => {
        setSelectedMentor(mentor)
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
                <Table sx={{ minWidth: 1500 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"><h4>Profile Picture</h4></StyledTableCell>
                            <StyledTableCell align="center"><h4>Name</h4></StyledTableCell>
                            <StyledTableCell align="center"><h4>Profession</h4></StyledTableCell>
                            <StyledTableCell align="center"><h4>More Infiormation</h4></StyledTableCell>
                            <StyledTableCell align="center"><h4>LinkedIn</h4></StyledTableCell>
                            <StyledTableCell align="center"><h4>Save</h4></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((mentor, key) => {
                            return (

                                <StyledTableRow key={key}>
                                    <StyledTableCell align="center">      <a href="https://google.com" target="_blank" rel="noreferrer">
                                        <img style={{ width: 150, height: 150, borderRadius: 100 }}
                                            src={mentor.ment_image}
                                            alt="example"
                                        />
                                    </a></StyledTableCell>
                                    <StyledTableCell align="center" width={225}><h2>{mentor.ment_name}</h2></StyledTableCell>
                                    <StyledTableCell align="center" width={225}><h2>{mentor.ment_profession}</h2></StyledTableCell>
                                    <StyledTableCell align="center" width={225}> <StyledConnectButton onClick={() => handleRowClick(mentor)} variant="contained">More Info</StyledConnectButton></StyledTableCell>
                                    <StyledTableCell align="center" width={225}> <StyledConnectButton onClick={handleApply} variant="contained">Connnect</StyledConnectButton></StyledTableCell>
                                    <StyledTableCell align="center" width={150}>
                                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1631 2.73721C10.8573 1.12529 13.1427 1.12528 13.8369 2.73721L15.4229 6.42012C15.5677 6.75629 15.8846 6.98652 16.249 7.02032L20.2418 7.39064C21.9893 7.55272 22.6956 9.72634 21.3771 10.8846L18.3645 13.5311C18.0895 13.7727 17.9685 14.1452 18.049 14.5023L18.9306 18.414C19.3165 20.1261 17.4675 21.4695 15.9584 20.5735L12.5106 18.5262C12.1958 18.3393 11.8042 18.3393 11.4894 18.5262L8.04157 20.5735C6.53251 21.4695 4.68351 20.1261 5.06939 18.414L5.95102 14.5023C6.0315 14.1452 5.91047 13.7727 5.63548 13.5311L2.62294 10.8846C1.30441 9.72634 2.01066 7.55272 3.75821 7.39064L7.75097 7.02032C8.11543 6.98652 8.4323 6.75629 8.57707 6.42012L10.1631 2.73721ZM13.586 7.21117L12 3.52827L10.414 7.21117C9.97966 8.2197 9.02905 8.91036 7.93567 9.01177L3.94291 9.38209L6.95545 12.0286C7.78041 12.7533 8.14351 13.8708 7.90208 14.942L7.02045 18.8538L10.4683 16.8065C11.4125 16.2458 12.5875 16.2458 13.5317 16.8065L16.9796 18.8538L16.0979 14.942C15.8565 13.8708 16.2196 12.7533 17.0446 12.0286L20.0571 9.38209L16.0643 9.01177C14.971 8.91036 14.0203 8.2197 13.586 7.21117Z" fill="#742092" />
                                        </svg>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog */}
            <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <div>
                        <svg width="25" height="25" viewBox="0 0 30 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClose}>
                            <path d="M14.0529 18.8528C14.299 18.6066 14.4372 18.2729 14.4372 17.9248C14.4372 17.5768 14.299 17.243 14.0529 16.9969L7.55606 10.5L14.0529 4.00315C14.292 3.75561 14.4243 3.42407 14.4213 3.07994C14.4183 2.73581 14.2803 2.40661 14.037 2.16327C13.7936 1.91992 13.4644 1.78188 13.1203 1.7789C12.7761 1.77591 12.4446 1.9082 12.1971 2.14728L4.77225 9.57209C4.5262 9.81822 4.38797 10.152 4.38797 10.5C4.38797 10.8481 4.5262 11.1818 4.77225 11.428L12.1971 18.8528C12.4432 19.0988 12.777 19.2371 13.125 19.2371C13.473 19.2371 13.8068 19.0988 14.0529 18.8528Z" fill="black" />
                        </svg>
                        <Button onClick={handleClose} style={{ fontSize: 18, color: "black" }}>About this Mentor</Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ width: 225, height: 225, borderRadius: 110, marginRight: 80, marginTop: 20 }}
                            src={selectedMentor?.ment_image}
                            alt="Profile"
                        />
                        <div style={{ marginRight: 80 }}>
                            <h2 align="center">{selectedMentor?.ment_name}</h2>
                            <hr width="200px"></hr>
                            <p align="center">{selectedMentor?.ment_profession}</p>
                        </div>
                        <div style={{ marginRight: 0 }}>
                            <StyledConnectButton onClick={handleDiscord} variant="contained" style={{width: 240, height: 50}}><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.7682 1.33005C16.4382 0.710046 14.9982 0.260046 13.4982 4.59982e-05C13.485 -0.000374605 13.4719 0.00209348 13.4598 0.00727676C13.4477 0.01246 13.4369 0.0202326 13.4282 0.0300462C13.2482 0.360046 13.0382 0.790046 12.8982 1.12005C11.3072 0.880046 9.68916 0.880046 8.09816 1.12005C7.95816 0.780046 7.74816 0.360046 7.55816 0.0300462C7.54816 0.0100462 7.51816 4.59982e-05 7.48816 4.59982e-05C5.98816 0.260046 4.55816 0.710046 3.21816 1.33005C3.20816 1.33005 3.19816 1.34005 3.18816 1.35005C0.468164 5.42005 -0.281836 9.38004 0.0881641 13.3C0.0881641 13.32 0.0981641 13.34 0.118164 13.35C1.91816 14.67 3.64816 15.47 5.35816 16C5.38816 16.01 5.41816 16 5.42816 15.98C5.82816 15.43 6.18816 14.85 6.49816 14.24C6.51816 14.2 6.49816 14.16 6.45816 14.15C5.88816 13.93 5.34816 13.67 4.81816 13.37C4.77816 13.35 4.77816 13.29 4.80816 13.26C4.91816 13.18 5.02816 13.09 5.13816 13.01C5.15816 12.99 5.18816 12.99 5.20816 13C8.64816 14.57 12.3582 14.57 15.7582 13C15.7782 12.99 15.8082 12.99 15.8282 13.01C15.9382 13.1 16.0482 13.18 16.1582 13.27C16.1982 13.3 16.1982 13.36 16.1482 13.38C15.6282 13.69 15.0782 13.94 14.5082 14.16C14.4682 14.17 14.4582 14.22 14.4682 14.25C14.7882 14.86 15.1482 15.44 15.5382 15.99C15.5682 16 15.5982 16.01 15.6282 16C17.3482 15.47 19.0782 14.67 20.8782 13.35C20.8982 13.34 20.9082 13.32 20.9082 13.3C21.3482 8.77004 20.1782 4.84005 17.8082 1.35005C17.7982 1.34005 17.7882 1.33005 17.7682 1.33005ZM7.01816 10.91C5.98816 10.91 5.12816 9.96005 5.12816 8.79005C5.12816 7.62005 5.96816 6.67005 7.01816 6.67005C8.07817 6.67005 8.91816 7.63005 8.90816 8.79005C8.90816 9.96005 8.06816 10.91 7.01816 10.91ZM13.9882 10.91C12.9582 10.91 12.0982 9.96005 12.0982 8.79005C12.0982 7.62005 12.9382 6.67005 13.9882 6.67005C15.0482 6.67005 15.8882 7.63005 15.8782 8.79005C15.8782 9.96005 15.0482 10.91 13.9882 10.91Z" fill="white" />
                            </svg>
                                 &nbsp; Connnect on Discord</StyledConnectButton>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <StyledDialogContentText>
                        <div>
                            <h3 align="center">About {selectedMentor?.ment_name}</h3>
                            <hr></hr>
                            <br></br>
                            <p>{selectedMentor?.ment_desc}</p>
                        </div>
                        <div>
                            <h3 align="center">Ratings</h3>
                            <hr></hr>
                            <br></br>
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={5} style={{ border: "1px solid rgba(0, 0, 0, 0.7);", borderRadius: 10, marginLeft: 50 }}>
                                        <Item><h3 style={{ fontColor: "#000000" }}>Angie.S</h3><svg width="100" height="17" viewBox="0 0 97 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5503 7.74364L13.9286 10.8418L15.0135 15.4544C15.0709 15.6955 15.0545 15.9479 14.9664 16.1799C14.8783 16.412 14.7223 16.6134 14.518 16.7591C14.3137 16.9047 14.0702 16.9881 13.8178 16.9988C13.5654 17.0095 13.3154 16.9471 13.0991 16.8193L8.99478 14.3792L4.89932 16.8193C4.68296 16.9471 4.43296 17.0095 4.18058 16.9988C3.9282 16.9881 3.68464 16.9047 3.48035 16.7591C3.27606 16.6134 3.12011 16.412 3.03198 16.1799C2.94386 15.9479 2.92748 15.6955 2.98489 15.4544L4.06818 10.8465L0.445701 7.74364C0.254104 7.58167 0.11556 7.36785 0.0474417 7.129C-0.0206766 6.89016 -0.0153364 6.63692 0.0627924 6.40104C0.140921 6.16515 0.288361 5.95713 0.486622 5.80306C0.684883 5.64898 0.925139 5.55572 1.17726 5.53495L5.95209 5.12958L7.81593 0.772018C7.91326 0.54337 8.07744 0.34806 8.28778 0.210682C8.49812 0.073304 8.74523 0 8.99799 0C9.25075 0 9.49786 0.073304 9.70821 0.210682C9.91855 0.34806 10.0827 0.54337 10.1801 0.772018L12.0495 5.12958L16.8227 5.53495C17.0749 5.55572 17.3151 5.64898 17.5134 5.80306C17.7116 5.95713 17.8591 6.16515 17.9372 6.40104C18.0153 6.63692 18.0207 6.89016 17.9526 7.129C17.8844 7.36785 17.7459 7.58167 17.5543 7.74364H17.5503Z" fill="#FFC973" />
                                            <path d="M37.5503 7.74364L33.9286 10.8418L35.0135 15.4544C35.0709 15.6955 35.0545 15.9479 34.9664 16.1799C34.8783 16.412 34.7223 16.6134 34.518 16.7591C34.3137 16.9047 34.0702 16.9881 33.8178 16.9988C33.5654 17.0095 33.3154 16.9471 33.0991 16.8193L28.9948 14.3792L24.8993 16.8193C24.683 16.9471 24.433 17.0095 24.1806 16.9988C23.9282 16.9881 23.6846 16.9047 23.4804 16.7591C23.2761 16.6134 23.1201 16.412 23.032 16.1799C22.9439 15.9479 22.9275 15.6955 22.9849 15.4544L24.0682 10.8465L20.4457 7.74364C20.2541 7.58167 20.1156 7.36785 20.0474 7.129C19.9793 6.89016 19.9847 6.63692 20.0628 6.40104C20.1409 6.16515 20.2884 5.95713 20.4866 5.80306C20.6849 5.64898 20.9251 5.55572 21.1773 5.53495L25.9521 5.12958L27.8159 0.772018C27.9133 0.54337 28.0774 0.34806 28.2878 0.210682C28.4981 0.073304 28.7452 0 28.998 0C29.2508 0 29.4979 0.073304 29.7082 0.210682C29.9185 0.34806 30.0827 0.54337 30.1801 0.772018L32.0495 5.12958L36.8227 5.53495C37.0749 5.55572 37.3151 5.64898 37.5134 5.80306C37.7116 5.95713 37.8591 6.16515 37.9372 6.40104C38.0153 6.63692 38.0207 6.89016 37.9526 7.129C37.8844 7.36785 37.7459 7.58167 37.5543 7.74364H37.5503Z" fill="#FFC973" />
                                            <path d="M56.5753 7.74364L53.1548 10.8418L54.1794 15.4544C54.2336 15.6955 54.2182 15.9479 54.1349 16.1799C54.0517 16.412 53.9044 16.6134 53.7115 16.7591C53.5185 16.9047 53.2885 16.9881 53.0502 16.9988C52.8118 17.0095 52.5757 16.9471 52.3714 16.8193L48.4951 14.3792L44.6271 16.8193C44.4228 16.9471 44.1867 17.0095 43.9483 16.9988C43.71 16.9881 43.4799 16.9047 43.287 16.7591C43.0941 16.6134 42.9468 16.412 42.8635 16.1799C42.7803 15.9479 42.7648 15.6955 42.8191 15.4544L43.8422 10.8465L40.4209 7.74364C40.24 7.58167 40.1091 7.36785 40.0448 7.129C39.9805 6.89016 39.9855 6.63692 40.0593 6.40104C40.1331 6.16515 40.2723 5.95713 40.4596 5.80306C40.6468 5.64898 40.8737 5.55572 41.1119 5.53495L45.6214 5.12958L47.3817 0.772018C47.4736 0.54337 47.6287 0.34806 47.8273 0.210682C48.026 0.073304 48.2594 0 48.4981 0C48.7368 0 48.9702 0.073304 49.1689 0.210682C49.3675 0.34806 49.5226 0.54337 49.6145 0.772018L51.3801 5.12958L55.8881 5.53495C56.1263 5.55572 56.3532 5.64898 56.5404 5.80306C56.7277 5.95713 56.8669 6.16515 56.9407 6.40104C57.0145 6.63692 57.0195 6.89016 56.9552 7.129C56.8909 7.36785 56.76 7.58167 56.5791 7.74364H56.5753Z" fill="#FFC973" />
                                            <path d="M76.5503 7.74364L72.9286 10.8418L74.0135 15.4544C74.0709 15.6955 74.0545 15.9479 73.9664 16.1799C73.8783 16.412 73.7223 16.6134 73.518 16.7591C73.3137 16.9047 73.0702 16.9881 72.8178 16.9988C72.5654 17.0095 72.3154 16.9471 72.0991 16.8193L67.9948 14.3792L63.8993 16.8193C63.683 16.9471 63.433 17.0095 63.1806 16.9988C62.9282 16.9881 62.6846 16.9047 62.4804 16.7591C62.2761 16.6134 62.1201 16.412 62.032 16.1799C61.9439 15.9479 61.9275 15.6955 61.9849 15.4544L63.0682 10.8465L59.4457 7.74364C59.2541 7.58167 59.1156 7.36785 59.0474 7.129C58.9793 6.89016 58.9847 6.63692 59.0628 6.40104C59.1409 6.16515 59.2884 5.95713 59.4866 5.80306C59.6849 5.64898 59.9251 5.55572 60.1773 5.53495L64.9521 5.12958L66.8159 0.772018C66.9133 0.54337 67.0774 0.34806 67.2878 0.210682C67.4981 0.073304 67.7452 0 67.998 0C68.2508 0 68.4979 0.073304 68.7082 0.210682C68.9185 0.34806 69.0827 0.54337 69.1801 0.772018L71.0495 5.12958L75.8227 5.53495C76.0749 5.55572 76.3151 5.64898 76.5134 5.80306C76.7116 5.95713 76.8591 6.16515 76.9372 6.40104C77.0153 6.63692 77.0207 6.89016 76.9526 7.129C76.8844 7.36785 76.7459 7.58167 76.5543 7.74364H76.5503Z" fill="#FFC973" />
                                            <path d="M96.5503 7.74364L92.9286 10.8418L94.0135 15.4544C94.0709 15.6955 94.0545 15.9479 93.9664 16.1799C93.8783 16.412 93.7223 16.6134 93.518 16.7591C93.3137 16.9047 93.0702 16.9881 92.8178 16.9988C92.5654 17.0095 92.3154 16.9471 92.0991 16.8193L87.9948 14.3792L83.8993 16.8193C83.683 16.9471 83.433 17.0095 83.1806 16.9988C82.9282 16.9881 82.6846 16.9047 82.4804 16.7591C82.2761 16.6134 82.1201 16.412 82.032 16.1799C81.9439 15.9479 81.9275 15.6955 81.9849 15.4544L83.0682 10.8465L79.4457 7.74364C79.2541 7.58167 79.1156 7.36785 79.0474 7.129C78.9793 6.89016 78.9847 6.63692 79.0628 6.40104C79.1409 6.16515 79.2884 5.95713 79.4866 5.80306C79.6849 5.64898 79.9251 5.55572 80.1773 5.53495L84.9521 5.12958L86.8159 0.772018C86.9133 0.54337 87.0774 0.34806 87.2878 0.210682C87.4981 0.073304 87.7452 0 87.998 0C88.2508 0 88.4979 0.073304 88.7082 0.210682C88.9185 0.34806 89.0827 0.54337 89.1801 0.772018L91.0495 5.12958L95.8227 5.53495C96.0749 5.55572 96.3151 5.64898 96.5134 5.80306C96.7116 5.95713 96.8591 6.16515 96.9372 6.40104C97.0153 6.63692 97.0207 6.89016 96.9526 7.129C96.8844 7.36785 96.7459 7.58167 96.5543 7.74364H96.5503Z" fill="#FFC973" />
                                        </svg>
                                            <h4>This, Mentor is great, I rate them 5 starts and would recommend to anyone looking for some helpful advice or opinions.</h4>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={5} style={{ border: "1px solid rgba(0, 0, 0, 0.7);", borderRadius: 10, marginLeft: 50 }}>
                                        <Item><h3 style={{ fontColor: "#000000" }}>Timothy.H</h3><svg width="100" height="17" viewBox="20 0 97 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5503 7.74364L13.9286 10.8418L15.0135 15.4544C15.0709 15.6955 15.0545 15.9479 14.9664 16.1799C14.8783 16.412 14.7223 16.6134 14.518 16.7591C14.3137 16.9047 14.0702 16.9881 13.8178 16.9988C13.5654 17.0095 13.3154 16.9471 13.0991 16.8193L8.99478 14.3792L4.89932 16.8193C4.68296 16.9471 4.43296 17.0095 4.18058 16.9988C3.9282 16.9881 3.68464 16.9047 3.48035 16.7591C3.27606 16.6134 3.12011 16.412 3.03198 16.1799C2.94386 15.9479 2.92748 15.6955 2.98489 15.4544L4.06818 10.8465L0.445701 7.74364C0.254104 7.58167 0.11556 7.36785 0.0474417 7.129C-0.0206766 6.89016 -0.0153364 6.63692 0.0627924 6.40104C0.140921 6.16515 0.288361 5.95713 0.486622 5.80306C0.684883 5.64898 0.925139 5.55572 1.17726 5.53495L5.95209 5.12958L7.81593 0.772018C7.91326 0.54337 8.07744 0.34806 8.28778 0.210682C8.49812 0.073304 8.74523 0 8.99799 0C9.25075 0 9.49786 0.073304 9.70821 0.210682C9.91855 0.34806 10.0827 0.54337 10.1801 0.772018L12.0495 5.12958L16.8227 5.53495C17.0749 5.55572 17.3151 5.64898 17.5134 5.80306C17.7116 5.95713 17.8591 6.16515 17.9372 6.40104C18.0153 6.63692 18.0207 6.89016 17.9526 7.129C17.8844 7.36785 17.7459 7.58167 17.5543 7.74364H17.5503Z" fill="#FFC973" />
                                            <path d="M37.5503 7.74364L33.9286 10.8418L35.0135 15.4544C35.0709 15.6955 35.0545 15.9479 34.9664 16.1799C34.8783 16.412 34.7223 16.6134 34.518 16.7591C34.3137 16.9047 34.0702 16.9881 33.8178 16.9988C33.5654 17.0095 33.3154 16.9471 33.0991 16.8193L28.9948 14.3792L24.8993 16.8193C24.683 16.9471 24.433 17.0095 24.1806 16.9988C23.9282 16.9881 23.6846 16.9047 23.4804 16.7591C23.2761 16.6134 23.1201 16.412 23.032 16.1799C22.9439 15.9479 22.9275 15.6955 22.9849 15.4544L24.0682 10.8465L20.4457 7.74364C20.2541 7.58167 20.1156 7.36785 20.0474 7.129C19.9793 6.89016 19.9847 6.63692 20.0628 6.40104C20.1409 6.16515 20.2884 5.95713 20.4866 5.80306C20.6849 5.64898 20.9251 5.55572 21.1773 5.53495L25.9521 5.12958L27.8159 0.772018C27.9133 0.54337 28.0774 0.34806 28.2878 0.210682C28.4981 0.073304 28.7452 0 28.998 0C29.2508 0 29.4979 0.073304 29.7082 0.210682C29.9185 0.34806 30.0827 0.54337 30.1801 0.772018L32.0495 5.12958L36.8227 5.53495C37.0749 5.55572 37.3151 5.64898 37.5134 5.80306C37.7116 5.95713 37.8591 6.16515 37.9372 6.40104C38.0153 6.63692 38.0207 6.89016 37.9526 7.129C37.8844 7.36785 37.7459 7.58167 37.5543 7.74364H37.5503Z" fill="#FFC973" />
                                            <path d="M56.5753 7.74364L53.1548 10.8418L54.1794 15.4544C54.2336 15.6955 54.2182 15.9479 54.1349 16.1799C54.0517 16.412 53.9044 16.6134 53.7115 16.7591C53.5185 16.9047 53.2885 16.9881 53.0502 16.9988C52.8118 17.0095 52.5757 16.9471 52.3714 16.8193L48.4951 14.3792L44.6271 16.8193C44.4228 16.9471 44.1867 17.0095 43.9483 16.9988C43.71 16.9881 43.4799 16.9047 43.287 16.7591C43.0941 16.6134 42.9468 16.412 42.8635 16.1799C42.7803 15.9479 42.7648 15.6955 42.8191 15.4544L43.8422 10.8465L40.4209 7.74364C40.24 7.58167 40.1091 7.36785 40.0448 7.129C39.9805 6.89016 39.9855 6.63692 40.0593 6.40104C40.1331 6.16515 40.2723 5.95713 40.4596 5.80306C40.6468 5.64898 40.8737 5.55572 41.1119 5.53495L45.6214 5.12958L47.3817 0.772018C47.4736 0.54337 47.6287 0.34806 47.8273 0.210682C48.026 0.073304 48.2594 0 48.4981 0C48.7368 0 48.9702 0.073304 49.1689 0.210682C49.3675 0.34806 49.5226 0.54337 49.6145 0.772018L51.3801 5.12958L55.8881 5.53495C56.1263 5.55572 56.3532 5.64898 56.5404 5.80306C56.7277 5.95713 56.8669 6.16515 56.9407 6.40104C57.0145 6.63692 57.0195 6.89016 56.9552 7.129C56.8909 7.36785 56.76 7.58167 56.5791 7.74364H56.5753Z" fill="#FFC973" />
                                            <path d="M76.5503 7.74364L72.9286 10.8418L74.0135 15.4544C74.0709 15.6955 74.0545 15.9479 73.9664 16.1799C73.8783 16.412 73.7223 16.6134 73.518 16.7591C73.3137 16.9047 73.0702 16.9881 72.8178 16.9988C72.5654 17.0095 72.3154 16.9471 72.0991 16.8193L67.9948 14.3792L63.8993 16.8193C63.683 16.9471 63.433 17.0095 63.1806 16.9988C62.9282 16.9881 62.6846 16.9047 62.4804 16.7591C62.2761 16.6134 62.1201 16.412 62.032 16.1799C61.9439 15.9479 61.9275 15.6955 61.9849 15.4544L63.0682 10.8465L59.4457 7.74364C59.2541 7.58167 59.1156 7.36785 59.0474 7.129C58.9793 6.89016 58.9847 6.63692 59.0628 6.40104C59.1409 6.16515 59.2884 5.95713 59.4866 5.80306C59.6849 5.64898 59.9251 5.55572 60.1773 5.53495L64.9521 5.12958L66.8159 0.772018C66.9133 0.54337 67.0774 0.34806 67.2878 0.210682C67.4981 0.073304 67.7452 0 67.998 0C68.2508 0 68.4979 0.073304 68.7082 0.210682C68.9185 0.34806 69.0827 0.54337 69.1801 0.772018L71.0495 5.12958L75.8227 5.53495C76.0749 5.55572 76.3151 5.64898 76.5134 5.80306C76.7116 5.95713 76.8591 6.16515 76.9372 6.40104C77.0153 6.63692 77.0207 6.89016 76.9526 7.129C76.8844 7.36785 76.7459 7.58167 76.5543 7.74364H76.5503Z" fill="#FFC973" />
                                            <path d="M96.5503 7.74364L92.9286 10.8418L94.0135 15.4544C94.0709 15.6955 94.0545 15.9479 93.9664 16.1799C93.8783 16.412 93.7223 16.6134 93.518 16.7591C93.3137 16.9047 93.0702 16.9881 92.8178 16.9988C92.5654 17.0095 92.3154 16.9471 92.0991 16.8193L87.9948 14.3792L83.8993 16.8193C83.683 16.9471 83.433 17.0095 83.1806 16.9988C82.9282 16.9881 82.6846 16.9047 82.4804 16.7591C82.2761 16.6134 82.1201 16.412 82.032 16.1799C81.9439 15.9479 81.9275 15.6955 81.9849 15.4544L83.0682 10.8465L79.4457 7.74364C79.2541 7.58167 79.1156 7.36785 79.0474 7.129C78.9793 6.89016 78.9847 6.63692 79.0628 6.40104C79.1409 6.16515 79.2884 5.95713 79.4866 5.80306C79.6849 5.64898 79.9251 5.55572 80.1773 5.53495L84.9521 5.12958L86.8159 0.772018C86.9133 0.54337 87.0774 0.34806 87.2878 0.210682C87.4981 0.073304 87.7452 0 87.998 0C88.2508 0 88.4979 0.073304 88.7082 0.210682C88.9185 0.34806 89.0827 0.54337 89.1801 0.772018L91.0495 5.12958L95.8227 5.53495C96.0749 5.55572 96.3151 5.64898 96.5134 5.80306C96.7116 5.95713 96.8591 6.16515 96.9372 6.40104C97.0153 6.63692 97.0207 6.89016 96.9526 7.129C96.8844 7.36785 96.7459 7.58167 96.5543 7.74364H96.5503Z" fill="#FFC973" />
                                        </svg>
                                            <h4>This Menotr lead me on the right track, and provided the guidence I needed to help me inform my decision my choice of future.</h4>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>

                        </div>
                        <br></br>
                        <div>
                            <h3 align="center">Avalbility Calender</h3>
                            <hr></hr>
                            <br></br>
                            <img
                                style={{ width: 850 }}
                                src={'https://www.calendar.best/images/weekly/weekly-calendar-3-purple.jpg'}
                                alt="Profile"
                            />
                        </div>
                        {/* Display row details in the dialog */}
                        {/* Example: data[0].ment_name, data[0].ment_profession, etc. */}
                    </StyledDialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
};

export default Mentor;
