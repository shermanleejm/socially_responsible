import React, { Component } from 'react';
import { Container, Button, Grid, Box } from '@material-ui/core';
import logo from '../images/logo.svg';
import Link from '@material-ui/core/Link';
import { Link as Linking } from 'react-router-dom';
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';


const homeOwnerships = [
    {
      value: 'Paying',
      label: 'Paying',
    },
    {
      value: 'Own Home',
      label: 'Own Home',
    },
    {
      value: 'Rent',
      label: 'Rent',
    },
  ];

const incomes = [
    {
      value: 1,
      label: 'Less than 1 year',
    },
    {
      value: 2,
      label: 'Less than 2 years',
    },
    {
      value: 3,
      label: 'Less than 3 years',
    },
    {
        value: 4,
        label: 'Less than 4 years',
      },
      {
        value: 5,
        label: 'Less than 5 years',
      },
      {
        value: 6,
        label: 'Less than 6 years',
      },
      {
        value: 7,
        label: 'Less than 7 years',
      },
      {
        value: 8,
        label: 'Less than 8 years',
      },
      {
        value: 9,
        label: 'Less than 9 years',
      },
      {
        value: 10,
        label: 'Less than 10 years',
      },
      {
        value: 11,
        label: 'More than 10 years',
      },
  ];

const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,

        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    margin: {
        margin: theme.spacing(1),
    },
    color: {
        backgroundColor: 'black'
    }
}));


const useStyles2 = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            'BlinkMacSystemFont',
        ],
        fontColor: [
            '#1E3F66'
        ]

    },
});


export const SignUp = () => {
    const classes = useStyles();
    const classes2 = useStyles2();

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const [homeOwnership, setHomeOwnership] = React.useState('Paying');
    const [income, setIncome] = React.useState('< 1 year');

    const handleChangeHomeOwnership = (event) => {
        setHomeOwnership(event.target.value);
      };

    const handleChangeIncome= (event) => {
        setIncome(event.target.value);
      };


    return (


        <Grid container
            direction="column"
            justify="center"
            alignItems="center" >
            <div>
                <Grid container
                    direction="row"
                    spacing={1} className={classes.root}
                    style={{ padding: 30 }}
                >
                    <Grid item xs={12}  justifyContent="center" alignContent="center">
                    <h1 style={{ 'color': '#1E3F66' }}> <ThemeProvider theme={theme}>
                            <Typography variant="h3">  <img src={logo} alt="logo" height="50px" />Start your journey with Edison as an SME!</Typography>
                        </ThemeProvider></h1>
                    </Grid>
                    <Grid item xs={12} >
                        <RedditTextField
                            fullWidth
                            label="Company Name"
                            className={classes.margin}
                            variant="filled"
                            id="reddit-input"
                            size="small"
                            helperText="Please state the full official company name that you are representing."
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <RedditTextField
                            fullWidth
                            label="Company UEN"
                            className={classes.margin}
                            variant="filled"
                            id="reddit-input"
                            size="small"
                            helperText="The UEN of the company you are representing."
                        />
                    </Grid>
                   
                    <Grid item xs={3} >
                    <RedditTextField
                        fullWidth
                        className={classes.margin}
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        size="small"
                        helperText="We will never share your password."
                        />
                    </Grid>
                  
                    
                    <Grid item xs={3} >
                        <RedditTextField
                            fullWidth
                            label="Home Ownership"
                            select
                            className={classes.margin}
                            value={homeOwnership}
                            onChange={handleChangeHomeOwnership} 
                            variant="filled"
                            id="reddit-input"
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                        >
                        {homeOwnerships.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </RedditTextField>
                    </Grid>

                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="annualIncome"
                             label="Annual Income ($)"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                    <RedditTextField
                            fullWidth
                            label="Years in current job (Years)"
                            select
                            className={classes.margin}
                            value={income}
                            onChange={handleChangeIncome} 
                            variant="filled"
                            id="reddit-input"
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                        >
                        {incomes.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </RedditTextField>
                    </Grid>

                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="taxLiens"
                             label="Tax Liens"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="numberOfOpenAccounts"
                             label="Number of Open Account(s)"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="creditHistoryYears"
                             label="Year(s) of credit history"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="maximumOpenCredit"
                             label="Maximum Open Credit(s)"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                        <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="bankruptcy"
                             label="Bankruptcies"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                    <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="monthsSinceLastDelinquent"
                             label="Month(s) since last delinquency"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={4}>
                    <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="currentLoanAmount"
                             label="Current Loan Amount ($)"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={4}>
                    <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="currentCreditBalance"
                             label="Current Credit Balance ($)"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={4}>
                    <RedditTextField
                            fullWidth
                            className={classes.margin}
                             id="monthlyDebt"
                             label="Monthly Debt"
                             type="number"
                             InputLabelProps={{
                               shrink: true,
                             }}
                             variant="filled"
                             size="small"
                        />
                       
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                        fullWidth
                            variant="contained"
                            color="secondary"
                        >
                            <div style={{ 'color': 'white' }}>Register</div>
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>

                </Grid>
            </div>
        </Grid>

    );
}



