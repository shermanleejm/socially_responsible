import React from 'react';
import logo from '../images/logo.svg';
import { Container, Button, Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: '100px',
      textAlign: 'center',
    },
  };
});

export const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={logo} alt="logo" height="300px" />

      <Container style={{ 'padding-top': '0px' }}>
        <h1>Welcome to Edison!</h1>
        <p>
          We primarily connect banks and SME owners to provide microfinancing
          opportunities, allowing banks to loan SMEs.
        </p>
        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={'/dashboard'}
            >
              SME Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={'/dashboard'}
            >
              Investor Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
