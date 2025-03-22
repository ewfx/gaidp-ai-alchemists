import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import GenerateRules from './GenerateRules/GenerateRules';
import RefineRules from './RefineRules/RefineRules';
import RiskScoring from './RiskScoring/RiskScoring';


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
        <Box sx={{ p: 3,padding:'0px' }}>
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
    <Card variant="outlined" sx={{
      display: "flex",
      flexDirection: "column",
      width: "90%",
      padding: "30px",
      marginTop: "30px",
      marginBottom: "30px",
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
      flexGrow:1,
    }}>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: '#f8fafc',
        padding:"0px"
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.light,
              height: 3
            }
          }}
        >
          <Tab label="Generate rules" {...a11yProps(0)} 
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              color: value === 0 ? theme.palette.primary.main : 'text.secondary',
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }}/>
          <Tab label="Refine rules" {...a11yProps(1)} 
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              color: value === 1 ? theme.palette.primary.main : 'text.secondary',
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }}/>
          <Tab label="Risk scoring" {...a11yProps(2)} 
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              color: value === 2 ? theme.palette.primary.main : 'text.secondary',
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }}/>
        </Tabs>
      </Box>

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