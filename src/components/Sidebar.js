import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

/*The sidebar container will be styled for creating a sidebar for links with Account, Professional Details and Support */
const SidebarContainer = styled(Drawer)({
  width: '250px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    paddingTop: '20px',
  },
  '@media (max-width: 768px)': {
    width: '200px',
    '& .MuiDrawer-paper': {
      width: '200px',
    },
  },
  '@media (max-width: 480px)': {
    width: '150px',
    '& .MuiDrawer-paper': {
      width: '150px',
    },
  },
});

const UserName = styled(Typography)({
  marginBottom: '30px',
  textAlign: 'center',
});

const NavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  margin: '10px 0',
  padding: '10px 20px',
  display: 'block', 
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: '#34495e',
    color: '#ecf0f1',
  },
});

const Sidebar = () => {
  return (
    <SidebarContainer variant="permanent">
      <div>
        <UserName variant="h5">Olivia Parker</UserName>
        <NavLink to="/">Account</NavLink>
        <NavLink to="/professional-details">Professional Details</NavLink>
        <NavLink to="/feedback">Feedback & Support</NavLink>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
