import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DateField = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        value={props.values}
        maxDate={new Date()}
        onChange={(date) => props.callback(date, props.keyName)}
        format="dd/mm/yyyy"
        color="secondary"
        style={{ width: '80vw' }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
