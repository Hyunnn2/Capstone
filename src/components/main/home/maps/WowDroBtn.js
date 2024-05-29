import React, { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-map-gl';
import { Box, SpeedDial, SpeedDialIcon,createTheme, ThemeProvider, SpeedDialAction } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { addGeojson, removeGeojson } from '../../../../redux/reducer/reducer'; // 적절한 경로로 수정
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
let theme = createTheme({
    components: {
        MuiFab: {
            styleOverrides: {
                root: {
                    height: '48px',
                    width: '48px',
                    minHeight:'32px'
                }
            }
        },
        
       
    }
})
const actions = [
    { icon: <AirplanemodeInactiveIcon />, name: '비행금지구역', folderName: '비행금지구역', color: '#FF5A5A' },
    { icon: <AirplanemodeInactiveIcon />, name: '비행제한구역', folderName: '비행제한구역', color: '#FFBB53' },
    { icon: <AirplanemodeInactiveIcon />, name: '공항', folderName: '공항', color: '#FFFF5A' },
    { icon: <LocalAirportIcon />, name: '비행장', folderName: '비행장', color: '#5AC05A' },
    { icon: <LocalAirportIcon />, name: '초경량비행장치 전용공역(비행가능)', folderName: '초경량비행장치 전용공역(비행가능)', color: '#5A5AFF' },
];
  
const WowDroBtn = () => {
const dispatch = useDispatch();
const [wowDroData, setWowDroData] = useState([]);
const { map } = useMap();
const [checkedItems, setCheckedItems] = useState({});

useEffect(() => {
    async function fetchData() {
    try {
        const wowDroData = await window.electronAPI.getwowDroHandler();
        setWowDroData(wowDroData);
        console.log("WowDroData:", wowDroData);
    } catch (error) {
        console.error('Error fetching map mode data:', error);
    }
    }
    fetchData();
}, []);

const addPolygonToMap = (map, folderName, polygon, index, color) => {
    function parsePolygonString(polygonString) {
    const coordinates = polygonString.trim().split('\n');
    const parsedCoordinates = coordinates.map(coordinate => {
        const [lon, lat] = coordinate.trim().split(',');
        return [parseFloat(lon), parseFloat(lat)];
    });
    return parsedCoordinates;
    }

    const parsedCoordinates = parsePolygonString(polygon);
    const newGeojson = {
    type: "FeatureCollection",
    features: [{
        type: 'Feature',
        geometry: {
        type: 'Polygon',
        coordinates: [parsedCoordinates]
        }
    }]
    };
    dispatch(addGeojson(folderName, newGeojson));
};

const removePolygonFromMap = (map, folderName, index) => {
    dispatch(removeGeojson(folderName));
};

const handleCheckboxClick = (folderName, isChecked) => {
    const selectedFolder = wowDroData.find(item => item.folderName === folderName);
    if (selectedFolder) {
    const polygonList = selectedFolder.polygonList;
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF'];
    polygonList.forEach((polygon, index) => {
        const color = colors[index % colors.length];
        if (isChecked) {
        addPolygonToMap(map, folderName, polygon[0], index, color);
        } else {
        removePolygonFromMap(map, folderName, index);
        }
    });
    }
};

const handleSpeedDialActionClick = (folderName) => {
    setCheckedItems(prevState => {
    const isChecked = !prevState[folderName];
    handleCheckboxClick(folderName, isChecked);
    return { ...prevState, [folderName]: isChecked };
    });
};

return (
    <ThemeProvider theme={theme}>
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, margin: "8px" }}>
        <SpeedDial
        ariaLabel="SpeedDial"
        direction='right'
        icon={<FlightTakeoffIcon />}
        >
        {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement="bottom"  
            onClick={() => handleSpeedDialActionClick(action.folderName)}
            sx={{
                height:'32px',
                width:'32px',
                bgcolor: checkedItems[action.folderName] ? action.color : 'default',
                color: checkedItems[action.folderName] ? 'white' : 'black',
                '& .MuiSvgIcon-root': {
                    fontSize: '16px', // 아이콘 크기를 줄입니다.
                  },
            }}
            />
        ))}
        </SpeedDial>
    </Box>
    </ThemeProvider>
);
};
export default WowDroBtn;