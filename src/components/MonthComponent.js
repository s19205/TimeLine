import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import './Dashboard.css';
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  themes,
  createTheme
} from '@merc/react-timeline';

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: '#3DA588',
    color: "white",
  },
  date: {
    backgroundColor: '#3DA588',
    color: '#fff',
  },
  marker: {
    borderColor: '#3DA588',
    backgroundColor: '#3DA588',
  },
  timelineTrack: {
    backgroundColor: '#707070',
    width: '3px',
  },
});


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
      <div className="timeline">
        <Timeline theme={customTheme} opts={{ layout: 'alt-evts-inline-date' }}>
          <Events>
            <TextEvent  date="1/1/19" text="**Markdown** is *supported*" />

            <TextEvent 
              
              date="1/2/19" 
              text="Events alternate by default (given enough space in the browser)" 
            />

            <ImageEvent
              date="4/13/19"
              text="You can embed images..."
              src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
              alt="jellyfish swimming"
              credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
              
            >
            </ImageEvent>

            <YouTubeEvent
              date="6/18/19"
              id="6UnRHtwHGSE"
              name="General Tso's Chicken recipe"
              text="... and YouTube videos!"
            />
          </Events>
        </Timeline>
      </div>
    </div>
  );
};

export default MonthComponent;