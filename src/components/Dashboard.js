import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './Dashboard.css';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { login, logout } from '../redux/userSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import YearComponent from './YearComponent';
import MonthComponent from './MonthComponent';

const StyledRadio = (props) => {
  return (
    <Radio sx={{
      color: "white",
      '&.Mui-checked': {
        color: "white",
      },
    }}
    {...props}
    />
  )
}

function Dashboard(props) {
  const [date, setDate] = React.useState([null, null]);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAddEvent = () => {
    dispatch(login());
    props.history.push('/add-event');
  }
  const handleShowEvent = () => {
    dispatch(login());
    props.history.push('/show-event');
  }

  return (
    <div className="dashboard-container">
      <div className='show-group-container'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="tabs-calendar" centered>
                <Tab label="Rok" value="1" />
                <Tab label="Miesiąc" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <YearComponent></YearComponent>
            </TabPanel>

            <TabPanel value="2">
              <MonthComponent></MonthComponent>
            </TabPanel>
          </TabContext>
        </Box>




        {/* <div className="show-group">
          <FormControl >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white"
                }
              }}
            >
              Pokaż
            </FormLabel>
            <RadioGroup 
              aria-label="show"
              defaultValue="month"
              name="show-group"
            >
              <FormControlLabel value="year" control={<StyledRadio />} label="Lata" />
              <FormControlLabel value="month" control={<StyledRadio />} label="Miesiące" />
              <FormControlLabel value="day" control={<StyledRadio />} label="Dni" />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MobileDateRangePicker
                    startText="Start"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </RadioGroup>
          </FormControl>
        </div> */}

        <Button 
          className="add-event-button" 
          variant="outlined" 
          size="large" 
          startIcon={<ControlPointIcon />}
          onClick={handleAddEvent}
        >
          Nowe wydarzenie
        </Button>
      </div>

      {/* <div className="timeline-container"
        <div className="card-container">
          <Card className="main-card" sx={{ maxWidth: 300, color: "white", background: "#F16155" }}>
            <CardActionArea onClick={handleShowEvent}>
              <CardContent className="card-content">
                <Typography gutterBottom variant="h4" component="div">
                  Urodziny
                </Typography>
                <Typography variant="body2" color="white">
                  20/10/2021
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div> */}

    </div>
  );
}

export default Dashboard;