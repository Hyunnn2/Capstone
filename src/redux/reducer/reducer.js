
let initialState={
    lat: 0,
    lng: 0,
    alt: 0,
    geojsons: []
}
// 액션 타입 정의
const SET_DESTINATION_LAT = 'SET_DESTINATION_LAT';
const SET_DESTINATION_LNG = 'SET_DESTINATION_LNG';
const SET_DESTINATION_ALT = 'SET_DESTINTAION_ALT';
const ADD_GEOJSON = 'ADD_GEOJSON';
const REMOVE_GEOJSON = 'REMOVE_GEOJSON';

// 액션 생성자 함수
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


function reducer(state = initialState, action){
    switch(action.type) {
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
        default:
            return{...state}; 
    }
}

export default reducer;