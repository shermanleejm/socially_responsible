import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => {
  return {
    textfield: {
      width: '80vw',
    },
  };
});

const AmountField = (props) => {
  const classes = useStyles();
  const { values, title, callback, keyName } = props;
  return (
    <div>
      <TextField
        label={title}
        value={values}
        onChange={(event) => {
          callback(event.target.value, keyName);
        }}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
        color="secondary"
        className={classes.textfield}
      />
    </div>
  );
};

export default AmountField;
