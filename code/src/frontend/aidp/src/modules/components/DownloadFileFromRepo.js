import React from "react";
import axios from "axios";
import Button from "@mui/material/Button"

const DownloadFileFromRepo = ({ filename }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/download/${filename}`, {
        responseType: "blob", // Important for handling binary files
      });

      // Create a link element and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    
    <Button variant="contained" onClick={handleDownload}>Download the file with anomalies</Button>
  );
};

export default DownloadFileFromRepo;
