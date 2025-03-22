import React, { useState } from 'react';
import { Card, Box } from '@mui/material';
import classes from "./UploadDoc.module.css"
const UploadDocCsv = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Validate file type
    if (selectedFile && selectedFile.type === 'text/csv') {
      setError('');
      setFile(selectedFile);

      // Read the CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        console.log('CSV Content:', csvContent);
        // You can process the CSV content here (e.g., parse it into an array of objects)
      };
      reader.readAsText(selectedFile);
      props.onUpload(true)
    } else {
      setError('Please upload a valid CSV file.');
      setFile(null);
    }
  };

  return (
    <Card sx = {{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly", marginTop:"2%"}}>
      <h2>First Upload a CSV file for Scoring</h2>
      <Card sx={{bgcolor:"transparent", display:"flex", alignItems:"center", flexDirection:"column", borderRadius:"none !important", boxShadow:"none"}}>
        {/* <label for="file">choose a file</label> */}
        <input className={classes.input_csv}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
            name = "file"
          />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {file && (
          <div>
            <p>Selected File: {file.name}</p>
            <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
            <h4>file uploaded successfully</h4>
          </div>
          
        )}

        
      </Card>
    </Card>
  );
};

export default UploadDocCsv;