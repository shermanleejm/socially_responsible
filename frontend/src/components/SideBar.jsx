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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
    zIndex: 2,
  },
}));

export function SideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
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
      <Drawer variant="temporary" open={open}></Drawer>
    </div>
  );
}
