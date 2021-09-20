import {requestSingleTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_TITLES_REQUEST,
 GET_TEACHERS_TITLES_SUCCESS,
 GET_TEACHERS_TITLES_FAILURE,
} from '../../../constants/cvlac.actionTypes';

export const getTeachersTitles = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersTitlesRequest());
        const data = await requestSingleTeachersData(ids, "titles").catch(e => {
            dispatch(getTeachersTitlesFailure(e));
        });
        return dispatch(getTeacherTitlesSuccess(data));
    }
}

export const getTeachersTitlesRequest = () => {
    return {
        type: GET_TEACHERS_TITLES_REQUEST,
    }
}

export const getTeacherTitlesSuccess = (titles) => {
    return {
        type: GET_TEACHERS_TITLES_SUCCESS,
        payload: titles,
    }
}

export const getTeachersTitlesFailure = error => {
    return {
        type: GET_TEACHERS_TITLES_FAILURE,
        payload: error,
    }
}