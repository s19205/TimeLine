import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import '../Dashboard.css';
import {
  Timeline,
  Events,
  ImageEvent,
  TextEvent,
  themes,
  createTheme
} from '@merc/react-timeline';
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { common } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { GetEvents } from "../../../api/Event";
import moment from "moment";
import Image from "../../../images/nothing_present.gif";
import Processing from '../../../images/processing.gif';

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

const MonthComponent = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [events, setEvents] = React.useState([])
  const history = useHistory()
  
  const handleShowEvent = (id) => {
    history.push(`/show-event/${id}`);
  }
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      const response = await GetEvents({ year: +date.getFullYear(), month: +date.getMonth()+1 })
      setEvents(response.data)
      setIsLoading(false)
    }
    fetchEvents()
  }, [date])

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 23,
  }));

  if (isLoading) {
    return <div sx={{ display: 'flex' }}><img src={Processing} width="300" /></div>
  }

  return (
    <div>
      <div className="year-datapicker-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year', 'month']}
            label="Wybrany miesi??c"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="timeline">
      {events.length > 0
        ? (
        <Timeline theme={customTheme} opts={{ layout: 'alt-evts-inline-date' }}>
          <Events>
            {events.map((event) => (
              event.format === 'text'
              ? (
                <TextEvent 
                  className={`event text-event priority-${event.priority} ${event.colorCode}`}
                  date={moment(event.eventDate).format('DD/MM/YYYY')} 
                  text={event.title} 
                >
                  <div className="button-text-event-container">
                    <ColorButton className="button-text-event"  onClick={() => handleShowEvent(event.idEvent)}>
                      <DehazeIcon />
                    </ColorButton>
                  </div>
                </TextEvent>
              )
              : (
                <ImageEvent
                  className={`event priority-${event.priority} image-event ${event.colorCode}`}
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
        )
        : (
          <div>
            <img src={Image} width="300" />
            <Div>{"Ups... Niestety nie by??o ??adnych wydarze?? w tym miesi??cu"}</Div>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default MonthComponent;