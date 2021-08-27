import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { SideBar } from './components/SideBar';
import { pages } from './components/Pages';

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

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <SideBar />
        <BrowserRouter>
          <Switch>
            {pages.map((page) => {
              return <Route path={page.link}>{page.component}</Route>;
            })}
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
