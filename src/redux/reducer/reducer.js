
let initialState={
    destination: {'lat': 0, 'lng': 0, 'alt':0}
}
// 액션 타입 정의
const SET_DESTINATION = 'SET_DESTINATION';

// 액션 생성자 함수
export const setDestination = (destination) => ({
    type: SET_DESTINATION,
    payload: destination
});


function reducer(state = initialState, action){
    switch(action.type) {
        case SET_DESTINATION:
            return {...state, destination: action.payload};
        default:
            return{...state}; 
    }
}

export default reducer;