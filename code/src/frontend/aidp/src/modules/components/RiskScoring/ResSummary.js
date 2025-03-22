import { Card } from "@mui/material"
import UploadDocCsv from "./UploadDoccsv"
import { useState } from "react"

function ResSummary(){
    const [fileUploaded, setFileUploaded] = useState(false);
    const handleUpload = (uploadFlag)=>{
        setFileUploaded(uploadFlag)
    }

    return (
        <Card sx={{margin:"-24px", borderRadius:"none !important", boxShadow:"none"}}>

            {!fileUploaded && <UploadDocCsv onUpload = {handleUpload}/>}
            {fileUploaded && 
                <h1>doned</h1>
            }
        </Card>
    )
}   

export default ResSummary