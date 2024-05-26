import React from 'react';
import { Fab } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux';
import { clearDroneState , setMarkerFalse} from '../../../../redux/reducer/reducer';



const ClearBtn = () => {
    const dispatch = useDispatch()
    const _clearDroneState = () => {
        dispatch(clearDroneState());
        dispatch(setMarkerFalse());
    };

    return (
        <Fab size="medium" color="primary" aria-label="Navi" onClick={_clearDroneState} sx={{margin:'8px'}}>
            <RefreshIcon/>
        </Fab>
    );
}

export default ClearBtn;
