import { Card } from "@mui/material"
import UploadDocCsv from "./UploadDoccsv"
import { useState } from "react";
import AllFlaggedTranData from "./AllFlaggedTranData";
function FlaggedEntries(){
    const [fileUploaded, setFileUploaded] = useState(true);
    const handleUpload = (uploadFlag)=>{
        setFileUploaded(uploadFlag)
    }
    
    return (
        <Card sx={{margin:"-24px", borderRadius:"none !important", boxShadow:"none !important"}}>

            {!fileUploaded && <UploadDocCsv onUpload = {handleUpload}/>}
            {fileUploaded && 
                <AllFlaggedTranData/>
            }
        </Card>
    )
}

export default FlaggedEntries