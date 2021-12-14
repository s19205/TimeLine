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
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { common, amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import DehazeIcon from '@mui/icons-material/Dehaze';

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

const events = [
  {
    id: 1,
    format: 'text',
    name: 'My birthday',
    description: 'lolololol',
    date: '21-01-2021',
    type: {
      name: 'birthday',
      priority: 1, 
      color: 'red',
    }
  },
  {
    id: 2,
    format: 'image',
    name: 'Trip to the sea',
    description: 'The best of the best',
    date: '12-05-2021',
    type: {
      name: 'holiday',
      priority: 2, 
      color: 'green',
    },
    media: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/78809294.jpg?k=cf850d507a9671cf7ff85d598435ea329a28cd4f1b1abc25c1892c91156d36ad&o='
  },
  {
    id: 3,
    format: 'text',
    name: 'Lockdown',
    description: 'lolololol',
    date: '16-03-2020',
    type: {
      name: 'big-event',
      priority: 3, 
      color: 'yellow',
    }
  },
]

//let sortedEvents = events.sort((a, b) =>
 // a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join())); 

let sortedEvents = events.sort((a, b) => new Date(...a.date.split('-').reverse()) - new Date(...b.date.split('-').reverse()));

//events.sort((a, b) => (a.date > b.date) ? 1 : -1)

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common['black']),
}));

const YearComponent = () => {
  const [value, setValue] = React.useState(new Date());
  const history = useHistory()
  const handleShowEvent = () => {
    history.push('/show-event');
  }

  return (
    <div>
      <div className="year-datapicker-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year']}
            label="Wybrany rok"
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
            {sortedEvents.map((event) => (
              event.format === 'text'
              ? (
                <TextEvent 
                  className="text-event"
                  date={event.date} 
                  text={event.name} 
                >
                  <div className="button-text-event-container">
                    <ColorButton className="button-text-event"  onClick={handleShowEvent}><DehazeIcon></DehazeIcon></ColorButton>
                  </div>
                </TextEvent>
              )
              : (
                <ImageEvent
                  date={event.date}
                  text={event.name}
                  src={event.media}
                >
                  <div className="button-text-event-container">
                    <ColorButton className="button-text-event" onClick={handleShowEvent}><DehazeIcon></DehazeIcon></ColorButton>
                  </div>
                </ImageEvent>
              )
              ))}

          </Events>
        </Timeline>
      </div>
    </div>
  );
};

export default YearComponent;