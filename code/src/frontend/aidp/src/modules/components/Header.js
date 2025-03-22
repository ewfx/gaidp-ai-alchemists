import { Balance } from '@mui/icons-material';
import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
  
  
  const HeaderTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    '& .title-text': {
      fontWeight: 500,
    },
    '& .icon-wrapper': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '50%',
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center'
    }
  }));
  
  const Header = () => {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <HeaderTitle>
            <div className="icon-wrapper">
              <Balance 
                fontSize="large" 
                sx={{ 
                  color: theme => theme.palette.primary.main,
                  fontSize: '2rem'
                }}
              />
            </div>
            <Typography 
              variant="h4" 
              className="title-text"
              sx={{ 
                color: theme => theme.palette.secondary.main,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              AuditHelp
            </Typography>
          </HeaderTitle>
        </Toolbar>
      </AppBar>
    );
  };

  export default Header;
  
