import  Dashboard from './Dashboard';
import { LandingPage } from './LandingPage';
import { AddFinancials } from './AddFinancials/AddFinancials';
import { Login } from './Login';
import { SignUp } from './SignUp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LoanManagement from './LoanMangement/LoanManagement';
import { Leaderboard } from './Leaderboard';
import LoginPage from './LoginPage';

export const pages = [
  {
    title: 'Leaderboard',
    icon: <TrendingUpIcon />,
    link: '/leaderboard',
    component: <Leaderboard />,
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard',
    component: <Dashboard />,
  },
  {
    title: 'Add Financials',
    icon: <AddBoxIcon />,
    link: '/add',
    component: <AddFinancials />,
  },
  {
<<<<<<< HEAD
    title: 'Login',
    link: '/login',
    component:<Login />
  },
  {
    title: 'SignUp',
    link: '/signup',
    component:<SignUp />
=======
    title: 'Loan Management',
    icon: <MonetizationOnIcon />,
    link: '/loan-management',
    component: <LoanManagement />,
  },
  {
    title: undefined,
    icon: undefined,
    link: '/login-sme',
    component: <LoginPage user="sme" />,
  },
  {
    title: undefined,
    icon: undefined,
    link: '/login-investor',
    component: <LoginPage user="investor" />,
>>>>>>> 17ddf38a3c62cb01d1e8b8f64412ca782eee03d0
  },
  {
    title: 'Landing Page',
    icon: <HomeIcon />,
    link: '/',
    component: <LandingPage />,
  },
  
];
