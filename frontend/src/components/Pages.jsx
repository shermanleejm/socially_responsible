import Dashboard from './Dashboard';
import { LandingPage } from './LandingPage';
import { AddFinancials } from './AddFinancials';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';

export const pages = [
  {
    title: 'Leaderboard',
    icon: <TrendingUpIcon />,
    link: '/leaderboard',
    component: <LandingPage />,
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
    title: 'Landing Page',
    icon: <HomeIcon />,
    link: '/home',
    component: <LandingPage />,
  },
];
