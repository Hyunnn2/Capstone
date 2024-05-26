
let initialState={
    isMarker: false,
    lat: 0,
    lng: 0,
    alt: 0,
    geojsons: [],
    droneState:''
}
// 액션 타입 정의
const SET_MARKER_TRUE = 'SET_MARKER_TRUE';
const SET_MARKER_FALSE = 'SET_MARKER_FALSE';
const SET_DESTINATION_LAT = 'SET_DESTINATION_LAT';
const SET_DESTINATION_LNG = 'SET_DESTINATION_LNG';
const SET_DESTINATION_ALT = 'SET_DESTINTAION_ALT';
const ADD_GEOJSON = 'ADD_GEOJSON';
const REMOVE_GEOJSON = 'REMOVE_GEOJSON';
const UPDATE_DRONE_STATE = 'UPDATE_DRONE_STATE';
const CLEAR_DRONE_STATE = 'CLEAR_DRONE_STATE';


// 액션 생성자 함수
export const setMarkerTrue = () => ({
    type: SET_MARKER_TRUE
})
export const setMarkerFalse = () => ({
    type: SET_MARKER_FALSE
})
export const setDestinationLat = (lat) => ({
    type: SET_DESTINATION_LAT,
    payload: lat
});

export const setDestinationLng = (lng) => ({
    type: SET_DESTINATION_LNG,
    payload: lng
});

export const setDestinationAlt = (alt) => ({
    type: SET_DESTINATION_ALT,
    payload: alt
});

export const addGeojson = (folderName, geojson) => ({
    type: ADD_GEOJSON,
    payload: {folderName, geojson}
})

export const removeGeojson = (folderName) => ({
    type: REMOVE_GEOJSON,
    payload: folderName
})

export const updateDroneState = (newState) => ({
    type: UPDATE_DRONE_STATE,
    payload: newState,
  });

export const clearDroneState = () => ({
    type: CLEAR_DRONE_STATE
})



function reducer(state = initialState, action){
    switch(action.type) {
        case SET_MARKER_TRUE:
            return {...state, isMarker: true };
        case SET_MARKER_FALSE:
            return {...state, isMarker: false, lat:0, lng:0 };
        case SET_DESTINATION_LAT:
            return {...state, lat: action.payload};
        case SET_DESTINATION_LNG:
            return {...state, lng: action.payload};    
        case SET_DESTINATION_ALT:
            return {...state, alt: action.payload};
        case ADD_GEOJSON:
            return {...state, geojsons: [...state.geojsons, action.payload]}
        case REMOVE_GEOJSON:
            const folderName = action.payload;
            const filteredData = state.geojsons.filter(item => item.folderName !== folderName);
            return {...state, geojsons: filteredData}
        case UPDATE_DRONE_STATE:
            return {
                ...state,
                droneState: state.droneState + action.payload + '\n',
            };
        case CLEAR_DRONE_STATE:
            return {
                ...state,
                droneState: '',
            }
        default:
            return{...state}; 
    }
}

export default reducer;