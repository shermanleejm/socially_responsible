import React, { Component } from 'react';
import { Container, Button, Grid, Box } from '@material-ui/core';
import logo from '../images/logo.svg';
import Link from '@material-ui/core/Link';
import { Link as Linking } from 'react-router-dom';
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,

        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    margin: {
        margin: theme.spacing(1),
    },
    color: {
        backgroundColor: 'black'
    }
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            'BlinkMacSystemFont',
        ],
        fontColor: [
            '#1E3F66'
        ]

    },
});



export const InvestorSignUp = () => {
    const classes = useStyles();

    const [companyUEN, addCompanyUEN] = React.useState("");
    const [password, addPassword] = React.useState(1);
    
    const handleCompanyUEN = (event) => {
        addCompanyUEN(event.target.value);
    }
    const handlePassword = (event) => {
        addPassword(event.target.value);
    }

    const register = () => {

    }
    return (


        <Grid container
            direction="column"
            justify="center"
            alignItems="center" >
            <div>
                <Grid container
                    direction="column"
                    spacing={2} className={classes.root}
                    style={{ padding: 30 }}
                >
                    <Grid item xs={12}>
                        <img src={logo} alt="logo" height="200px" />
                        <h1 style={{ 'color': '#1E3F66' }}> <ThemeProvider theme={theme}>
                            <Typography variant="h3">Start your journey with Edison as an Investor!</Typography>
                        </ThemeProvider></h1>
                    </Grid>

                    <Grid item xs={12} >
                        <RedditTextField
                            fullWidth
                            label="UEN"
                            className={classes.margin}
                            variant="filled"
                            onChange = {handleCompanyUEN}
                            id="reddit-input"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            onChange = {handlePassword}
                            autoComplete="current-password"
                            variant="filled"
                            size="small"
                            helperText="We will never share your password."
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary.main3"
                            onClick = {register}
                        >
                            <div style={{ 'color': 'white' }}>Register</div>
                        </Button>
                    </Grid>


                </Grid>
            </div>
        </Grid>

    );
}



