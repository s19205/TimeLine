import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import './Dashboard.css';


const YearComponent = () => {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <div className="year-datapicker-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year']}
            label="Wybierz rok"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="timeline">

      </div>
    </div>
  );
};

export default YearComponent;