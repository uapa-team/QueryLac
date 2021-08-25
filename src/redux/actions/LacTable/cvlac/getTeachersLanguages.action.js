import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_LANGUAGES_REQUEST,
 GET_TEACHERS_LANGUAGES_SUCCESS,
 GET_TEACHERS_LANGUAGES_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersLanguages = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersLanguagesRequest());
        const data = await requestTeachersData(ids, "languages").catch(e => {
            dispatch(getTeachersLanguagesFailure(e));
        });
        return dispatch(getTeachersLanguagesSuccess(data));
    }
}


export const getTeachersLanguagesRequest = () => {
    return {
        type: GET_TEACHERS_LANGUAGES_REQUEST,
    }
}

export const getTeachersLanguagesSuccess = (messages) => {
    return {
        type: GET_TEACHERS_LANGUAGES_SUCCESS,
        payload: messages,
    }
}

export const getTeachersLanguagesFailure = error => {
    return {
        type: GET_TEACHERS_LANGUAGES_FAILURE,
        payload: error,
    }
}