import { Box } from "@mui/material";
import { AppProvider } from "modules/context-api/AppContext";
import ContentPanel from "../components/ContentPanel";

function HomePage() {
  return (
    <AppProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ContentPanel />
      </Box>
    </AppProvider>
  );
}

export default HomePage;
