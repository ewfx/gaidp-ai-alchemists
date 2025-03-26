import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import ResSummary from './ResSummary';
import FlaggedEntries from './FlaggedEntries';
import AnomalyDetection from './AnomalyDetection';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function MenuOption() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1,display: 'flex'}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', flexBasis:"20%" }}
      >
        <Tab label="Anomailes in Data" {...a11yProps(0)} />
        <Tab label="Flagged Transactions" {...a11yProps(1)} />
        
      </Tabs>

      <Card sx = {{flexBasis:"80%", boxShadow:"none !important"}}>
        <TabPanel value={value} index={0}>
            <FlaggedEntries/>
        </TabPanel>  
        <TabPanel value={value} index={1}>
            <AnomalyDetection/>
        </TabPanel>      
      </Card>
    </Box>
  );
}
