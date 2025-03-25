import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Paper,
  styled,
  Typography
} from "@mui/material";
import axios from "axios";
import { useAppContext } from "modules/context-api/AppContext";
import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledUploadBox = styled(Paper)(({ theme }) => ({
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
  const { 
    generatedRules, 
    setGeneratedRules, 
    uploadedFiles, 
    setUploadedFiles 
  } = useAppContext();
  
  const [isLoading, setIsLoading] = useState(false);

  const parseData = (data) => {
    const sections = data.split(/\n\n/);
    return sections.map((section, index) => {
      const [titleLine, ...rules] = section.split("\n");
      const title = titleLine.replace(/\d+\)/, "").trim();
      const formattedRules = rules.map((r) => r.replace(/^[-•]\s*/, "").trim());
      return { number: index + 1, title, rules: formattedRules };
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const handleFileUpload = async (event) => {
    const file=event.target.files
    setUploadedFiles([...uploadedFiles, ...file]);
    const files=[...uploadedFiles, ...file];

    const csvFile = files.find((file) => file.type === "text/csv" || file.type === "application/vnd.ms-excel");
    const pdfFile = files.find((file) => file.type === "application/pdf");

  // Check if both CSV and PDF are uploaded — then trigger API
  console.log(files);
  console.log(pdfFile);
  if (csvFile && pdfFile) {
    console.log("✅ Both files uploaded, sending to backend...");

    const formData = new FormData();
    formData.append("files", csvFile);
    formData.append("files", pdfFile);
    setIsLoading(true);
    await axios.post('http://127.0.0.1:8001/generateRules', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((response) => {
            console.log(response.data);
            // setGeneratedRules(response.data["generated_rules"]);
            setGeneratedRules(parseData(response.data["generated_rules"]));
            setIsLoading(false);
          });
    
  }
    
    // if (file) {
    //   setUploadedFile(file.name);
    //   // Handle file processing here
    //   const formData = new FormData() 
    //   formData.append('file', file);
    //   try {
    //     // Send the file to the backend
    //     const response = await axios.post('http://127.0.0.1:8000/generateRules', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
  
    //     // Handle the response from the backend
    //     console.log(response)
    //     console.log('File uploaded successfully:', response.data.message);
    //   } catch (error) {
    //     console.error('Error uploading file:', error);
    //   }
    // }
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
      {/* Upload Dropbox */}
     <label>
        <StyledUploadBox variant="outlined" sx={{ mb: 4 }}>
          <CloudUpload fontSize="large" color="primary" sx={{ mb: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <span
                  key={index}
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    cursor: "pointer",
                    color: "#1976D2",
                    marginRight: "10px",
                  }}
                >
                  {file.name} ❌
                </span>
              ))
            ) : (
              "Drop files here or click to upload"
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: .pdf, .csv
          </Typography>
          <VisuallyHiddenInput
            type="file"
            accept=".pdf,.csv"
            multiple
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
        <Grid item xs={12}>
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
                {isLoading ? (
                  <ThreeDot
                    variant="pulsate"
                    color="#d32f2f"
                    size="medium"
                    text=""
                    textColor=""
                  />
                ) : generatedRules.length > 0 ? (
                  <div className="p-4 space-y-4">
                    {generatedRules.map(
                      (field, index) =>
                        field.title &&
                        field.title !== "." && (
                          <div
                            key={index}
                            className="border rounded-lg p-4 shadow-md"
                          >
                            <h2 className="text-xl font-bold text-blue-600 mb-2">{`${
                              index + 1
                            }) ${field.title}`}</h2>
                            <ul className="list-decimal pl-6 space-y-1">
                              {field.rules.map((rule, idx) => (
                                <p key={idx} className="text-gray-700">
                                  {rule}
                                </p>
                              ))}
                            </ul>
                          </div>
                        )
                    )}
                  </div>
                ) : (
                  "Please upload files to generate rules"
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenerateRules;
