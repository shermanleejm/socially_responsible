import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, Grid, Typography, makeStyles, Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import AmountField from './AmountField';
import TitleField from './TitleField';
import DateField from './DateField';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      marginBottom: '20px',
    },
    button: {
      color: 'white',
      backgroundColor: theme.palette.primary.main2,
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

  const sendExpense = () => {
    if (values.expenseAmount === 0 && values.expenseTitle === '') {
      return;
    }
    axios.get(process.env.REACT_APP_API_LOCAL + 'add-expense', {
      params: {
        amount: values.expenseAmount,
        name: values.expenseTitle,
        uen: '12345', // TODO: retrieve from localstorage
      },
    });
    setValues({
      ...values,
      expenseAmount: 0,
      expenseTitle: '',
      expenseDate: new Date(),
    });
  };

  const sendRevenue = () => {
    if (values.revenueAmount === 0) {
      return;
    }
    axios.get(process.env.REACT_APP_API_LOCAL + 'add-revenue', {
      params: {
        amount: values.revenueAmount,
        name: 'revenue',
        uen: '12345', // TODO: retrieve from localstorage
      },
    });
    setValues({
      ...values,
      revenueAmount: 0,
      revenueDate: new Date(),
    });
  };

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
            <TitleField
              values={values.expenseTitle}
              title="Name"
              callback={callback}
              keyName="expenseTitle"
            />
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
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => sendExpense()}
            >
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
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => sendRevenue()}
            >
              Submit Revenue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
