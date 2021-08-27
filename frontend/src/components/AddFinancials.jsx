import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

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

export const AddFinancials = () => {
  const [values, setValues] = React.useState();

  return (
    <div>
      <TextField
        label="react-number-format"
        value={values}
        onChange={(event) => {
          setValues(event.target.value);
        }}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
};
