import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import logo from './images/logo.svg';
import { Container, Button, Grid } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#7B99C2',
    },
    primary: {
      main: '#7B99C2',
    },
    secondary: {
      main: '#FFFFFF',
    },
    tertiary:{
      main: ''
    }
  },
});

const chart_data = {
  
}

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/">
              <header className="App-header">
                <img src={logo} alt="logo" height="300px" />
                
                
                <Container style = {{'padding-top': '0px'}}>
                <h1>Welcome to Edison!</h1>
                  <p>
                    We primarily primarily connects banks and SME owners to provide
                    microfinancing opportunities, allowing banks to loan SMEs.
                  </p>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={'/dashboard'}
                      >
                        SME Login
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={'/dashboard'}
                      >
                        Investor Login
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </header>
            </Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
