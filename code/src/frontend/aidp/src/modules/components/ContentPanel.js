import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GenerateRules from './GenerateRules/GenerateRules';
import RefineRules from './RefineRules/RefineRules';
import RiskScoring from './RiskScoring/RiskScoring';
import { Card } from '@mui/material';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ContentPanel() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx = {{display:"flex", flexDirection:"column", width:"90%", border:"1px solid yellow", flexGrow:1}}>
      
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Generate Rules" {...a11yProps(0)} />
          <Tab label="Refine Rules" {...a11yProps(1)} />
          <Tab label="Risk Scoring" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <GenerateRules/>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RefineRules/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <RiskScoring/>
      </TabPanel>
  
    </Card>
  );
}
