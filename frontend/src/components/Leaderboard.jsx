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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
  return {
    tabbackground: {
      backgroundColor: theme.palette.primary.main,
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'center',
    },
    leaderboardrow: {
      backgroundColor: theme.palette.primary.main,
      marginTop: '5px',
      padding: '10px',
      color: theme.palette.secondary.main,
      paddingRight: '40px',
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

const Panel = (props) => {
  const classes = useStyles();
  const { data, chosenTab, ...rest } = props;
  const keyNames = ['credit', 'financial', 'esg'];
  const keyName = keyNames[chosenTab];
  data.sort((a, b) => (a[keyName] < b[keyName] ? 1 : b[keyName] < a[keyName] ? -1 : 0));
  const top3Colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#7B99C2'];
  return (
    <div>
      {data.map((coy, index) => {
        return (
          <Paper className={classes.leaderboardrow} elevation={3}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>{coy.company}</Typography>
                <Typography>{coy.uen}</Typography>
              </Grid>
              <Grid item>
                {index < 3 ? (
                  <div
                    className={classes.top3}
                    style={{ color: '#000', background: top3Colors[index] }}
                  >
                    {coy[keyName]}
                  </div>
                ) : (
                  <div
                    className={classes.top3}
                    style={{ color: '#000', background: '#fff' }}
                  >
                    {coy[keyName]}
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
};

export const Leaderboard = () => {
  const classes = useStyles();
  const [chosenTab, setChosenTab] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState([
    {
      company: 'Lacunte Pte Ltd',
      uen: '01913157630192',
      credit: 0.2,
      financial: 1.7,
      esg: 2.4,
    },
    {
      company: 'Errumineaet Pte Ltd',
      uen: '33172284292056',
      credit: 0.7,
      financial: 2.5,
      esg: 3.8,
    },
    {
      company: 'Arohtbd Pte Ltd',
      uen: '84279480138580',
      credit: 2.3,
      financial: 1.8,
      esg: 4.1,
    },
    {
      company: 'Itnubozt Pte Ltd',
      uen: '61054006156081',
      credit: 2.2,
      financial: 3.4,
      esg: 2.9,
    },
    {
      company: 'Cquamraho Pte Ltd',
      uen: '41091704038228',
      credit: 0.4,
      financial: 2.6,
      esg: 2.1,
    },
    {
      company: 'Adecut Pte Ltd',
      uen: '56528342866932',
      credit: 0.2,
      financial: 0.8,
      esg: 2,
    },
    {
      company: 'Oquam Pte Ltd',
      uen: '01160558844786',
      credit: 4.1,
      financial: 4.2,
      esg: 1.2,
    },
    {
      company: 'Auztmo Pte Ltd',
      uen: '15008229683462',
      credit: 1.1,
      financial: 1,
      esg: 1.9,
    },
    {
      company: 'Recqui Pte Ltd',
      uen: '36257263607639',
      credit: 4,
      financial: 2.1,
      esg: 0.2,
    },
    {
      company: 'Eseups Pte Ltd',
      uen: '13444377160636',
      credit: 0.9,
      financial: 1.7,
      esg: 3.8,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const fetchLeaderboard = async () => {
      const result = await axios(process.env.REACT_APP_API_LOCAL + 'leaderboard');
      setLeaderboardData(result.data);
      setIsLoading(false);
    };
    fetchLeaderboard();
  }, [isLoading]);

  const tabs = ['Risk Score', 'Financial Earnings', 'ESG Score'];

  return (
    <div>
      <Tabs
        value={chosenTab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        onChange={(_, newValue) => {
          setChosenTab(newValue);
        }}
        centered
      >
        {tabs.map((tab) => {
          return <Tab label={tab} />;
        })}
      </Tabs>
      {isLoading ? (
        <div className={classes.loadingcontainer}>
          <Typography style={{ color: '#fff' }}>Hang on, getting leaderboard</Typography>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Panel data={leaderboardData} chosenTab={chosenTab} />
      )}
    </div>
  );
};
