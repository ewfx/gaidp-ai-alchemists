import { Card } from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios";
import { useState } from "react";
import DownloadFileFromRepo from "modules/components/DownloadFileFromRepo";
function AnomalyDetection(){
    const [anomalyFileName, setAnomalyFileName] = useState("")
    const [resGenerated, setResGenerated] = useState(false)
    const handleAnomaly = async()=>{
        try {
            // Send the file to the backend
            const response = await axios.get("http://127.0.0.1:8000/getAnomalyDetection");
            console.log("response:" + response.data.filename)
            setAnomalyFileName(response.data.filename)
            setResGenerated(true)
          } catch (error) {
            console.error("Error in processing the anomaly ", error);
          }
    }

    return (
        <Card sx = {{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly", boxShadow:"none !important"}}>
            {!resGenerated && 
                <>
                    <h2 style={{color:"#d32f2f"}}>Click the below button to see the anomalies in the dataset</h2>
                    <Button variant="contained" onClick={handleAnomaly}>Click for results</Button>  
                </>
            }
            {resGenerated && <DownloadFileFromRepo filename={anomalyFileName} />}
        </Card>
    )

}

export default AnomalyDetection