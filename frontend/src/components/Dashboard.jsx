import React, { Component, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  makeStyles,
  Tab,
  AppBar,
  TabPanel,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
} from '@material-ui/core';

import axios from 'axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const useStyles = makeStyles((theme) => {
  return {
    cardheader: {
      display: 'flex',
      justifyContent: 'center',
    },
    cardcustom: {
      backgroundColor: theme.palette.primary.main3,
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'center',
      width: '400',
      margin: '0',
      padding: '0',
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

const createData = (date, expense, revenue, profit) => {
  return { date, expense, revenue, profit };
};

function Dashboard() {
  const classes = useStyles();
  const [revenues, setRevenues] = React.useState(null);
  const [expenses, setExpenses] = React.useState(null);

  const user_uen = 'testuen';

  // get revenue from endpoint
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_LOCAL + 'get-revenue', {
        params: {
          uen: user_uen,
        },
      })
      .then((response) => {
        setRevenues(response.data);
        // revenue_response = response.data
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_API_LOCAL + 'get-expense', {
        params: {
          uen: user_uen,
        },
      })
      .then((response) => {
        setExpenses(response.data);
        // expense_response = response.data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // format endpoint results for line chart input
  var all_dates = [];
  if (revenues !== null && expenses !== null) {
    for (let rev_date of Object.keys(revenues)) {
      if (all_dates.includes(rev_date) === false) {
        all_dates.push(rev_date);
      }
    }

    for (let exp_date of Object.keys(expenses)) {
      if (all_dates.includes(exp_date) === false) {
        all_dates.push(exp_date);
      }
    }
  }

  var data = [];

  for (let date of all_dates) {
    if (
      // if date has both revenue and expense
      revenues.hasOwnProperty(date) === true &&
      expenses.hasOwnProperty(date) === true
    ) {
      data.push(
        createData(
          date,
          revenues[date]['amount'],
          expenses[date]['amount'],
          revenues[date]['amount'],
          -expenses[date]['amount']
        )
      );
    } else if (
      // if date only has revenue
      revenues.hasOwnProperty(date) === true &&
      expenses.hasOwnProperty(date) === false
    ) {
      data.push(
        createData(date, revenues[date]['amount'], 0, revenues[date]['amount'], -0)
      );
    } else if (
      // if date only has expense
      revenues.hasOwnProperty(date) === false &&
      expenses.hasOwnProperty(date) === true
    ) {
      data.push(
        createData(date, 0, expenses[date]['amount'], 0 - expenses[date]['amount'])
      );
    }
  }

  // revenue vs expense pie chart
  const pie_chart_colors = ['#dc3545', '#28a745'];
  var total_revenue = 0;
  var total_expense = 0;

  for (let date of all_dates) {
    if (revenues.hasOwnProperty(date)) {
      total_revenue += revenues[date]['amount'];
    }

    if (expenses.hasOwnProperty(date)) {
      total_expense += expenses[date]['amount'];
    }
  }

  const pieData = [
    {
      name: 'Total Expense',
      value: total_expense,
    },
    {
      name: 'Total Revenue',
      value: total_revenue,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}
        >
          <label>{`${payload[0].name} : $${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };

  if (revenues === null && expenses === null) {
    return (
      <div className={classes.loadingcontainer}>
        <Typography style={{ color: '#fff' }}>
          Hang on, getting loan information
        </Typography>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Grid container justifyContent="center" alignItems="center">
          <h2>Dashboard</h2>
        </Grid>

        <Grid item xs={12} md={6} lg={6} width={170}>
          <ResponsiveContainer>
            <Card className={classes.cardcustom}>
              <CardContent>
                <Typography className={classes.cardheader}>Profit</Typography>
                <LineChart data={data} height={200} width={400}>
                  <XAxis dataKey="date" />
                  <YAxis />

                  <Line type="monotone" dataKey="profit" dot={true} />
                </LineChart>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6} lg={6} width={170}>
          <ResponsiveContainer>
            <Card className={classes.cardcustom}>
              <CardContent>
                <Typography className={classes.cardheader}>
                  Revenue vs Expenses
                </Typography>
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pie_chart_colors[index % pie_chart_colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6} lg={6} width={170}>
          <ResponsiveContainer>
            <Card className={classes.cardcustom}>
              <CardContent>
                <Typography className={classes.cardheader}>Expense</Typography>
                <LineChart data={data} height={200} width={400}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Line type="monotone" dataKey="expense" dot={true} />
                </LineChart>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6} lg={6} width={170}>
          <ResponsiveContainer>
            <Card className={classes.cardcustom}>
              <CardContent>
                <Typography className={classes.cardheader}>Revenue</Typography>
                <LineChart data={data} height={200} width={400}>
                  <XAxis dataKey="date" />
                  <YAxis />

                  <Line type="monotone" dataKey="revenue" dot={true} />
                </LineChart>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
