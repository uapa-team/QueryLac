import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHER_BASIC_DETAILS_REQUEST,
 GET_TEACHER_BASIC_DETAILS_SUCCESS,
 GET_TEACHER_BASIC_DETAILS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersBasicDetails = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersBasicDetailsRequest());
        const data = await requestTeachersData(ids, "basicDetails").catch(e => {
            dispatch(getTeachersBasicDetailsFailure(e));
        });
        return dispatch(getTeachersBasicDetailsSuccess(data));
    }
}

export const getTeachersBasicDetailsRequest = () => {
    return {
        type: GET_TEACHER_BASIC_DETAILS_REQUEST,
    }
}

export const getTeachersBasicDetailsSuccess = (data) => {
    return {
        type: GET_TEACHER_BASIC_DETAILS_SUCCESS,
        payload: data,
    }
}

export const getTeachersBasicDetailsFailure = error => {
    return {
        type: GET_TEACHER_BASIC_DETAILS_FAILURE,
        payload: error,
    }
}