import React, { useState, useCallback } from "react";
import { MapProvider, useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMarkerLocation } from '../../../../../firebase_utils';
import { setDestinationLat, setDestinationLng, setDestinationAlt } from '../../../../../redux/reducer/reducer';
import { Paper, TextField, Grid, Button, createTheme, ThemeProvider, InputAdornment} from "@mui/material";
import { uploadMission } from "../../../../../firebase_utils";

let theme = createTheme({
    components:{
        MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                    fontSize:'small'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root:{
                    fontSize:'small'
                }
            }
        },
        MuiInputAdornment: {
            styleOverrides:{
                root:{
                    fontSize:'small'
                }
            }
        }
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

    const clickDestinationBtn = () => {
        console.log('목적지 선택 버튼 클릭')
        setClickDestination(!clickDestination)
        map.on('click', handleMapClick);
        map.setZoom(17);
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
            <Grid container>
            <Grid item xs={6}>
                <Grid container>
                <Grid item xs={12}>
                    <Paper fullWidth style={{textAlign:'center'}}>Mission</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={clickDestinationBtn}>
                        목적지 선택
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={sendButtonEvent}>
                        선택 완료
                    </Button>
                </Grid>
                <Grid item xs={12}>
                <TextField
                            id="standard-basic"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Alt :</InputAdornment>,
                            }}
                            onChange={(event) => {
                                dispatch(setDestinationAlt(parseFloat(event.target.value)));
                            }}
                            value={alt}
                        />
                </Grid>
                <Grid item xs={12}>
                <TextField
                            id="standard-basic"
                            variant="standard"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Lat :</InputAdornment>,
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
                                startAdornment: <InputAdornment position="start">Lon :</InputAdornment>,
                            }}
                            value={lng}
                        />
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={() => clickAutoModeBtn("mission")}>자율주행 시작</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={() => clickAutoModeBtn("emergency")}>긴급착륙</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={() => clickAutoModeBtn("pause")}>멈춤</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={() => clickAutoModeBtn("resume")}>다시시작</Button>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </ThemeProvider>
      );

    
}
export default AutoMode;


