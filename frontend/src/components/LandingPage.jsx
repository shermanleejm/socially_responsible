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

      <Container style={{ 'padding-top': '0px' }}>
        <div className={classes.heading}>
          <Typography variant="h2">Welcome to Edison!</Typography>

          <Typography variant="h6">
            We are the bridge between small businesses and financial excellence.
          </Typography>
        </div>

        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to={'/loginSME'}
              className={classes.button}
            >
              Small Businesses
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={'/loginInvestor'}
            >
              Investor
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
