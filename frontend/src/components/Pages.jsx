import Dashboard from './Dashboard';
import { LandingPage } from './LandingPage';
import { AddFinancials } from './AddFinancials/AddFinancials';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LoanManagement from './LoanMangement/LoanManagement';
import { Leaderboard } from './Leaderboard';

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
    title: 'Loan Management',
    icon: <MonetizationOnIcon />,
    link: '/loan-management',
    component: <LoanManagement />,
  },
  {
    title: 'Landing Page',
    icon: <HomeIcon />,
    link: '/',
    component: <LandingPage />,
  },
];
