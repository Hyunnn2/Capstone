import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField } from '@mui/material';
import { fetchDroneHeader } from '../../../../firebase_utils';
import { useSelector, useDispatch } from 'react-redux';
import { updateDroneState } from '../../../../redux/reducer/reducer';

const headerMapping = {
    "manual":"메뉴얼 모드를 시작합니다.",
    "mission_start":"자율 주행 모드를 시작합니다.목적지를 지도에서 클릭해주세요.",
    "upload":"목적지 선택을 완료하였습니다.",
    "mission":"미션을 시작합니다",
    "emergency":"긴급착륙합니다.",
    "pause":"잠시 멈춥니다.",
    "resume":"다시 미션을 시작합니다.",
    "finish":"미션을 완료하였습니다.",
    "return":"출발지로 이동합니다.",
    "arm": "시동 on",
    "disarm": "시동 off",
    "takeoff":"이륙합니다.",
    "land":"착륙합니다.",
    "manual_up":"상승합니다.",
    "manual_down":"하강합니다.",
    "manual_forward":"전진합니다.",
    "manual_back":"후진합니다.",
    "manual_left":"왼쪽으로 이동합니다.",
    "manual_right":"오른쪽으로 이동합니다.",
    "manual_turn_left":"왼쪽으로 회전합니다.",
    "manual_turn_right":"오른쪽으로 회전합니다.",
    "avoid_start":"충돌회피를 시작합니다.",
    "avoid_finish":"충돌회피가 끝났습니다.",
    "left":"왼쪽으로 이동합니다.",
    "left_15":"왼쪽 75도로 이동합니다.",
    "left_30":"왼쪽 60도로 이동합니다.",
    "left_45":"왼쪽 45도로 이동합니다.",
    "left_60":"왼쪽 30도로 이동합니다.",
    "right":"오른쪽으로 이동합니다.",
    "right_15":"오른쪽 75도로 이동합니다.",
    "right_30":"오른쪽 60도로 이동합니다.",
    "right_45":"오른쪽 45도로 이동합니다.",
    "right_60":"오른쪽 30도로 이동합니다.",
}


    
const FlightLog = () => {
    const dispatch = useDispatch()
    const { droneState } = useSelector((state) => state)

    // TextField 요소에 대한 ref 생성
    const textFieldRef = useRef();

    useEffect(() => {
        const _updateDroneState = (newState) => {
            let mappedHeader = headerMapping[newState.header] || newState.header; // 매핑된 값이 없으면 원래 값 사용
            const mappedMeter = newState.meter;
            const mappedDegree = newState.degree;
            const mappedVelocity  = newState.velocity;

            if (newState.header === "manual_up" || newState.header === "manual_down" 
            || newState.header === "manual_forward" || newState.header === "manual_back" 
            || newState.header === "manual_left" || newState.header === "manual_right") {
                mappedHeader = `${mappedMeter}m ${headerMapping[newState.header]}`;
            }
            if (newState.header === "manual_turn_left" || newState.header === "manual_turn_right" ) {
                mappedHeader = `${mappedDegree}도 ${headerMapping[newState.header]}`;
            }
            if (newState.header !== "Waiting...") {
                dispatch(updateDroneState(mappedHeader));
                textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight !== null ? textFieldRef.current.scrollHeight : 1;
            }
        };
        fetchDroneHeader(_updateDroneState);

        return () => {
            // cleanup 함수에서 해제
        };
    }, []);
   


    return (
        <Box 
            height="30%"
            width="30%"
            left={10}
            bottom={10}
            zIndex={3}
            bgcolor={'rgba(128,128,128,0.1)'}
            mx={1}
            my={1}
            flexDirection="column"
            display="flex"
            position="absolute"
            gap={4}
            p={1}
        >
            <TextField
                inputRef={textFieldRef} // ref 설정
                id="standard-multiline-static"
                multiline
                rows={9}
                width="100%"
                value={droneState}
                variant="standard"
                InputProps={{
                    readOnly: true,
                    sx: {
                        '& .MuiInputBase-input': {
                            overflow: 'hidden',
                            scrollbarWidth: 'none', // 스크롤 바 숨기기
                            fontSize:"small",
                            lineHeight: "1.2", // 추가된 줄 높이 설정
                            padding: "0",
                        },
                        '&::before': {
                            borderBottom: 'none',
                        },
                        '&:hover::before': {
                            borderBottom: 'none',
                        },
                        '&::after': {
                            borderBottom: 'none',
                        },
                    },
                }}
            />
        </Box>
    );
}

export default FlightLog;