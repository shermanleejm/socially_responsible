import React from 'react';
import { pages } from './Pages';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
    zIndex: 2,
  },
}));

export function SideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log(pages);
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={open}>
        <div>
          {pages.map((page) => {
            return (
              <ListItem
                button
                component={Link}
                to={page.link}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
}
