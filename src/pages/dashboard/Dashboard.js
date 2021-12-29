import React from "react";
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import './Dashboard.css';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { login, logout } from '../../redux/userSlice';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import YearComponent from './components/YearComponent';
import MonthComponent from './components/MonthComponent';
import {VerticleButton  as ScrollUpButton} from "react-scroll-up-button";

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
              <YearComponent />
            </TabPanel>

            <TabPanel value="2">
              <MonthComponent />
            </TabPanel>
          </TabContext>
        </Box>
        <Button 
          className="add-event-button" 
          variant="outlined" 
          size="large" 
          startIcon={<ControlPointIcon />}
          onClick={handleAddEvent}
        >
          Nowe wydarzenie
        </Button>
        <div><ScrollUpButton style={{ width: '100px', backgroundColor: 'coral' }}/></div>
      </div>
    </div>
  );
}

export default Dashboard;