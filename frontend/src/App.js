import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { pages, SideBar } from './components/SideBar';

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
    tertiary: {
      main: '',
    },
  },
});

const chart_data = {};

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <SideBar />
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/">
              
            </Route>


          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
