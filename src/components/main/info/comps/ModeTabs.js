import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AutoMode from './tabMenu/AutoMode.js';
import ManualMode from './tabMenu/ManualMode.js';
import './ModeTabs.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  className='ModeTabsContainer' >
      <Box sx={{ position: 'relative', boxShadow: '0px 2px 0px rgba(255, 255, 255, 0.15)'}}> 
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"  // 텍스트 색상 상속
          TabIndicatorProps={{
            style: {
              backgroundColor: '#1976D2',  // 탭 인디케이터 색상
              bottom: '0px',
            },
          }}
        >
          <Tab 
            label="Auto Mode" 
            {...a11yProps(0)} 
            sx={{ 
              color: value === 0 ? '#1976D2' : '#FFFFFF',  // 선택되었을 때 파란색, 기본은 흰색
              fontWeight: value === 0 ? 'bold' : 'normal',  // 선택되었을 때 글씨체 두껍게
              fontSize: value === 0 ? '1.2rem' : '1rem',
            }}  
          />
          <Tab 
            label="Manual Mode" 
            {...a11yProps(1)} 
            sx={{ 
              color: value === 1 ? '#1976D2' : '#FFFFFF',  // 선택되었을 때 파란색, 기본은 흰색
              fontWeight: value === 1 ? 'bold' : 'normal',  // 선택되었을 때 글씨체 두껍게
              fontSize: value === 1 ? '1.2rem' : '1rem',
            }}  
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AutoMode />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ManualMode />      
      </CustomTabPanel>
    </Box>
  );
}