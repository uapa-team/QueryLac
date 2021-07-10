import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_JUDGES_REQUEST,
 GET_TEACHERS_JUDGES_SUCCESS,
 GET_TEACHERS_JUDGES_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersJudges = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersJudgesRequest());
        const data = await requestTeachersData(ids, "judges").catch(e => {
            dispatch(getTeachersJudgesFailure(e));
        });
        return dispatch(getTeachersJudgesSuccess(data));
    }
}


export const getTeachersJudgesRequest = () => {
    return {
        type: GET_TEACHERS_JUDGES_REQUEST,
    }
}

export const getTeachersJudgesSuccess = (messages) => {
    return {
        type: GET_TEACHERS_JUDGES_SUCCESS,
        payload: messages,
    }
}

export const getTeachersJudgesFailure = error => {
    return {
        type: GET_TEACHERS_JUDGES_FAILURE,
        payload: error,
    }
}