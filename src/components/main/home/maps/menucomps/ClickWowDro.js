import React, { useState, useEffect } from 'react';
import { FormGroup, createTheme, ThemeProvider, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useMap } from 'react-map-gl';
import { useDispatch } from 'react-redux';

import { addGeojson, removeGeojson } from '../../../../../redux/reducer/reducer';

let theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 'x-small'
                }
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    height: '20px',
                    width: '20px',
                    padding: '4px'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginLeft: "0px",
                    marginRight: '0px'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    height: '15px',
                    width: '15px'
                }
            }
        }
    }
})



const OpenWowdroEvent = () => {
    const dispatch = useDispatch();
    const [wowDroData, setWowDroData] = useState([]);
    const { map } = useMap();

    useEffect(() => {
        async function fetchData() {
            try {
                const wowDroData = await window.electronAPI.getwowDroHandler();
                setWowDroData(wowDroData);
                console.log("WowDroData:", wowDroData)
            } catch (error) {
                console.error('Error fetching map mode data:', error);
            }
        }
        fetchData()
    }, [])

    const addPolygonToMap = (map, folderName, polygon, index, color) => {
        function parsePolygonString(polygonString) {
            // 문자열을 줄 단위로 분할하여 각 좌표를 추출합니다.
            const coordinates = polygonString.trim().split('\n');

            // 좌표를 저장할 배열을 초기화합니다.
            const parsedCoordinates = [];

            // 각 좌표에 대해 위도와 경도를 추출합니다.
            coordinates.forEach(coordinate => {
                // 쉼표를 기준으로 좌표를 분할합니다.
                const [lon, lat] = coordinate.trim().split(',');
                // 위도와 경도를 실수로 변환하여 배열에 추가합니다.
                parsedCoordinates.push([parseFloat(lon), parseFloat(lat)]);
            });

            return parsedCoordinates;
        }

        const parsedCoordinates = parsePolygonString(polygon);
        // console.log('수정된 폴리곤', parsedCoordinates)
        // 색상을 반영하여 폴리곤을 시각화하는 레이어 추가
        
        const newGeojson = {
            type: "FeatureCollection",
            features: [{
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [parsedCoordinates] // 폴리곤의 좌표 배열을 한 번 더 감싸서 2D 배열로 만듭니다.
                }
            }]
        };
        dispatch(addGeojson(folderName, newGeojson))
    };

    const removePolygonFromMap = (map, folderName, index) => {
        dispatch(removeGeojson(folderName))
    };


    const handleCheckboxClick = (event, folderName) => {
        const isChecked = event.target.checked;
        const selectedFolder = wowDroData.find(item => item.folderName === folderName);
        if (selectedFolder) {
            const polygonList = selectedFolder.polygonList;
            const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF'];
            // 폴리곤별로 색상을 지정하여 맵에 추가하는 작업 수행
            polygonList.forEach((polygon, index) => {
                const color = colors[index % colors.length]; // 인덱스에 따라 색상을 선택
                if (isChecked) {
                    addPolygonToMap(map, folderName, polygon[0], index, color); // 체크된 경우 폴리곤을 추가합니다.
                } else {
                    removePolygonFromMap(map, folderName, index); // 체크가 해제된 경우 폴리곤을 제거합니다.
                }
            });
        }
    };



    return (
        <ThemeProvider theme={theme}>
            <FormGroup>
                {wowDroData.map((item, index) => (
                    <div className="menu-item" key={index}>
                        <FormControlLabel
                            control={<Checkbox id={`menu${index + 1}`} name={`menu${index + 1}`} onClick={(event) => handleCheckboxClick(event, item.folderName)} />}
                            label={item.folderName}
                        />
                    </div>
                ))}
            </FormGroup>
        </ThemeProvider >
    );
};
export default OpenWowdroEvent;

