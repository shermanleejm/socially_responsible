import { Grid, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import AmountField from '../../AddFinancials/AmountField';

const useStyles = makeStyles((theme) => {
  return {};
});

const ApplyLoan = (props) => {
  const { amountCallback, bankCallback, values, selectedBank, banks, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <AmountField values={values} title="Loan Amount" callback={amountCallback} />
        </Grid>
        <Grid item>
          <Autocomplete
            options={banks}
            getOptionLabel={(opt) => opt}
            style={{ width: '80vw' }}
            onChange={(event, value) => bankCallback(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Supporting Bank"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ApplyLoan;
