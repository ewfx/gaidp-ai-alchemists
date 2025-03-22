import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "grey.100",
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        height: '5vh', 
        minHeight: '5vh', 
        maxHeight: '5vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', 
        px: 1 
      }}
    >
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{
          lineHeight: 1, 
          fontSize: '0.6rem' 
        }}
      >
        © {new Date().getFullYear()} AuditHelp
      </Typography>
    </Box>
  );
};

export default Footer;