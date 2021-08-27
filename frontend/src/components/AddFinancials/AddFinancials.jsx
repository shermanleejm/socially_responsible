import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, Grid, Typography, makeStyles, Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import AmountField from './AmountField';
import TitleField from './TitleField';
import DateField from './DateField';

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      marginBottom: '20px',
    },
  };
});

export const AddFinancials = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    expenseAmount: 0,
    expenseTitle: '',
    expenseDate: new Date(),
    revenueAmount: 0,
    revenueDate: new Date(),
  });

  function callback(childData, keyName) {
    setValues({
      ...values,
      [keyName]: childData,
    });
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography variant="h5" color="secondary">
              <Box fontWeight="700" m={1}>
                New Expense
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <TitleField />
          </Grid>
          <Grid item>
            <AmountField
              callback={callback}
              values={values.expenseAmount}
              title="Expense"
              keyName="expenseAmount"
            />
          </Grid>
          <Grid item>
            <DateField
              callback={callback}
              values={values.expenseDate}
              keyName="expenseDate"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" style={{ color: 'white' }}>
              Submit Expense
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography variant="h5" color="secondary">
              <Box fontWeight="700" m={1}>
                New Revenue
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <AmountField
              callback={callback}
              values={values.revenueAmount}
              title="Expense"
              keyName="revenueAmount"
            />
          </Grid>
          <Grid item>
            <DateField
              callback={callback}
              values={values.revenueDate}
              keyName="revenueDate"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" style={{ color: 'white' }}>
              Submit Revenue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
