import React from 'react';
import obu from './obu.png';
import BDS from './BDS.png';
import cbc from './cbc.png';
import JMorgan from './JMorgan.png';
import BofA from './BofA.png';
import SoldmanGachs from './SoldmanGachs.png';
import { makeStyles, Grid, Paper, Typography, IconButton } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyle = makeStyles((theme) => {
  return {
    image: {
      width: '30vw',
    },
    imgcontainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '40px 0 30px 0',
    },
    leaderboardrow: {
      marginTop: '5px',
      padding: '10px',
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main2,
      width: '80vw',
    },
  };
});

const Bank = (props) => {
  const { bankName, loans, ...rest } = props;
  const classes = useStyle();
  const logoMap = {
    obu: obu,
    BDS: BDS,
    cbc: cbc,
    JMorgan: JMorgan,
    BofA: BofA,
    SoldmanGachs: SoldmanGachs,
  };

  const statusColors = {
    pending: '#b5b5b5',
    paid: '#6eff7a',
    defaulted: '#ff8e7a',
  };

  return (
    <div>
      <div className={classes.imgcontainer}>
        <img src={logoMap[bankName]} className={classes.image} />
        <Typography variant="h4">Your loan history</Typography>
      </div>

      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        {loans.map((loan, index) => {
          return (
            <Grid item>
              <Paper className={classes.leaderboardrow} elevation={3}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">{loan.uen}</Typography>
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
                    {loan.status === 'pending' && (
                      <div>
                        <IconButton>
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton>
                          <CancelIcon />
                        </IconButton>
                      </div>
                    )}
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
export default Bank;
