import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import ResSummary from './ResSummary';
import FlaggedEntries from './FlaggedEntries';
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
        <Tab label="Summary Of Score Document" {...a11yProps(0)} />
        <Tab label="Flagged Transactions" {...a11yProps(1)} />
      </Tabs>

<<<<<<< HEAD
      <Card sx = {{flexBasis:"80%"}}>
=======
      <Card sx = {{flexBasis:"80%", borderRadius:"none !important", boxShadow:"none"}}>
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
        <TabPanel value={value} index={0}>
            <ResSummary/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FlaggedEntries/>
        </TabPanel>      
      </Card>
    </Box>
  );
}
