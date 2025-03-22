import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import HomePage from "./modules/pages/HomePage";
import theme from "./theme";
import Layout from "modules/pages/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
