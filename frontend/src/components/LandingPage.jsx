import React from 'react';
import logo from '../images/logo.svg';
import { Container, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: '100px',
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme.palette.primary.main2,
      color: 'white',
    },
    heading: {
      color: 'white',
      margin: '0 0 40px 0',
    },
  };
});

export const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={logo} alt="logo" height="300px" />

<<<<<<< HEAD
      <Container style={{ 'padding-top': '0px' , 'width' : '500px'}}>
        <h1 style = {{'color': 'white'}}>Welcome to Edison!</h1>
        <p>
          We primarily primarily connects banks and SME owners to provide microfinancing
          opportunities, allowing banks to loan SMEs.
        </p>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
=======
      <Container style={{ 'padding-top': '0px' }}>
        <div className={classes.heading}>
          <Typography variant="h2">Welcome to Edison!</Typography>

          <Typography variant="h6">
            We are the bridge between small businesses and financial excellence.
          </Typography>
        </div>

        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
>>>>>>> 17ddf38a3c62cb01d1e8b8f64412ca782eee03d0
          <Grid item>
            <Button
              variant="contained"
              component={Link}
<<<<<<< HEAD
              to={'/login'}
            >
              <div style = {{'color': 'white', 'width': '130px'}}>
              SME Login
              </div>

=======
              to={'/login-sme'}
              className={classes.button}
            >
              Small Businesses
>>>>>>> 17ddf38a3c62cb01d1e8b8f64412ca782eee03d0
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={'/login-investor'}
            >
<<<<<<< HEAD
              <div style = {{'color': 'white', 'width': '130px'}}>
              Investor Login
              </div>
=======
              Investor
>>>>>>> 17ddf38a3c62cb01d1e8b8f64412ca782eee03d0
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
