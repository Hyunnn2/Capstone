import React ,{useState} from 'react';
import {createTheme, MenuItem, ThemeProvider, Button, TextField } from '@mui/material';
import { uploadMission } from '../../../../../firebase_utils'

const missions = [
    {
      value: 'arm',
      label: '모터 가동',
    },
    {
      value: 'takeoff',
      label: '이륙',
    },
    {
      value: 'forward',
      label: '전진',
    },
    {
      value: 'backward',
      label: '후진',
    },
    {
        value: 'land',
        label: '착륙',
    },
    {
        value: 'disarm',
        label: '모터 중지',
    },
  ];

let theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '90px',
                    height: '30px',
                    margin: '5px',
                    fontSize: 10,
                    padding:'0px'
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '90px',
                    height: '30px',
                    margin: '5px'

                }
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                    fontSize:'small'
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides:{
                root:{
                    fontSize:'x-small'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                
            }
        }        
    }
})
const SelectModeEvent = () => {
    const [clickManualMode, setclickManualMode] = useState(false)

    const clickAutoModeBtn =() =>{
        console.log('자율모드 선택 버튼 클릭')
        let misson = "misson"
        uploadMission(misson)
    }
    const clickManualModeBtn =() =>{
        console.log('수동 선택 버튼 클릭')
        setclickManualMode(!clickManualMode)
    }

    const selectManualModeMisson =(value) => {
        let misson = value
        uploadMission(misson)
    }
    return(
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={clickAutoModeBtn}>
            자율주행 모드 
        </Button>
        <Button variant="contained" onClick={clickManualModeBtn}>
            수동 모드
        </Button>
            {clickManualMode &&
                <TextField
                id="standard-select-currency"
                size='small'
                select
                defaultValue=""
                helperText="명령어 선택"
                variant="standard"
                onChange={(e) => selectManualModeMisson(e.target.value)}
              >
                {missions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            }
        </ThemeProvider>
    );
};
export default SelectModeEvent;