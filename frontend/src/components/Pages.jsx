import Dashboard from './Dashboard';
import { LandingPage } from './LandingPage';
import { AddFinancials } from './AddFinancials/AddFinancials';
import { LoginSME } from './LoginSME';
import { LoginInvestor } from './LoginInvestor';
import { SignUp } from './SignUp';
import { InvestorSignUp } from './InvestorSignUp'
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
    title: 'LoginSME',
    link: '/loginSME',
    component:<LoginSME />
  },
  {
    title: 'LoginInvestor',
    link: '/loginInvestor',
    component:<LoginInvestor />
  },
  {
    title: 'SignUp',
    link: '/signup',
    component:<SignUp />},

    {
      title: 'Investor Sign Up',
      link: '/investorSignUp',
      component:<InvestorSignUp/>},
  {
    title: 'Loan Management',
    icon: <MonetizationOnIcon />,
    link: '/loan-management',
    component: <LoanManagement />,
  },
  // {
  //   title: undefined,
  //   icon: undefined,
  //   link: '/login-sme',
  //   component: <LoginPage user="sme" />,
  // },
  // {
  //   title: undefined,
  //   icon: undefined,
  //   link: '/login-investor',
  //   component: <LoginPage user="investor" />,
  // },
  {
    title: 'Landing Page',
    icon: <HomeIcon />,
    link: '/',
    component: <LandingPage />,
  },
  
  
];
