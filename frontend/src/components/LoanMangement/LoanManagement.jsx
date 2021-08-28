import React from 'react';
import axios from 'axios';

const LoanManagement = () => {
  const [loans, setLoans] = React.useState([
    [
      { id: 1, date: 11111, provider: 'DBS', amount: 30091, status: 'pending' },
      { id: 2, date: 11111, provider: 'BofA', amount: 696969, status: 'defaulted' },
      { id: 3, date: 11111, provider: 'BofA', amount: 402402, status: 'paid' },
    ],
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

  React.useEffect(async () => {
    const fetchBanks = async () => {
      const result = await axios(process.env.REACT_APP_API_LOCAL + 'get-banks');
      setBanks(result.data);

      result = await axios(process.env.REACT_APP_API_LOCAL + 'get-loans'); // TODO: check api
      setLoans(result.data);

      setIsLoading(false);
    };
    fetchBanks();
  }, [isLoading]);

  return <div>Loan Management</div>;
};

export default LoanManagement;
