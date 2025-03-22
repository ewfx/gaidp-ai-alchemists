import { Card } from "@mui/material"
import MenuOption from "./MenuOptions"
import ResultPane from "./ResultPane"

function RiskScoring(){
    return (
        <Card sx = {{display:"flex", mx: "auto",
            p: 4, borderRadius:"none !important", boxShadow:"none"}}>
            <MenuOption/> 
        </Card>
    )
}

export default RiskScoring
