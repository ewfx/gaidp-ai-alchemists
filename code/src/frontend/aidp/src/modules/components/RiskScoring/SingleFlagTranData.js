
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '1.4rem', fontWeight:"bold", color:"red"}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#f8fafc',
  flexDirection: 'row-reverse',
//   border:"0.6px solid lightblue",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SingleFlagTranData(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx = {{borderRadius:"none !important", boxShadow:"none !important"}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Customer number - {props.custNbr}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            score - {props.score}
            <br></br>
            Flagged reason - {props.flaggedReason}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
  );
}
