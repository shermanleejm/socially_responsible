import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import ApplyLoan from './ApplyLoan';
import axios from 'axios';
import DisplayLoans from '../DisplayLoans';

const useStyles = makeStyles((theme) => {
  return {
    headingContainer: {
      textAlign: 'center',
    },
    root: {
      padding: '20px 10vw 0 10vw',
    },
    button: {
      color: 'white',
      backgroundColor: theme.palette.primary.main2,
    },
    formcontainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const Company = (props) => {
  const { uen, companyName, banks, loans, ...rest } = props;
  const classes = useStyles();
  const [loanAmount, setLoanAmount] = React.useState();
  const [showApplyLoan, setShowApplyLoan] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState();

  function loanAmountCallback(_amount) {
    setLoanAmount(_amount);
  }

  function bankCallback(bankName) {
    setSelectedBank(bankName);
  }

  async function handleSubmit() {
    if (loanAmount === undefined || selectedBank === undefined) return;
    axios.get(process.env.REACT_APP_API_LOCAL + 'new-loan', {
      params: {
        amount: loanAmount,
        bank: selectedBank,
        uen: uen,
      },
    });
    setLoanAmount(undefined);
    setSelectedBank(undefined);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item className={classes.headingContainer}>
          <Typography variant="h4" color="secondary">
            {'Hello, ' + companyName}
          </Typography>
        </Grid>
        <Grid item>
          {showApplyLoan ? (
            <div className={classes.formcontainer}>
              <ApplyLoan
                amountCallback={loanAmountCallback}
                bankCallback={bankCallback}
                values={loanAmount}
                selectedBank={selectedBank}
                banks={banks}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  handleSubmit();
                  setShowApplyLoan(false);
                }}
                style={{ marginTop: '20px' }}
              >
                Submit application
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  setShowApplyLoan(false);
                }}
                style={{ marginTop: '20px' }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setShowApplyLoan(true)}
            >
              Apply for new loan
            </Button>
          )}
        </Grid>
        <Grid item>
          <DisplayLoans data={loans} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Company;
