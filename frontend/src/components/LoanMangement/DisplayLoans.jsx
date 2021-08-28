import { Paper, makeStyles, Grid, Typography } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => {
  return {
    leaderboardrow: {
      marginTop: '5px',
      padding: '10px',
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main2,
      width: '80vw',
    },
  };
});

const DisplayLoans = (props) => {
  const { data, ...rest } = props;
  const classes = useStyles();

  const statusColors = {
    pending: '#b5b5b5',
    paid: '#6eff7a',
    defaulted: '#ff8e7a',
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        {data.map((loan, index) => {
          console.log(loan);
          return (
            <Grid item>
              <Paper className={classes.leaderboardrow} elevation={3}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">{loan.provider}</Typography>
                    <Typography variant="h6">
                      <NumberFormat
                        value={loan.amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ color: statusColors[loan.status] }}>
                      {loan.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default DisplayLoans;
