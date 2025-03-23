import { Card } from "@mui/material"
import MenuOption from "./MenuOptions"
import ResultPane from "./ResultPane"

function RiskScoring(){
    return (
        <Card sx = {{mx:"auto", p:3, display:"flex"}}>
            <MenuOption/> 
        </Card>
    )
}

export default RiskScoring
