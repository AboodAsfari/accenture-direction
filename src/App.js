import {
  Alert,
  AppBar,
  Box,
  CssBaseline,
  FormControlLabel,
  ThemeProvider,
  Toolbar,
  Typography,
  Snackbar,
  Stack,
  Button,
} from "@mui/material";
import LoginDialog from "./LoginDialog";
import CareerAdvice from "./CareerAdvice";

function App() {
  return (
    <>
    <AppBar position="sticky" component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
              (LOGO HERE) Direction- Career Advisory
          </Typography>
          <Stack direction={"row"} sx={{ position: "fixed", right: 20 }}>
            <Button variant="container"> Log In </Button>
            <Button variant="container"> Sign Up </Button>
          </Stack>
        </Toolbar>
    </AppBar>

    <CareerAdvice />

    <LoginDialog open={false}></LoginDialog>
    </>
  );
}

export default App;
