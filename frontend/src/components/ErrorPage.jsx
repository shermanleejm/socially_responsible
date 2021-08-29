import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => {
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
      textAlign: 'center',
      color: 'white',
    },
  };
});

const ErrorPage = (props) => {
  const { type } = props;
  const classes = styles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4">This page is only for {type}</Typography>
      </Paper>
    </div>
  );
};

export default ErrorPage;
