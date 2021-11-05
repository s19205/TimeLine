import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import './Dashboard.css';
import { Sparklines, SparklinesLine  } from 'react-sparklines';

const MonthComponent = () => {
  const [value, setValue] = React.useState(new Date());

  const ColoredLine = ({ color }) => (
    <hr  style={{
      color: '#707070',
      backgroundColor: '#707070',
      borderWidth: 0,
      height: 4
    }}/>
);

  return (
    <div>
      <div className="year-datapicker-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year', 'month']}
            label="Wybierz miesiąc"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="horisontal-main-line">
        <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    </div>
  );
};

export default MonthComponent;