import { Box } from "@mui/material"
import ContentPanel from "../components/ContentPanel"
import Footer from "../components/Footer"
import Header from "../components/Header"

function HomePage(){
    return (
        <Box sx = {{display:"flex", flexDirection:"column", alignItems:"center"
        // ,marginTop:'15vh'
        }}>
            {/* <Header/> */}
            <ContentPanel/>
            {/* <Footer/> */}
        </Box>       
    )
}

export default HomePage