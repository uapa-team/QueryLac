import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_BOOKS_REQUEST,
 GET_TEACHERS_BOOKS_SUCCESS,
 GET_TEACHERS_BOOKS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersBooks = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersBooksRequest());
        const data = await requestTeachersData(ids, "books").catch(e => {
            dispatch(getTeachersBooksFailure(e));
        });
        return dispatch(getTeachersBooksSuccess(data));
    }
}


export const getTeachersBooksRequest = () => {
    return {
        type: GET_TEACHERS_BOOKS_REQUEST,
    }
}

export const getTeachersBooksSuccess = (messages) => {
    return {
        type: GET_TEACHERS_BOOKS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersBooksFailure = error => {
    return {
        type: GET_TEACHERS_BOOKS_FAILURE,
        payload: error,
    }
}