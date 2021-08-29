import React, { Component } from 'react';
import { Container, Button, Grid ,Box} from '@material-ui/core';
import logo from '../images/logo.svg';
import Link from '@material-ui/core/Link';
import { Link as Linking} from 'react-router-dom';
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

export const Login = () => {
    const classes = useStyles();
    return (
        
        <Box borderRadius="50%">
            <Grid container
                direction="column"
                justify="center"
                alignItems="center" >
                <div>
                    <Grid container
                        direction="column"
                        alignItems="center" spacing={2} className = {classes.root}
                        style={{ padding: 30 }}
                    >
                <img src={logo} alt="logo" height="300px" />
                                <h1 style={{ 'color': '#1E3F66' }}> <ThemeProvider theme={theme}>
                                    <Typography variant="h3">Welcome to Einstein!</Typography>
                                </ThemeProvider></h1>
                        <Grid item xs={12} >
                            <RedditTextField
                                style={{ 'width': '400px' }}
                                label="Email"
                                className={classes.margin}
                                variant="filled"
                                id="reddit-input"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RedditTextField
                                style={{ 'width': '400px' }}
                                label="Password"
                                className={classes.margin}
                                variant="filled"
                                id="reddit-input"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                style={{ 'width': '400px' }}
                                variant="contained"
                                color="secondary"
                            >
                                <div style={{ 'color': 'white' }}>Sign In</div>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container
                                direction="row"
                                alignItems="center" spacing={7}
                            >
                                <Grid item xs={5}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        component={Linking}
                                        to={'/login'}
                                    >
                                        <div style={{ 'color': '#1E3F66' }}><ThemeProvider theme={theme}>
                                            <Typography noWrap variant='subtitle23'>Forget your password?</Typography>
                                        </ThemeProvider></div>
                                    </Link>
                                </Grid>
                                <Grid item xs={7}>
                                <Link
                                        component="button"
                                        variant="body2"
                                        component={Linking}
                                        to={'/signup'}
                                    >
                                        <div style={{ 'color': '#1E3F66' }}><ThemeProvider theme={theme}>
                                            <Typography noWrap variant='subtitle23'>Don't have an account? Sign up!</Typography>
                                        </ThemeProvider></div>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            </Grid>
        </Box>
    );
}



