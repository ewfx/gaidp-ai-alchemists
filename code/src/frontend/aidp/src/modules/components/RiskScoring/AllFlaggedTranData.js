import { Card } from "@mui/material"
import SingleFlagTranData from "./SingleFlagTranData";

function AllFlaggedTranData(){
    const accordionItems = [
        {
            "custNbr": "123565",
            "score": "0.8",
            "flaggedReason": "flagged due to insufficient balance"
        },
        {
            "custNbr": "987654",
            "score": "0.6",
            "flaggedReason": "flagged due to late payment"
        },
        {
            "custNbr": "456789",
            "score": "0.4",
            "flaggedReason": "flagged due to overdraft"
        },
        {
            "custNbr": "321654",
            "score": "0.9",
            "flaggedReason": "flagged due to high-risk activity"
        },
        {
            "custNbr": "852963",
            "score": "0.3",
            "flaggedReason": "flagged due to account suspension"
        },
        {
            "custNbr": "741852",
            "score": "0.7",
            "flaggedReason": "flagged due to missing documents"
        },
        {
            "custNbr": "369258",
            "score": "0.5",
            "flaggedReason": "flagged due to multiple chargebacks"
        },
        {
            "custNbr": "147258",
            "score": "0.2",
            "flaggedReason": "flagged due to fraudulent activity"
        },
        {
            "custNbr": "963741",
            "score": "0.1",
            "flaggedReason": "flagged due to negative credit history"
        },
        {
            "custNbr": "753159",
            "score": "0.85",
            "flaggedReason": "flagged due to unusual transactions"
        }    
    ];
    return (
        
        <Card sx={{borderRadius:"none !important", boxShadow:"none !important"}}>

            {accordionItems.map((item)=>{
                return (
                    <SingleFlagTranData custNbr = {item.custNbr} score = {item.score} flaggedReason = {item.flaggedReason}/>
                );
            })}
            
        </Card>
    )
}
export default AllFlaggedTranData