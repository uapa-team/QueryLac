import {requestSingleTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_COUPLES_EVALUATORS_REQUEST,
 GET_TEACHERS_COUPLES_EVALUATORS_SUCCESS,
 GET_TEACHERS_COUPLES_EVALUATORS_FAILURE,
} from '../../../constants/cvlac.actionTypes';

export const getTeachersCouplesEvaluators = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersCouplesEvaluatorsRequest());
        const data = await requestSingleTeachersData(ids, "couplesEvaluators").catch(e => {
            dispatch(getTeachersCouplesEvaluatorsFailure(e));
        });
        return dispatch(getTeachersCouplesEvaluatorsSuccess(data));
    }
}

export const getTeachersCouplesEvaluatorsRequest = () => {
    return {
        type: GET_TEACHERS_COUPLES_EVALUATORS_REQUEST,
    }
}

export const getTeachersCouplesEvaluatorsSuccess = (messages) => {
    return {
        type: GET_TEACHERS_COUPLES_EVALUATORS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersCouplesEvaluatorsFailure = error => {
    return {
        type: GET_TEACHERS_COUPLES_EVALUATORS_FAILURE,
        payload: error,
    }
}