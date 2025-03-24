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
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                {Array.isArray(row.violations_data.violations_data) && (
                  row.violations_data.violations_data.map((v, index) => (
                    <p key={index}>
                      <strong>❌ Violation:</strong> {v.violation}
                      <br />
                      <strong>🛠️ Remediation:</strong> {v.remediation}
                    </p>
                  ))
                )  }
              </ul>
            ) : (
              <Typography>No violations detected 🎉</Typography>
            )}
            <hr />

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
