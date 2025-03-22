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
<<<<<<< HEAD
        <Card sx={{margin:"-24px", borderLeft:"1px solid red"}}>
=======
        <Card sx={{margin:"-24px", borderRadius:"none !important", boxShadow:"none !important"}}>
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473

            {!fileUploaded && <UploadDocCsv onUpload = {handleUpload}/>}
            {fileUploaded && 
                <AllFlaggedTranData/>
            }
        </Card>
    )
}

export default FlaggedEntries