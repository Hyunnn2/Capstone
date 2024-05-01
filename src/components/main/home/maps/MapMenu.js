import * as React from 'react';
import { Tabs, Tab, Button, Box } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import MapIcon from '@mui/icons-material/Map';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import CloseIcon from '@mui/icons-material/Close';
// import './MapMenu.css';
import SelectModeEvent from '../maps/menucomps/ClickMode'
import SelectDestinationEvent from './menucomps/ClickMarker';
import OpenWowdroEvent from './menucomps/ClickWowDro';

// Theme 적용 라이브러리
import { createTheme, ThemeProvider } from '@mui/material';

let theme = createTheme({
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    width: '50px',
                    minWidth: '50px',
                    height:'60%',
                    padding: '0'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    width: '50px',
                    minWidth: '50px',
                    height: '50px',
                    padding: '0'
                }
            }
        },
        MuiTouchRipple: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: '24px',
                    maxWidth: '24px',
                    minHeight: '24px',
                    maxHeight: '24px',
                    marginLeft: '76px',
                    padding: 0
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                
            }
        }        
    }
})

function TabPanel({ children, value, index, setValue}) {

    return (
        <div
            role="tabpanel"
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
        >
            {value === index && (
                
                <Box sx={{ bgcolor: 'background.paper', height: '60%', width: 100 }}>
                    <Button onClick={() => setValue(null)}>
                        <CloseIcon />
                    </Button>
                    {children}
                </Box>
            )}
        </div>
    );
}


export default function VerticalTabs({}) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value)
    };

    
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex', position: 'relative', width: 150, height: '100%', zIndex: 1 }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, bgcolor: 'background.paper', borderColor: 'divider', width: 50 }}
                >
                    <Tab icon={<RoomIcon />} />
                    <Tab icon={<AutoModeIcon />} />
                    <Tab icon={<MapIcon />} />
                </Tabs>
                <TabPanel value={value} index={0} setValue={setValue}>
                    <SelectDestinationEvent />
                </TabPanel>
                <TabPanel value={value} index={1} setValue={setValue}>
                    <SelectModeEvent />
                </TabPanel>
                <TabPanel value={value} index={2} setValue={setValue}>
                    <OpenWowdroEvent />
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
}