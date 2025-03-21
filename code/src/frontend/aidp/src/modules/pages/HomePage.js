import ContentPanel from "../components/ContentPanel"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Box, Card } from "@mui/material"
function HomePage(){
    return (
        <Box sx = {{display:"flex", flexDirection:"column", border:"2px solid green", alignItems:"center"}}>
            <Header/>
            <ContentPanel/>
            <Footer/>
        </Box>       
    )
}

export default HomePage