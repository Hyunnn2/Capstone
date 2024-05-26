import React, { useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {createTheme, ThemeProvider, Box, IconButton } from '@mui/material';
import {useDrag} from 'react-use-gesture';
import VideoPlayer from '../../home/zed/VideoPlayer';

let theme = createTheme({
  components:{
    MuiButton: {
      styleOverrides: {
          root: {
              minWidth: '24px',
              maxWidth: '24px',
              minHeight: '24px',
              maxHeight: '24px',
              marginLeft: '76px',
              padding: 0,
              backgroundColor: 'whitesmoke',
          }
      }
   }
 }
})

const Streaming = () => {
    const [clickStreaming, setClickStreaming] = useState(false)
    const [boxPosition, setBoxPosition] = useState({x:300, y:300})
    const [boxSize, setBoxSize] = useState({ width: 250, height: 150 })
    const [isResized, setIsResized] = useState(false);
    const bindBoxPos = useDrag((params)=>{
      setBoxPosition({
        x: params.offset[0],
        y: params.offset[1],
      })
    });
    const handleResizeClick = () => {
      if (isResized) {
        setBoxSize({ width: 250, height: 150 });
      } else {
        setBoxSize({ width: 500, height: 300 });
      }
      setIsResized(!isResized);
    };
    const clickStrimBtn = () => {
      setClickStreaming(!clickStreaming)
    }
  

  return (
    <ThemeProvider theme={theme}>
      <IconButton 
        sx={{ 
          borderRadius: '0%', 
          backgroundColor: '#D9D9D9',
          '&:hover': {
            backgroundColor: '#B0B0B0', // 호버 시 색상
          },
          '&:active': {
            backgroundColor: '#909090', // 클릭 시 색상
          }
        }} 
        color="primary" 
        onClick={clickStrimBtn}
      >
        <VideocamIcon/>
      </IconButton>
      {clickStreaming && (
        <Box {...bindBoxPos()}
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'lightblue', 
            display: 'flex', 
            position: 'absolute', 
            top:boxPosition.y,
            left:boxPosition.x,
            width: boxSize.width, 
            height: boxSize.height, 
            zIndex: 101, 
        }}
        >
        
          <VideoPlayer />
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleResizeClick}>
            <OpenInFullIcon sx={{ fontSize: 'small' }}/>
          </IconButton>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Streaming; 

