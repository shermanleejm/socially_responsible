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
  const { values, callback, title, keyName, ...rest } = props;
  return (
    <div>
      <TextField
        label={title}
        value={values}
        onChange={(event) => {
          callback(event.target.value, keyName);
        }}
        variant="outlined"
        color="secondary"
        className={classes.textfield}
      />
    </div>
  );
};

export default ExpenseField;
