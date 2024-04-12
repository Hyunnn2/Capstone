// MapMenu.js
import React from 'react';
import mapboxgl from 'mapbox-gl';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { uploadMarkerLocation } from '../../../../firebase_utils'
import './MapMenu.css';


const MapMenu = ({ map }) => {
    const [toggleMenu, setToggleMenu] = React.useState(false)
    const [selectDestination, setSelectDestination] = React.useState(false)
    const [destination, setDestination] = React.useState({})


    const handleButtonClick = () => {
        setToggleMenu(!toggleMenu);
    };

    const selectDestinationEvent = () => {
        console.log('목적지 선택 버튼 클릭')
        // 목적지 선택 버튼 토글
        setSelectDestination(!selectDestination)
    
        // 맵 클릭 이벤트 리스너 추가
        // 목적지 선택 버튼이 false일때 맵 클릭 이벤트 리스너를 지워주고 다시 true가되면 이벤트리스너가 추가되는 방식으로 변경되어야한다
        map.on('click', (e) => {
            var coordinates = e.lngLat;
            setDestination(coordinates)
            new mapboxgl.Marker()
                .setLngLat(coordinates)
                .addTo(map)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3>위도: ${coordinates.lat}</h3><p>경도: ${coordinates.lng}</p>`)
                )
        });
    };

    const sendButtonEvent = () => {
        const latitude = destination.lat;
        const longitude = destination.lng;
        const altitude = destination.alt;
        uploadMarkerLocation(latitude, longitude, altitude);
        console.log(1); // This should log when the button is clicked
    };


    return (
        <div className='MapMenu'>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleButtonClick}
            >
                <MenuIcon />
            </IconButton>
            {toggleMenu &&
                <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgb(255, 255, 255, 0.8)' }}>
                    <Button variant="contained" onClick={selectDestinationEvent}>목적지 선택</Button>
                    {selectDestination &&
                        <>
                            <TextField
                                id="standard-basic"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Alt :</InputAdornment>,
                                }}
                                onChange={(event) => {
                                    destination.alt = parseFloat(event.target.value)
                                    setDestination(destination)
                                    console.log(destination)
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
                    <Button variant="contained" onClick={sendButtonEvent}>전송</Button>
                </div>
            }
        </div>
    );
};

export default MapMenu;
