import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_EVENTS_REQUEST,
 GET_TEACHERS_EVENTS_SUCCESS,
 GET_TEACHERS_EVENTS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeacherEvents = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersEventsRequest());
        const data = await requestTeachersData(ids, "events").catch(e => {
            dispatch(getTeachersEventsFailure(e));
        });
        return dispatch(getTeachersEventsSuccess(data));
    }
}


export const getTeachersEventsRequest = () => {
    return {
        type: GET_TEACHERS_EVENTS_REQUEST,
    }
}

export const getTeachersEventsSuccess = (messages) => {
    return {
        type: GET_TEACHERS_EVENTS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersEventsFailure = error => {
    return {
        type: GET_TEACHERS_EVENTS_FAILURE,
        payload: error,
    }
}