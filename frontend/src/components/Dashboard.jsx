import React, { Component, useEffect } from "react";
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
} from "@material-ui/core";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => {
  return {
    cardheader: {
      display: "flex",
      justifyContent: "center",
    },
    cardcustom: {
      backgroundColor: theme.palette.primary.main3,
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      width: "400",
      margin: "0",
      padding: "0",
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

  const user_uen = "testuen";

  // get revenue from endpoint
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_LOCAL + "get-revenue", {
        params: {
          uen: user_uen,
        },
      })
      .then((response) => {
        // console.log(response.data)
        setRevenues(response.data);
        console.log(revenues);
        // revenue_response = response.data
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_API_LOCAL + "get-expense", {
        params: {
          uen: user_uen,
        },
      })
      .then((response) => {
        //console.log(response.data)
        setExpenses(response.data);
        console.log(expenses);
        // expense_response = response.data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(revenues);
  console.log(expenses);

  // format endpoint results for line chart input
  var all_dates = [];
  if (revenues !== null && expenses !== null) {
    for (let rev_date of Object.keys(revenues)) {
      if (all_dates.includes(rev_date) === false) {
        console.log(rev_date);
        all_dates.push(rev_date);
      }
    }

    for (let exp_date of Object.keys(expenses)) {
      if (all_dates.includes(exp_date) === false) {
        console.log(exp_date);
        all_dates.push(exp_date);
      }
    }
  }

  console.log(all_dates);

  var data = [];


  for (let date of all_dates) {
    if (
      revenues.hasOwnProperty(date) === true &&
      expenses.hasOwnProperty(date) === true
    ) {
      data.push(
        createData(
          date,
          revenues[date]['amount'],
          expenses[date]['amount'],
          revenues[date]['amount'], - expenses[date]['amount'],
        )
      );
    } else if (
      revenues.hasOwnProperty(date) === true &&
      expenses.hasOwnProperty(date) === false
    ) {
      data.push(createData(date, revenues[date]['amount'], 0, revenues[date]['amount'], - 0));
    } else if (
      revenues.hasOwnProperty(date) === false &&
      expenses.hasOwnProperty(date) === true
    ) {
      data.push(createData(date, 0, expenses[date]['amount'], 0 - expenses[date]['amount'],));
    }
  }

  console.log(data);

  // var data = [
  //   // date, expense, revenue, profit
  //   createData("2021-05-28", 500, 1000, 500),
  //   createData("2021-05-29", 600, 1000, 400),
  //   createData("2021-05-30", 700, 1200, 500),
  //   createData("2021-05-31", 100, 1300, 1200),
  //   createData("2021-06-01", 400, 1500, 1100),
  //   createData("2021-06-02", 300, 1900, 1600),
  // ];

  if (revenues === null && expenses === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid container justifyContent="center" alignItems="center">
          <h2>Dashboard</h2>
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
      </Grid>
    </div>
  );
}

export default Dashboard;
