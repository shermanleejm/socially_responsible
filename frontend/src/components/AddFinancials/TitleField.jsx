import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    textfield: {
      width: '80vw',
    },
  };
});

const ExpenseField = (props) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        label="Title"
        value={props.values}
        onChange={(event) => {
          props.callback(event.target.value);
        }}
        variant="outlined"
        color="secondary"
        className={classes.textfield}
      />
    </div>
  );
};

export default ExpenseField;
