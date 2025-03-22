<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState } from "react";
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Paper,
  Grid,
  styled,
  Avatar,
  colors,
<<<<<<< HEAD
  Card
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import axios from 'axios';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
=======
  Card,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
  width: 1,
});

const StyledUploadBox = styled(Paper)(({ theme }) => ({
<<<<<<< HEAD
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
const GenerateRules = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = async (event) => {
=======
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const GenerateRules = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      // Handle file processing here
<<<<<<< HEAD
      const formData = new FormData() 
      formData.append('file', file);
      try {
        // Send the file to the backend
        const response = await axios.post('http://127.0.0.1:8000/generateRules', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Handle the response from the backend
        console.log(response)
        console.log('File uploaded successfully:', response.data.message);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
=======
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // Fix for flex container
        height: "100%",
        mx: "auto",
        p: 4,
      }}
    >
<<<<<<< HEAD

=======
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
      {/* Upload Dropbox */}
      <label>
        <StyledUploadBox variant="outlined" sx={{ mb: 4 }}>
          <CloudUpload fontSize="large" color="primary" sx={{ mb: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom>
            {uploadedFile || "Drop files here or click to upload"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: .pdf, .doc, .docx
          </Typography>
          <VisuallyHiddenInput
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
        </StyledUploadBox>
      </label>

      {/* Content Grid */}
      <Grid
        container
        spacing={4}
        sx={{
          flex: 1, // Take remaining space
          minHeight: 0, // Fix for flex container
          height: "100%",
          "& > .MuiGrid-item": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Generated Rules
            </Typography>
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Typography color="textSecondary">
                No rules generated yet
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Document Summary
            </Typography>
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Typography color="textSecondary">
                Document summary will appear here...
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

<<<<<<< HEAD
export default GenerateRules;
=======
export default GenerateRules;
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473
