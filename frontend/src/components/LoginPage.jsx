import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 0 0 0 ',
    },
    paper: {
      backgroundColor: theme.palette.primary.main3,
      margin: '40px 0 0 0',
      padding: '40px',
      width: '90vw',
    },
    fields: {
      width: '70vw',
    },
    button: {
      backgroundColor: theme.palette.primary.main2,
      color: 'white',
    },
    newUser: {
      cursor: 'pointer',
      color: 'white',
    },
    divider: {
      background: 'black',
      width: '100%',
      margin: '20px 0 20px 0',
    },
  };
});

const CompanyLogin = (props) => {
  const { user, ...rest } = props;
  const classes = useStyles();
  const [details, setDetails] = React.useState({
    username: undefined,
    password: undefined,
  });
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" style={{ color: 'white', textAlign: 'center' }}>
              {user == 'sme' ? 'Small Businesses ' : 'Investor '}
              {isLogin ? 'Login' : 'Register'}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.fields}
              color="secondary"
              label="Username or email"
              value={details.username}
              onChange={(event) =>
                setDetails({ ...details, username: event.target.value })
              }
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              className={classes.fields}
              color="secondary"
              label="Password"
              type="password"
              value={details.password}
              onChange={(event) =>
                setDetails({ ...details, password: event.target.value })
              }
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={user === 'sme' ? '/dashboard' : '/leaderboard'}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Grid>
          <Grid item>
            <Typography
              variant="p"
              className={classes.newUser}
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? 'New User?' : 'Returning User'}
            </Typography>
          </Grid>

          <Divider className={classes.divider} variant="middle" />

          <Grid item style={{ textAlign: 'center' }}>
            <Button startIcon={<FacebookIcon />}>Log in with Facebook</Button>

            <Button startIcon={<LinkedInIcon />}>Log in with LinkedIn</Button>

            <Button>Log in with Google</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CompanyLogin;
