import React, { useState } from 'react';
import { createTheme, ThemeProvider, TextField, InputAdornment, Button } from '@mui/material';
import { uploadMarkerLocation } from '../../../../../firebase_utils';
import { useMap, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

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
const SET_DESTINATION = 'SET_DESTINATION';
const setDestination = (destination) => ({
    type: SET_DESTINATION,
    payload: destination,
  });

const SelectDestinationEvent = () => {
    const { map } = useMap();
    const [clickDestination, setClickDestination] = useState(false)
    const dispatch = useDispatch()
    const destination = useSelector((state)=>state.destination);

    const handleMapClick = (e) => {
        dispatch(setDestination(e.lngLat));
        
    };

    const clickDestinationBtn = () => {
        console.log('목적지 선택 버튼 클릭')
        setClickDestination(!clickDestination)
        map.on('click', handleMapClick);
        
    }

    const sendButtonEvent = () => {
        if (destination.lat && destination.lng) {
            const latitude = destination.lat;
            const longitude = destination.lng;
            const altitude = destination.alt;
            uploadMarkerLocation(latitude, longitude, altitude);
            map.off('click', handleMapClick);
            console.log('전송', destination); // This should log when the button is clicked
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
                            dispatch(setDestination({ ...destination, alt: parseFloat(event.target.value) })); // 목적지 altitude 업데이트
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Lat :</InputAdornment>,
                        }}
                        value={destination.lat}
                    />
                    <TextField
                        id="standard-basic"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Lon :</InputAdornment>,
                        }}
                        value={destination.lng}
                    />
                </>
            }
            <Button variant="contained" onClick={sendButtonEvent}>
                전송
            </Button>
            {destination && 
                <Marker longitude={destination.lng} latitude={destination.lat} color="blue" />
            }
        </ThemeProvider>
    );
};

export default SelectDestinationEvent;