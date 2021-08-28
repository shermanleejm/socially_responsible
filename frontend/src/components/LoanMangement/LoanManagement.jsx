import React from 'react';
import axios from 'axios';
import {
  Paper,
  Tabs,
  makeStyles,
  Tab,
  AppBar,
  TabPanel,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import ApplyLoan from './company/ApplyLoan';
import ManageLoan from './banks/ManageLoans';
import Company from './company/Company';
import Bank from './banks/Bank';

const useStyles = makeStyles((theme) => {
  return {
    tabbackground: {
      backgroundColor: theme.palette.primary.main,
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'center',
    },
    leaderboardrow: {
      marginTop: '5px',
      padding: '10px',
      color: theme.palette.secondary.main,
      paddingRight: '40px',
      backgroundColor: theme.palette.primary.main2,
    },
    top3: {
      borderRadius: ' 50%',
      width: '50px',
      height: '50px',
      padding: '13px',
      textAlign: 'center',
    },
    loadingcontainer: {
      marginTop: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  };
});

const LoanManagement = () => {
  const classes = useStyles();
  const [loans, setLoans] = React.useState([
    {
      id: 1,
      date: 11111,
      provider: 'BDS',
      amount: 30091,
      status: 'pending',
      uen: '198401412',
    },
    {
      id: 2,
      date: 11111,
      provider: 'BofA',
      amount: 696969,
      status: 'defaulted',
      uen: '198401412',
    },
    {
      id: 3,
      date: 11111,
      provider: 'BofA',
      amount: 402402,
      status: 'paid',
      uen: '198401412',
    },
  ]);
  const [banks, setBanks] = React.useState([
    'BDS',
    'cbc',
    'BofA',
    'obu',
    'JMorgan',
    'SoldmanGachs',
  ]);
  const [isLoading, setIsLoading] = React.useState();

  // TODO: take the following from localstorage
  const [uen] = React.useState('198401412');
  const [isCompany] = React.useState(true);
  const [name] = React.useState('Rick Grimes Pte Ltd');
  // const [isCompany] = React.useState(false);
  // const [name] = React.useState('BDS');

  React.useEffect(async () => {
    const fetchBanks = async () => {
      const result = await axios(process.env.REACT_APP_API_LOCAL + 'get-banks');
      setBanks(result.data);

      // result = await axios(process.env.REACT_APP_API_LOCAL + 'get-loans'); // TODO: check api
      // setLoans(result.data);

      setIsLoading(false);
    };
    fetchBanks();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div className={classes.loadingcontainer}>
          <Typography style={{ color: '#fff' }}>
            Hang on, getting loan information
          </Typography>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          {isCompany ? (
            <Company uen={uen} companyName={name} banks={banks} loans={loans} />
          ) : (
            <Bank bankName={name} loans={loans} />
          )}
        </div>
      )}
    </div>
  );
};

export default LoanManagement;
