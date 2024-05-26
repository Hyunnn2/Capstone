import React, { useState, useCallback } from "react";
import { useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMarkerLocation } from '../../../../../firebase_utils';
import { setDestinationLat, setDestinationLng, setDestinationAlt ,setMarkerTrue} from '../../../../../redux/reducer/reducer';
import { Paper, TextField, Grid, Button, createTheme, ThemeProvider, Slider, Box} from "@mui/material";
import { uploadMission } from "../../../../../firebase_utils";

let theme = createTheme({
    components:{
        MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                    fontSize:'small',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root:{
                    fontSize:'small',
                }
            }
        },
        MuiButton: { // Button에 대한 스타일 정의
            styleOverrides: {
                root: {
                    backgroundColor:'#D9D9D9', 
                    color:'black', 
                    fontWeight:'bold',
                    height: '45px', // 버튼의 높이 조절
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

const AutoMode = () => {
    const { map } = useMap();
    const [clickDestination, setClickDestination] = useState(false)
    const dispatch = useDispatch()
    const { lat, lng, alt } = useSelector((state) => state);
 


    const handleMapClick = useCallback((e) => {
        const lat = e.lngLat.lat;
        const lng = e.lngLat.lng;
        dispatch(setDestinationLat(lat));
        dispatch(setDestinationLng(lng));
    }, [dispatch]);

    const handleChange = (event, newValue) => {
        dispatch(setDestinationAlt(newValue));
      };

    const clickDestinationBtn = () => {
        console.log('목적지 선택 버튼 클릭')
        uploadMission("mission_start")
        dispatch(setMarkerTrue())
        setClickDestination(!clickDestination)
        map.on('click', handleMapClick);
        map.setZoom(19);
    }

    const sendButtonEvent = () => {
        if (lat && lng) {
            const latitude = lat;
            const longitude = lng;
            const altitude = alt;
            console.log('전송', latitude, longitude, altitude);
            uploadMarkerLocation(latitude, longitude, altitude);
            uploadMission("upload")
            map.off('click', handleMapClick);
            uploadMission("Waiting...")

            console.log('click event off')
        } else {
            console.log("목적지를 선택해주세요.");
        }
    };
    const clickAutoModeBtn = (type) => {
        uploadMission(type); 
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ padding: 0 }} spacing={3}>
                <Grid item xs={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper fullWidth style={{textAlign:'center', backgroundColor:'rgb(44,44,44)', color:'white'}}>Mission</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={clickDestinationBtn} style={{height:'40px'}}>
                                목적지 선택
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={sendButtonEvent} style={{height:'40px'}}>
                                선택 완료
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ color: 'white', width: '45px', fontSize:'small'}}>Alt :</div>
                                <Box sx={{ width: 400, ml: 2 }}>
                                    <Slider
                                    aria-label="Altitude"
                                    value={alt}
                                    step={1}
                                    marks={false}
                                    min={5}
                                    max={30}
                                    defaultValue={10}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    sx={{
                                        color: 'secondary.main',
                                        '& .MuiSlider-thumb': {
                                        color: 'white',
                                        },
                                        '& .MuiSlider-track': {
                                        color: 'white',
                                        },
                                        '& .MuiSlider-rail': {
                                        color: 'grey',
                                        },
                                    }}
                                    />
                                </Box>
                                </Box>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <div position="start" style={{ color: 'white', width:'50px' }}>Lat :</div>,
                                        style: { color: 'white' },
                                    }}
                                    value={lat}
                                />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <div position="start" style={{ color: 'white', width:'50px' }}>Lon :</div>,
                                        style: { color: 'white' },
                                    }}
                                    value={lng}
                                />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <Button fullWidth onClick={() => clickAutoModeBtn("mission")} >
                                자율주행 시작</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={() => clickAutoModeBtn("pause")} >
                                멈춤</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={() => clickAutoModeBtn("resume")} >
                                다시시작</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth onClick={() => clickAutoModeBtn("emergency")} 
                                    style={{backgroundColor:'#F43A3A', color:'white'}} >
                                긴급착륙</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={() => clickAutoModeBtn("return")}>return</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth onClick={() => clickAutoModeBtn("land")}>착륙</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
      );

    
}
export default AutoMode;


