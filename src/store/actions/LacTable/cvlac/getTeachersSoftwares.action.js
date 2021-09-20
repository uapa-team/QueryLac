import {requestSingleTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_SOFTWARES_REQUEST,
 GET_TEACHERS_SOFTWARES_SUCCESS,
 GET_TEACHERS_SOFTWARES_FAILURE,
} from '../../../constants/cvlac.actionTypes';

export const getTeachersSoftwares = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersSoftwaresRequest());
        const data = await requestSingleTeachersData(ids, "softwares").catch(e => {
            dispatch(getTeachersSoftwaresFailure(e));
        });
        return dispatch(getTeachersSoftwaresSuccess(data));
    }
}



export const getTeachersSoftwaresRequest = () => {
    return {
        type: GET_TEACHERS_SOFTWARES_REQUEST,
    }
}

export const getTeachersSoftwaresSuccess = (softwares) => {
    return {
        type: GET_TEACHERS_SOFTWARES_SUCCESS,
        payload: softwares,
    }
}

export const getTeachersSoftwaresFailure = error => {
    return {
        type: GET_TEACHERS_SOFTWARES_FAILURE,
        payload: error,
    }
}