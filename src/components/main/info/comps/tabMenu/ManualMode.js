import React,{useState} from "react";
import { createTheme, ThemeProvider, Grid, Button, Slider, Stack, Typography, Box } from "@mui/material";
import { uploadMission,uploadMeter,uploadDegree,uploadVelocity,uploadManualData } from "../../../../../firebase_utils";
const missions = [
    {
      value: 'arm',
      label: '시동 on',
    },
    {
      value: 'disarm',
      label: '시동 off',
    },
    {
      value: 'takeoff',
      label: '이륙',
    },
    {
      value: 'land',
      label: '착륙',
    },
    {
        value: 'manual_up',
        label: '상승',
    },
    {
        value: 'manual_down',
        label: '하강',
    }, 
    {
      value: 'manual_turn_left',
      label: '왼쪽 회전',
    },
    {
      value: 'manual_forward',
      label: '전진',
    },
    {
      value: 'manual_turn_right',
      label: '오른쪽 회전',
    },
    {
      value: 'manual_left',
      label: '왼쪽',
    },
    {
      value: 'manual_right',
      label: '오른쪽',
    },
    {
      value: 'manual_back',
      label: '후진',
    },
];

let theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root:{
                  fontSize:13,
                  padding:0
                }
            }
        },
        MuiButton: { // Button에 대한 스타일 정의
          styleOverrides: {
              root: {
                  backgroundColor:'#D9D9D9', 
                  color:'black', 
                  fontWeight:'bold',
                  height: '65px', // 버튼의 높이 조절
                  minWidth: '10px',
                  minHeight: '5px',

                  '&:hover': {
                      backgroundColor: '#B0B0B0', // 호버 시 색상
                    },
                    '&:active': {
                      backgroundColor: '#909090', // 클릭 시 색상
                    }
              }
          }
      }, 
    }
})  

const ManualMode = () => {
  const [meterValue, setMeterValue] = useState(5); // 슬라이더의 초기값
  const [degreeValue, setDegreeValue] = useState(45);
  const [velocityValue, setVelocityValue] = useState(1);

  const handleChangeMeter = (event, newValue) => {
    setMeterValue(newValue);
    uploadMeter(newValue);
  };
  const handleChangeDegree = (event, newValue) => {
    setDegreeValue(newValue);
    uploadDegree(newValue);
  };
  const handleChangeVelocity = (event, newValue) => {
    setVelocityValue(newValue);
    uploadVelocity(newValue);
  };
  
  

  const clickManualModeBtn = (type) => {
    uploadMission(type); 
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ padding: 0 }} spacing={3}>

        <Grid item xs={3.5}>
          <Grid container spacing={1.7}>
            <Grid item xs={12}>
              <Button fullWidth onClick={() => uploadManualData("manual", 45, 5, 1)} 
                      style={{backgroundColor:'#A0C1FF'}}>Manual Mode Start</Button>
            </Grid>
          {missions.slice(0, 4).map((mission, index) => ( // missions 배열에서 0부터 3번 인덱스까지만 사용
          <Grid item xs={6} key={index} >
            <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
              {mission.label}
            </Button>
          </Grid>
          ))}
          </Grid>
        </Grid>

        <Grid item xs={1.4}>
          <Grid container spacing={1} >
            {missions.slice(4, 5).map((mission, index) => ( // missions 배열에서 4번 인덱스까지만 사용
            <Grid item xs={12} key={index}>
              <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
                {mission.label}
              </Button>
            </Grid>
            ))}
            <Grid item xs={12} style={{ visibility: 'hidden' }}>
              <Button fullWidth variant="outlined" disabled>
                중간 공간
              </Button>
            </Grid>
            {missions.slice(5, 6).map((mission, index) => ( // missions 배열에서 5번 인덱스까지만 사용
            <Grid item xs={12} key={index}>
              <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
                {mission.label}
              </Button>
            </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={3.8}>
          <Grid container spacing={1} >
          {missions.slice(6, 7).map((mission, index) => ( 
          <Grid item xs={4} key={index} container justifyContent="center" alignItems="center">
            <Button fullWidth onClick={() => clickManualModeBtn(mission.value)} style={{height:"50px", width:"70px"}}>
              {mission.label}
            </Button>
          </Grid>
          ))}
          {missions.slice(7, 8).map((mission, index) => ( 
          <Grid item xs={4} key={index}>
            <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
              {mission.label}
            </Button>
          </Grid>
          ))}
          {missions.slice(8,9).map((mission, index) => ( 
          <Grid item xs={4} key={index} container justifyContent="center" alignItems="center">
            <Button fullWidth onClick={() => clickManualModeBtn(mission.value)} style={{height:"50px", width:"70px"}}>
              {mission.label}
            </Button>
          </Grid>
          ))}
          {missions.slice(9, 10).map((mission, index) => ( 
          <Grid item xs={4} key={index}>
            <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
              {mission.label}
            </Button>
          </Grid>
          ))}
           <Grid item xs={4} style={{ visibility: 'hidden' }}>
              <Button fullWidth variant="outlined" disabled>
                중간 공간
              </Button>
            </Grid>
            {missions.slice(10, 11).map((mission, index) => ( // missions 배열에서 5번 인덱스까지만 사용
            <Grid item xs={4} key={index}>
              <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
                {mission.label}
              </Button>
            </Grid>
            ))}
            <Grid item xs={4} style={{ visibility: 'hidden' }}>
              <Button fullWidth variant="outlined" disabled>
                중간 공간
              </Button>
            </Grid>
            {missions.slice(11, 12).map((mission, index) => ( // missions 배열에서 5번 인덱스까지만 사용
            <Grid item xs={4} key={index}>
              <Button fullWidth onClick={() => clickManualModeBtn(mission.value)}>
                {mission.label}
              </Button>
            </Grid>
            ))}
          </Grid>
        </Grid>


        <Grid item xs={2.5}>
          <Stack sx={{ height: "90%" }} spacing={2} direction="row">
            <Box>
              <Typography variant="body2" gutterBottom>
                거리
              </Typography>
              <Slider
                aria-label="미터"
                orientation="vertical"
                valueLabelDisplay="auto"
                min={0}
                max={10}
                value={meterValue} // 슬라이더의 값은 meterValue로 설정합니다.
                onChange={handleChangeMeter}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                각도
              </Typography>
              <Slider
                aria-label="각도"
                orientation="vertical"
                valueLabelDisplay="auto"
                min={0}
                max={90}
                defaultValue={45}
                Value={degreeValue}
                onChange={handleChangeDegree}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                속도
              </Typography>
              <Slider
                aria-label="속도"
                orientation="vertical"
                valueLabelDisplay="auto"
                min={0.5}
                max={1.5}
                defaultValue={1}
                Value={velocityValue}
                onChange={handleChangeVelocity}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
    
}
export default ManualMode;