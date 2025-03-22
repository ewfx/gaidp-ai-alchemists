import { Card } from "@mui/material"
import UploadDocCsv from "./UploadDoccsv"
import { useState } from "react"

function ResSummary(){
    const [fileUploaded, setFileUploaded] = useState(false);
    const handleUpload = (uploadFlag)=>{
        setFileUploaded(uploadFlag)
    }

    return (
<<<<<<< HEAD
        <Card sx={{margin:"-24px", borderRadius:"none !important", boxShadow:"none"}}>
=======
        <Card sx={{borderRadius:"none !important", boxShadow:"none"}}>
>>>>>>> 7937abaa419056b72e41dab09a37fac0b8cad473

            {!fileUploaded && <UploadDocCsv onUpload = {handleUpload}/>}
            {fileUploaded && 
                <h1>doned</h1>
            }
        </Card>
    )
}   

export default ResSummary