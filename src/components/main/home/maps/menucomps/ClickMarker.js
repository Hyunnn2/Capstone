import React, { useState, useCallback } from 'react';
import { createTheme, ThemeProvider, TextField, InputAdornment, Button } from '@mui/material';
import { uploadMarkerLocation } from '../../../../../firebase_utils';
import { useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { setDestinationLat, setDestinationLng, setDestinationAlt } from '../../../../../redux/reducer/reducer';

let theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '90px',
                    height: '30px',
                    margin: '5px',
                    fontSize: 10
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '90px',
                    height: '30px'
                }
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 'x-small'
                }
            },
        },

        MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                    fontSize: 'x-small'
                }
            }
        },
    }
})


const SelectDestinationEvent = () => {
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
            map.off('click', handleMapClick);
            console.log('click event off')
        } else {
            console.log("목적지를 선택해주세요.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={clickDestinationBtn}>
                목적지 선택
            </Button>
            {clickDestination &&
                <>
                    <TextField
                        id="standard-basic"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Alt :</InputAdornment>,
                        }}
                        onChange={(event) => {
                            dispatch(setDestinationAlt(parseFloat(event.target.value)));
                        }}
                        value={alt}
                    />
                    <TextField
                        id="standard-basic"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Lat :</InputAdornment>,
                        }}
                        value={lat}
                    />
                    <TextField
                        id="standard-basic"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Lon :</InputAdornment>,
                        }}
                        value={lng}
                    />
                </>
            }
            <Button variant="contained" onClick={sendButtonEvent}>
                전송
            </Button>
        </ThemeProvider>
    );
};

export default SelectDestinationEvent;
