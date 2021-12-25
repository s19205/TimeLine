import React, { useEffect, useState } from "react";
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
import { GetEvents } from "../api/Event";
import { CircularProgress } from "@mui/material";
import moment from "moment";

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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common['black']),
}));

const YearComponent = (props) => {
  const [year, setYear] = React.useState(new Date());
  const [events, setEvents] = React.useState([])
  const history = useHistory()

  const handleShowEvent = (id) => {
    history.push(`/show-event/${id}`);
  }

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      const response = await GetEvents({ year: +year.getFullYear() })
      setEvents(response.data)
      setIsLoading(false)
    }
    fetchEvents()
  }, [year])

  if (isLoading) {
    return <div sx={{ display: 'flex' }}><CircularProgress /></div>
  }

  return (
    <div>
      <div className="year-datapicker-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year']}
            label="Wybrany rok"
            value={year}
            onChange={(newValue) => {
              setYear(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="timeline">
      <Timeline theme={customTheme} opts={{ layout: 'alt-evts-inline-date' }}>
          <Events>
            {events.map((event) => (
              event.format === 'text'
              ? (
                <TextEvent 
                  className="text-event"
                  date={moment(event.eventDate).format('DD/MM/YYYY')} 
                  text={event.title} 
                >
                  <div className="button-text-event-container">
                    <ColorButton className="button-text-event" onClick={() => handleShowEvent(event.idEvent)}>
                      <DehazeIcon />
                    </ColorButton>
                  </div>
                </TextEvent>
              )
              : (
                <ImageEvent
                  date={moment(event.eventDate).format('DD/MM/YYYY')}
                  text={event.title}
                  src={event.fileUrl}
                >
                  <div className="button-text-event-container">
                    <ColorButton className="button-text-event" onClick={() => handleShowEvent(event.idEvent)}>
                      <DehazeIcon />
                    </ColorButton>
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