import * as React from "react";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Styled Accordion setup
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: "1.4rem", fontWeight: "bold", color: "#1976d2" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .05)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "#f5f5f5",
}));

// Main Component
export default function SingleFlagTranData({ rowIndex, row }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === `panel${rowIndex}`} onChange={handleChange(`panel${rowIndex}`)}>
        <AccordionSummary aria-controls={`panel${rowIndex}d-content`} id={`panel${rowIndex}d-header`}>
          <Typography component="span">
            🚨 Row {rowIndex + 1}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <strong>⚠️ Risk Score:</strong> {row?.violations_data?.risk_score || "N/A"}
            <br />
            <strong>🚩 Flagged Reason:</strong>
            {row?.violations_data?.violation_exists ? (
              <ul>
                {Object.entries(row.violations_data.violations).map(([field, reason], index) => (
                  <li key={index}><strong>{field}:</strong> {reason}</li>
                ))}
              </ul>
            ) : (
              <span>No violations detected.</span>
            )}
            <br />
            <strong>🛠️ Suggested Remediation:</strong>
            <ul>
              {Object.entries(row.violations_data.remediations).map(([field, fix], index) => (
                <li key={index}><strong>{field}:</strong> {fix}</li>
              ))}
            </ul>
            {/* Row Data as Table Section */}
            <strong>📌 Row Details:</strong>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
              <Table size="small" aria-label="row details table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Field</strong></TableCell>
                    <TableCell><strong>Value</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(row.row).map(([key, value], index) => (
                    <TableRow key={index}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{typeof value === "object" ? JSON.stringify(value) : value?.toString() || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
